"use client";

import { mapObject } from "@/server/client";
import { useEffect, useState } from "react";
import MainSideBar from "@/components/MainSideBar";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const disasterFilter = (disaster: mapObject, filter: string) => {
  if (disaster.countryIso.toLowerCase() === filter) {
    return true;
  }

  if (disaster.name.toLowerCase().includes(filter)) {
    return true;
  }

  if (disaster.disasterType.toLowerCase() === filter) {
    return true;
  }

  return false;
};

export default function MainPage({ disasters }: { disasters: mapObject[] }) {
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [centerCoords, setCenterCoords] = useState<number[]>([0, 0]);
  const [selectedDisaster, setSelectedDisaster] = useState<mapObject | null>(
    null,
  );
  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<mapObject[]>(disasters);

  useEffect(() => {
    if (!filter) {
      setFilteredData(disasters);
      return;
    }
    const filterQuery = filter.toLowerCase();

    setFilteredData(
      disasters.filter((disaster) => disasterFilter(disaster, filterQuery)),
    );
  }, [filter, disasters]);

  useEffect(() => {
    if (
      !isMapReady ||
      typeof selectedDisaster?.lat !== "number" ||
      typeof selectedDisaster?.lng !== "number"
    ) {
      return;
    }

    setFilter("");
    setCenterCoords([selectedDisaster.lat, selectedDisaster.lng]);
  }, [selectedDisaster, isMapReady]);

  return (
    <main className="flex h-screen w-screen flex-row justify-start bg-zinc-800 p-2">
      <div className="h-full, w-2/3">
        <Map
          disasterData={filteredData}
          centerCoords={centerCoords}
          setSelectedDisaster={setSelectedDisaster}
          setFilter={setFilter}
          whenReady={() => setIsMapReady(true)}
        />

        {!isMapReady && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="loader" />
          </div>
        )}
      </div>
      <MainSideBar
        selectedDisaster={selectedDisaster}
        setSelectedDisaster={setSelectedDisaster}
        disasterData={filteredData}
        filter={filter}
        setFilter={setFilter}
      />
    </main>
  );
}
