import { getCountryGeoJson } from "@/server/countries";
import Home from "@/components/Home";
import { Suspense } from "react";

export const dynamic = "force-static";

async function fetchHomeData() {
  try {
    const geoJson = await getCountryGeoJson("Canada");
    return geoJson;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function HomePageComponent() {
  const geoJson = await fetchHomeData();

  return <Home geoJson={geoJson} />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageComponent />
    </Suspense>
  );
}

