import { useLeafletContext } from "@react-leaflet/core";
import { useEffect, useRef } from "react";
import { getCountryGeoJson } from "@/server/countries";
import L from "leaflet";

import { getCountryColor } from "@/utils/countryColor";
import { mapObject } from "@/server/client";

type HighlightedCountriesProps = {
  disasterData: mapObject[];
  setFilter: (filter: string) => void;
};

export default function HighlightedCountries({
  disasterData,
  setFilter,
}: HighlightedCountriesProps) {
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
  }, [disasterData, setFilter, context]);
  return null;
}
