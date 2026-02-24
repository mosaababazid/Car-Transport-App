from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from geopy.geocoders import Nominatim
import httpx


class EstimateRequest(BaseModel):
  pickup: str
  dropoff: str


class EstimateResponse(BaseModel):
  distance_km: float
  price: float
  estimated_hours: float | None


PRICE_PER_KM_EUR = 0.75
OSRM_BASE_URL = "http://router.project-osrm.org"

app = FastAPI(title="CarTransport / AutoMove Pricing API")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

_geolocator = Nominatim(user_agent="cartransport-pricing")


async def _geocode_address(address: str) -> tuple[float, float]:
  location = _geolocator.geocode(address)
  if not location:
    raise HTTPException(status_code=422, detail=f"Could not geocode address: {address}")
  return float(location.latitude), float(location.longitude)


async def _fetch_osrm_distance_km(
  origin: tuple[float, float], destination: tuple[float, float]
) -> float:
  origin_lat, origin_lon = origin
  dest_lat, dest_lon = destination
  route_url = (
    f"{OSRM_BASE_URL}/route/v1/driving/"
    f"{origin_lon},{origin_lat};{dest_lon},{dest_lat}"
    "?overview=false&alternatives=false&steps=false"
  )

  async with httpx.AsyncClient(timeout=20.0) as client:
    response = await client.get(route_url)

  if response.status_code != 200:
    raise HTTPException(
      status_code=502,
      detail="Routing service is currently unavailable. Please try again shortly.",
    )

  data = response.json()
  routes = data.get("routes")
  if not routes:
    raise HTTPException(
      status_code=422,
      detail="No route could be found between the two locations.",
    )

  distance_meters = routes[0].get("distance")
  if distance_meters is None:
    raise HTTPException(
      status_code=502,
      detail="Routing service returned an invalid response.",
    )

  return float(distance_meters) / 1000.0


@app.post("/api/estimate", response_model=EstimateResponse)
async def estimate_price(payload: EstimateRequest) -> EstimateResponse:
  if not payload.pickup.strip() or not payload.dropoff.strip():
    raise HTTPException(status_code=400, detail="Both pickup and dropoff are required.")

  origin = await _geocode_address(payload.pickup)
  destination = await _geocode_address(payload.dropoff)

  distance_km = await _fetch_osrm_distance_km(origin, destination)
  price = round(distance_km * PRICE_PER_KM_EUR)

  avg_speed_kmh = 70.0
  estimated_hours = round(distance_km / avg_speed_kmh, 1) if distance_km > 0 else None

  return EstimateResponse(
    distance_km=distance_km,
    price=price,
    estimated_hours=estimated_hours,
  )