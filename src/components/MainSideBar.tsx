"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { Input } from "@headlessui/react";
import { Disaster } from "@/types/disaster";

// https://youtu.be/PZlPBOqb3kg
const isoToEmoji = (iso: string) =>
  iso
    .split("")
    .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
    .map((unicode) => String.fromCodePoint(unicode))
    .join("");

type MainSideBarProps = {
  disasterData: Disaster[];
  selectedDisaster: Disaster | null;
  setSelectedDisaster: (disaster: Disaster | null) => void;
  filter: string;
  setFilter: (filter: string) => void;
};

export default function MainSideBar({
  disasterData,
  selectedDisaster,
  setSelectedDisaster,
  filter,
  setFilter,
}: MainSideBarProps) {
  const getCountryName = new Intl.DisplayNames(["en"], { type: "region" });
  const isSelected = (disaster: Disaster) =>
    selectedDisaster && disaster.name === selectedDisaster.name;

  return (
    <>
      <div className="w-1/3 transition duration-100 ease-in data-[closed]:opacity-0">
        <div className="flex h-full w-full flex-col">
          <h1 className="p-4 text-xl font-bold">Product Name</h1>
          <div className="flex w-full flex-row justify-between gap-2 p-4">
            <Input
              type="text"
              placeholder="Search 🔎"
              className="w-full rounded-xl border-2 border-zinc-400 bg-gradient-to-r from-zinc-800 to-zinc-900 p-2 font-bold"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
            <button className="rounded-xl border-2 border-zinc-400 p-2">
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="p-4">
            {disasterData.map((disaster) => (
              <div
                key={disaster.name}
                onClick={() => setSelectedDisaster(disaster)}
                className={`mb-4 rounded-xl border-2 ${isSelected(disaster) ? "border-cyan-600" : "border-zinc-400"} bg-gradient-to-tr from-zinc-950 to-zinc-600 p-4 shadow-lg`}
              >
                <div className="flex flex-col justify-between">
                  <h2 className="text-lg font-bold">{disaster.name}</h2>
                  <p>{disaster.disasterType}</p>
                  <p>
                    <span className="pr-2">
                      {isoToEmoji(disaster.countryIso)}
                    </span>
                    {getCountryName.of(disaster.countryIso)}
                  </p>
                  {isSelected(disaster) && (
                    <>
                      <div className="mt-2">
                        <h3 className="text-md font-bold">
                          Who&apos;s Helping
                        </h3>

                        {disaster.orgs.map((org) => (
                          <div
                            key={org.name}
                            className="flex flex-row justify-between"
                          >
                            <a
                              href={org.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-300 hover:underline"
                            >
                              {org.name}
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-sm/5 text-white/50">
                        {disaster.summary}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
