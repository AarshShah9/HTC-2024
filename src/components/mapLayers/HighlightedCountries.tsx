import { useLeafletContext } from "@react-leaflet/core";
import { useEffect, useRef } from "react";
import { getCountryGeoJson } from "@/server/countries";
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

export default function HighlightedCountries({
  disasterData,
  setSelectedDisaster,
  setFilter,
}: {
  disasterData: Disaster[];
}) {
  const context = useLeafletContext();
  const countriesInMap = useRef(new Set<string>());
  // const previousDisasterData = useRef<Disaster[]>(disasterData);
  const countryLayers = useRef<L.GeoJSON[]>([]);

  useEffect(() => {
    if (!context) {
      return;
    }

    // if disasterData length changed, filter changed so we need to remove filtered-out layers
    // if (disasterData !== previousDisasterData.current) {
    //   previousDisasterData.current = disasterData;
    //   countryLayers.current.forEach((layer) => {
    //     context.layerContainer?.removeLayer(layer);
    //   });
    //   countriesInMap.current.clear();
    // }

    disasterData.forEach((disaster) => {
      getCountryGeoJson(disaster.countryIso).then((country) => {
        if (countriesInMap.current.has(disaster.countryIso)) {
          return;
        }

        const container = context.layerContainer || context.map;

        const countryLayer = L.geoJSON(country, {
          style: {
            color: getCountryColor(disaster.countryIso),
            weight: 2,
            opacity: 0.9,
          },
        });

        countryLayer.addEventListener("click", () => {
          console.log("Clicked on country", disaster.countryIso);
          setFilter(disaster.countryIso);
        });

        container.addLayer(countryLayer);
        countriesInMap.current.add(disaster.countryIso);
        countryLayers.current.push(countryLayer);
      });
    });
  }, [disasterData, setFilter, context, setSelectedDisaster]);
}
