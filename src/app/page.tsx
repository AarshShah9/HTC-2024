"use client";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import MainSideBar from "@/components/MainSideBar";

import { getCountryPolygon } from "@/server/countries";
import { useEffect, useState } from "react";

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
      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        className="h-[100vh] w-[100vw] z-0"
        worldCopyJump={true}
        maxBounds={[
          [-85, -180], // Southwest corner
          [85, 180], // Northeast corner
        ]}
        maxBoundsViscosity={1.0} // Smoothly restricts panning at the edges
      >
        <Polygon pathOptions={{ color: "purple" }} positions={poly} />
        <TileLayer
          url={
            "https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          }
          attribution={
            '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          accessToken="WYUholf8Kd9VFs67vN1lrIKrzlTv0KTcdtwi0KWfubYj6XCRgnXUKOaDZ6cwq9uB"
        />
      </MapContainer>
    </main>
  );
}
