import { useLeafletContext } from "@react-leaflet/core";
import { useEffect, useRef } from "react";
import { Disaster } from "@/types/disaster";
import L from "leaflet";

const getCountryColor = (countryIso: string): string => {
  // Simple "hash" function based on country code
  const hash = Array.from(countryIso).reduce(
    (acc: number, char: string) => acc + char.charCodeAt(0),
    0,
  );

  // Generate RGB values by manipulating the hash
  const red = (hash * 16) % 256;
  const green = (hash * 32) % 256;
  const blue = (hash * 64) % 256;

  return `rgb(${red}, ${green}, ${blue})`;
};

export default function HotSpots({
  disasterData,
  setSelectedDisaster,
}: {
  disasterData: Disaster[];
}) {
  const context = useLeafletContext();
  const countriesInMap = useRef(new Set<string>());

  useEffect(() => {
    if (!disasterData?.length || !context) {
      return;
    }

    disasterData.forEach((disaster) => {
      if (countriesInMap.current.has(disaster.countryIso)) {
        return;
      }

      const container = context.layerContainer || context.map;

      const circleLayer = L.circle([disaster.lat, disaster.lng], {
        radius: 250 * 1000, // radius in meters
        opacity: 0.8,
        color: getCountryColor(disaster.countryIso),
      });

      circleLayer.addEventListener("click", () => {
        setSelectedDisaster(disaster);
      });

      container.addLayer(circleLayer);
      countriesInMap.current.add(disaster.countryIso);
    });
  }, [disasterData, context, setSelectedDisaster]);
}
