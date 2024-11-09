"use client";
import { useEffect, useState } from "react";

import { getCountryPolygon } from "@/server/countries";

import MainSideBar from "@/components/MainSideBar";
import Map from "@/components/Map";

export default function Home() {
  const [poly, setPoly] = useState([]);
  useEffect(() => {
    (async () => {
      const polygonCoordinates = await getCountryPolygon("Canada");
      if (!polygonCoordinates) {
        return;
      }
      setPoly(L.GeoJSON.coordsToLatLngs(polygonCoordinates, 2));
    })();
  }, []);

  return (
    <main>
      <MainSideBar />
      <Map poly={poly} />
    </main>
  );
}
