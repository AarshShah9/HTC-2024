import { useLeafletContext } from "@react-leaflet/core";
import { useEffect, useRef } from "react";
import { Disaster } from "@/types/disaster";
import L from "leaflet";

import { getCountryColor } from "@/utils/countryColor";

type HotSpotsProps = {
  disasterData: Disaster[];
  setSelectedDisaster: (disaster: Disaster) => void;
};

export default function HotSpots({
  disasterData,
  setSelectedDisaster,
}: HotSpotsProps) {
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
  return null;
}
