"use server";

export async function getCountryPolygon(country) {
  try {
    const countryPoly = await fetch(
      "https://nominatim.openstreetmap.org/search?" +
        new URLSearchParams({
          country: country.trim(),
          format: "json",
          polygon_geojson: 1,
        }).toString(),
    );
    const countryData = await countryPoly.json();
    const { coordinates } = countryData[0].geojson;
    return coordinates;
  } catch (error) {
    console.error(error);
    return null;
  }
}
