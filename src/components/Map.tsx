"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import HighlightedCountries from "@/components/mapLayers/HighlightedCountries";
import HotSpots from "./mapLayers/HotSpots";
import { mapObject } from "@/server/client";

type MapProps = {
  disasterData: mapObject[];
  setFilter: (filter: string) => void;
  whenReady: () => void;
  centerCoords: number[];
  setSelectedDisaster: (disaster: mapObject | null) => void;
};

const RecenterHandler = ({ centerCoords }: { centerCoords: number[] }) => {
  const map = useMap();
  if (!map || centerCoords?.length !== 2) {
    return null;
  }
  const centerLatLng = L.latLng(centerCoords[0], centerCoords[1]);
  map.setView(centerLatLng, map.getZoom());
  return null;
};

export default function Map({
  whenReady,
  centerCoords,
  disasterData,
  setSelectedDisaster,
  setFilter,
}: MapProps) {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      className="relative z-0 h-full w-full rounded-lg border-2 border-zinc-800"
      worldCopyJump={true}
      whenReady={whenReady}
      maxBounds={[
        [-85, -180], // Southwest corner
        [85, 180], // Northeast corner
      ]}
      maxBoundsViscosity={1.0} // Smoothly restricts panning at the edges
    >
      <RecenterHandler centerCoords={centerCoords} />
      <HotSpots
        disasterData={disasterData}
        setSelectedDisaster={setSelectedDisaster}
      />
      <HighlightedCountries disasterData={disasterData} setFilter={setFilter} />
      <TileLayer
        url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        accessToken="WYUholf8Kd9VFs67vN1lrIKrzlTv0KTcdtwi0KWfubYj6XCRgnXUKOaDZ6cwq9uB"
        attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}
