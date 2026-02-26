import { checkRateLimit, getClientIp } from "../_lib/rateLimit";

const RATE_PER_KM = 0.75;
const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search";
const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

const USER_AGENT = "AutoMoveLogistik/1.0 (https://automove-logistik.de)";

function sanitizeAddress(value) {
  return String(value ?? "").trim().slice(0, 200);
}

function isValidAddress(value) {
  return /^[\p{L}\p{N}\s,./\-()]{3,200}$/u.test(value);
}

async function geocode(query) {
  const url = new URL(NOMINATIM_BASE);
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9_000);
  const res = await fetch(url.toString(), {
    headers: {
      "Accept-Language": "de",
      "User-Agent": USER_AGENT,
    },
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout));
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if (!data || data.length === 0) return null;
  const { lat, lon } = data[0];
  return { lat: parseFloat(lat), lon: parseFloat(lon) };
}

async function getDrivingDistance(from, to) {
  const coords = `${from.lon},${from.lat};${to.lon},${to.lat}`;
  const url = `${OSRM_BASE}/${coords}?overview=false`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9_000);
  const res = await fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timeout));
  if (!res.ok) throw new Error("Routing failed");
  const data = await res.json();
  if (data.code !== "Ok" || !data.routes?.length) return null;
  const route = data.routes[0];
  return {
    distance_m: route.distance,
    duration_s: route.duration,
  };
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const limiter = checkRateLimit({
      key: `estimate:${ip}`,
      limit: 20,
      windowMs: 60_000,
    });
    if (!limiter.allowed) {
      return Response.json(
        { error: "Zu viele Anfragen. Bitte kurz warten und erneut versuchen." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const pickup = sanitizeAddress(body.pickup);
    const dropoff = sanitizeAddress(body.dropoff);
    if (!pickup || !dropoff) {
      return Response.json(
        { error: "Abholort und Zielort sind erforderlich." },
        { status: 400 }
      );
    }
    if (!isValidAddress(pickup) || !isValidAddress(dropoff)) {
      return Response.json(
        { error: "Bitte gültige Adressen für Abholung und Ziel angeben." },
        { status: 400 }
      );
    }

    const [from, to] = await Promise.all([
      geocode(pickup),
      geocode(dropoff),
    ]);
    if (!from) {
      return Response.json(
        { error: "Abholort konnte nicht gefunden werden." },
        { status: 422 }
      );
    }
    if (!to) {
      return Response.json(
        { error: "Zielort konnte nicht gefunden werden." },
        { status: 422 }
      );
    }

    const route = await getDrivingDistance(from, to);
    if (!route) {
      return Response.json(
        { error: "Keine Strecke zwischen den Orten gefunden." },
        { status: 422 }
      );
    }

    const distance_km = route.distance_m / 1000;
    const price = Math.round(distance_km * RATE_PER_KM);
    const estimated_hours = route.duration_s / 3600;

    return Response.json({
      distance_km: Math.round(distance_km * 10) / 10,
      price,
      estimated_hours: Math.round(estimated_hours * 10) / 10,
    });
  } catch (err) {
    return Response.json(
      { error: "Die Preisberechnung ist fehlgeschlagen." },
      { status: 500 }
    );
  }
}
