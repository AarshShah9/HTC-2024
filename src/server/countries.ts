export async function getCountryGeoJson(
  country: string,
): Promise<GeoJSON.GeoJSON | null> {
  try {
    const query = {
      country: country.trim(),
      format: "geojson",
      polygon_geojson: "1",
    } as Record<string, string>;

    const result = await fetch(
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams(query).toString(),
      { cache: 'force-cache' });
    const resultJson = await result.json();
    return resultJson;
  } catch (error) {
    console.error(error);
    return null;
  }
}
