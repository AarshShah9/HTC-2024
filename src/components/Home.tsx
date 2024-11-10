"use client";

import dynamic from "next/dynamic";

type HomeProps = {
  geoJson: GeoJSON.GeoJSON | null;
};

export default function Home({ geoJson }: HomeProps) {
  const Map = dynamic(() => import("@/components/Map"), { ssr: false });

  return <main>{geoJson && <Map geoJson={geoJson} />}</main>;
}