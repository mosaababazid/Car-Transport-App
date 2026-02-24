const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function getPriceEstimate(pickup, dropoff) {
  const url = API_BASE_URL ? `${API_BASE_URL.replace(/\/$/, "")}/api/estimate` : "/api/estimate";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pickup, dropoff }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Die Preisberechnung ist fehlgeschlagen.");
  }

  return data;
}