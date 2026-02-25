const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function getPriceEstimate(pickup, dropoff) {
  const url = API_BASE_URL ? `${API_BASE_URL.replace(/\/$/, "")}/api/estimate` : "/api/estimate";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal: controller.signal,
    body: JSON.stringify({ pickup, dropoff }),
  }).finally(() => clearTimeout(timeout));

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Die Preisberechnung ist fehlgeschlagen.");
  }

  return data;
}