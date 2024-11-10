"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getActiveCrisies } from "@/server/crisises";
import { getAllCountries, getAllUniqueThemes, searchOrganizationsByThemeAndCountry, searchOrganizationsByThemesAndCountry } from "@/server/organizations";
import { getCountryGeoJson } from "@/server/countries";

export default function Home() {
  const Map = dynamic(() => import("@/components/Map"), { ssr: false });

  const [geoJson, setGeoJson] = useState<GeoJSON.GeoJSON | null>(null);

  useEffect(() => {
    getCountryGeoJson("Canada").then(setGeoJson);
  }, []);

  useEffect(() => {
    // getAllCountries().then((d) => {
    //   console.log(d);
    // });
    getAllUniqueThemes().then((d) => {
      console.log(d);
    });
    searchOrganizationsByThemesAndCountry(["rights", "edu"], "UG").then((d) => {
      console.log(d);
    });
    // getActiveCrisies().then((d) => {
    //   console.log(d);
    // });
  }, []);

  return <main>{geoJson && <Map geoJson={geoJson} />}</main>;
}
