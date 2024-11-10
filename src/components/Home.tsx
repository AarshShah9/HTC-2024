"use client";

import { fetchAndParseRSS } from "@/server/news";
import dynamic from "next/dynamic";
import { useEffect } from "react";

type HomeProps = {
  geoJson: GeoJSON.GeoJSON | null;
};
  
export default function Home({ geoJson }: HomeProps) {

  useEffect(() => {
    fetchAndParseRSS("Floods in Uganada").then((d) => console.log(d))
  }, [])
  

  const Map = dynamic(() => import("@/components/Map"), { ssr: false });

  return <main>{geoJson && <Map geoJson={geoJson} />}</main>;
}
