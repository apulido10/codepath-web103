// Thin wrapper around the backend API. Relative URLs work in both dev (Vite
// proxies "/api" to the Express server) and production (Express serves the
// built app and the API from the same origin).

export async function getLocations() {
  const res = await fetch("/api/locations");
  if (!res.ok) throw new Error("Failed to load locations");
  return res.json();
}

export async function getLocation(id) {
  const res = await fetch(`/api/locations/${id}`);
  if (!res.ok) throw new Error("Failed to load location");
  return res.json();
}

export async function getEvents(locationId) {
  const query = locationId ? `?location=${locationId}` : "";
  const res = await fetch(`/api/events${query}`);
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
}
