"use server";

export async function getCountryGeoJson(country: string) {
  try {
    const result = await fetch(
      "https://nominatim.openstreetmap.org/search?" +
        new URLSearchParams({
          country: country.trim(),
          format: "geojson",
          polygon_geojson: 1,
        }).toString(),
    );
    const resultJson = await result.json();
    return resultJson;
  } catch (error) {
    console.error(error);
    return null;
  }
}
