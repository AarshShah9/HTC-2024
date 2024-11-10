"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { Input } from "@headlessui/react";
import { mapObject } from "@/server/client";
import logo from "../../public/relief-map-logo.png";
import Image from "next/image";

// https://youtu.be/PZlPBOqb3kg
const isoToEmoji = (iso = "  ") =>
  iso
    .split("")
    .slice(0, 2)
    .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
    .map((unicode) => String.fromCodePoint(unicode))
    .join("");

type MainSideBarProps = {
  disasterData: mapObject[];
  selectedDisaster: mapObject | null;
  setSelectedDisaster: (disaster: mapObject | null) => void;
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
  const isSelected = (disaster: mapObject) =>
    selectedDisaster && disaster.name === selectedDisaster.name;

  return (
    <>
      <div className="max-h-screen w-1/3 overflow-auto transition duration-100 ease-in data-[closed]:opacity-0">
        <div className="flex h-full w-full flex-col">
          <div className={"flex flex-row justify-between"}>
            <div className={"ml-4 mt-2"}>
              <Image
                src={logo}
                alt="Relief Map Logo"
                width={100}
                height={100}
                priority
              />
            </div>
            <button
              type="button"
              className="mr-4 mt-2 rounded bg-white px-2 py-1 text-sm font-semibold text-black shadow-sm hover:bg-[#f1f5f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() =>
                window.open("https://us.makeforms.co/ijbwnfo/", "_blank")
              }
            >
              Upload Invoice
            </button>
          </div>
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
                  <p>{isoToEmoji(disaster.countryIso)}</p>
                  <p>{disaster.disasterType}</p>
                  {isSelected(disaster) && (
                    <>
                      <div className="mt-2">
                        <h3 className="text-md font-bold">
                          What&apos;s happening?
                        </h3>

                        <div className="mt-4 max-h-16 overflow-hidden text-sm/5 text-white/50">
                          {disaster.summary}
                        </div>

                        <h3 className="text-md mt-4 font-bold">
                          Who&apos;s helping?
                        </h3>

                        {disaster.nonProfits.slice(0, 5).map((np) => (
                          <div
                            key={np.name}
                            className="mb-2 flex flex-row items-center justify-start gap-2"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element*/}
                            <img
                              src={np.logoUrl}
                              alt={np.name}
                              width={50}
                              height={50}
                              className="rounded-xl"
                            />
                            <a
                              href={np.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-300 hover:underline"
                            >
                              {np.name}
                            </a>
                          </div>
                        ))}
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
