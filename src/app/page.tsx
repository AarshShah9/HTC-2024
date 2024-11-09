"use client";
import { MapContainer, TileLayer } from "react-leaflet";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={2}
          className="h-[100vh] w-[100vh]"
        >
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
    </div>
  );
}
