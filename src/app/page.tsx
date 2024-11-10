"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { dummyData as disasterData } from "@/data/dummyDisasters";
import MainSideBar from "@/components/MainSideBar";
import { Disaster } from "@/types/disaster";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const disasterFilter = (disaster: Disaster, filter: string) => {
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

export default function Home() {
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [centerCoords, setCenterCoords] = useState<number[]>([0, 0]);
  const [selectedDisaster, setSelectedDisaster] = useState<Disaster | null>(
    null,
  );
  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState(disasterData);

  useEffect(() => {
    if (!filter) {
      setFilteredData(disasterData);
      return;
    }
    const filterQuery = filter.toLowerCase();

    setFilteredData(
      disasterData.filter((disaster) => disasterFilter(disaster, filterQuery)),
    );
  }, [filter]);

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
