const API_URL = '/weather';

export function getTemperatureTheme(temperature) {
  return temperature < 15 ? 'cold-theme' : 'warm-theme';
}

export async function searchByCity(cityName) {
  const response = await fetch(`${API_URL}?cityName=${encodeURIComponent(cityName)}`);
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response.json();
}

export async function searchByRegion(region) {
  const response = await fetch(`${API_URL}?region=${encodeURIComponent(region)}`);
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response.json();
}
