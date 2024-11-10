"use client";
import { useEffect, useState } from "react";
import { getCountryPolygon } from "@/server/countries";
import MainSideBar from "@/components/MainSideBar";
import Map from "@/components/Map";
import { getAllCountries, getAllUniqueThemes } from "@/server/organizations";
import { getActiveCrisies } from "@/server/crisises";

export default function Home() {
  // const [poly, setPoly] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     const polygonCoordinates = await getCountryPolygon("Canada");
  //     if (!polygonCoordinates) {
  //       return;
  //     }
  //     setPoly(L.GeoJSON.coordsToLatLngs(polygonCoordinates, 2));
  //   })();
  // }, []);

  useEffect(() => {
    getAllCountries().then((d) => {
      console.log(d)
    })
    getAllUniqueThemes().then((d) => {
      console.log(d)
    })
    getActiveCrisies().then((d) => {
      console.log(d)
    })
  }, [])

  return (
    <main>
      {/* <MainSideBar /> */}
      {/* <Map /> */}
    </main>
  );
}
