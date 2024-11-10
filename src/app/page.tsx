"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import { getActiveCrisies } from "@/server/crisises";
// import { getAllCountries, getAllUniqueThemes, searchOrganizationsByThemesAndCountry } from "@/server/organizations";
import { getCountryGeoJson } from "@/server/countries";
import { main, mapObject } from "@/server/client";

export default function Home() {
  const Map = dynamic(() => import("@/components/Map"), { ssr: false });

  const [geoJson, setGeoJson] = useState<GeoJSON.GeoJSON | null>(null);
  const [, setMainData] = useState<mapObject[]>();

  useEffect(() => {
    getCountryGeoJson("Canada").then(setGeoJson);
  }, []);

  useEffect(() => {
    main().then((d) => {
      console.log(d);
      setMainData(d);
    });
  }, []);

  return <main>{geoJson && <Map geoJson={geoJson} />}</main>;
}
