"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getActiveCrisies } from "@/server/crisises";
import { getAllCountries, getAllUniqueThemes } from "@/server/organizations";
import { getCountryGeoJson } from "@/server/countries";
import { GeoJSON } from "react-leaflet";

import MainSideBar from "@/components/MainSideBar";

export default function Home() {
  const Map = dynamic(() => import("@/components/Map"), { ssr: false });

  const [geoJson, setGeoJson] = useState<GeoJSON.GeoJSON | null>(null);

  useEffect(() => {
    getCountryGeoJson("Canada").then(setGeoJson);

    getAllCountries().then((d) => {
      console.log(d)
    })
    getAllUniqueThemes().then((d) => {
      console.log(d)
    })
    getActiveCrisies().then((d) => {
      console.log(d)
    })
  }, []);

  return (
    <main>
      <MainSideBar />
      {geoJson && <Map geoJson={geoJson} />}
    </main>
  );
}
