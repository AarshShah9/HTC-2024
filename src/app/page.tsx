"use client";

import { useEffect, useState } from "react";

import { getCountryGeoJson } from "@/server/countries";

import MainSideBar from "@/components/MainSideBar";
import Map from "@/components/Map";

export default function Home() {
  const [geoJson, setGeoJson] = useState();

  useEffect(() => {
    getCountryGeoJson("Canada").then(setGeoJson);
  }, []);

  return (
    <main>
      <MainSideBar />
      {geoJson && <Map geoJson={geoJson} />}
    </main>
  );
}
