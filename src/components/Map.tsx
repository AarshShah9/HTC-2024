"use client";

import { main } from "@/server/client";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default function Map({ geoJson }: { geoJson: GeoJSON.GeoJSON }) {
  const { data } = useQuery({
    queryKey: ["mapData"],
    queryFn: () => main(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  console.log(data);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      className="h-[100vh] w-[100vw] z-0"
      worldCopyJump={true}
      maxBounds={[
        [-85, -180], // Southwest corner
        [85, 180], // Northeast corner
      ]}
      maxBoundsViscosity={1.0} // Smoothly restricts panning at the edges
    >
      <GeoJSON data={geoJson} />
      <TileLayer
        url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        accessToken="WYUholf8Kd9VFs67vN1lrIKrzlTv0KTcdtwi0KWfubYj6XCRgnXUKOaDZ6cwq9uB"
        attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}
