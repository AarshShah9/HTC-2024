import { useLeafletContext } from "@react-leaflet/core";
import { useEffect, useRef } from "react";
import L from "leaflet";

import { getCountryColor } from "@/utils/countryColor";
import { mapObject } from "@/server/client";

type HotSpotsProps = {
  disasterData: mapObject[];
  setSelectedDisaster: (disaster: mapObject) => void;
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
