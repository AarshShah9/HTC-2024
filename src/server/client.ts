"use server";

import { DisasterResponse, getActiveCrisies } from "./crisises";
import {
  getAllUniqueThemes,
  searchOrganizationsByThemesAndCountry,
  Theme,
} from "./organizations";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export type mapObject = {
  name: string;
  lat: number;
  lng: number;
  countryIso: string;
  countryName: string;
  summary: string;
  nonProfits: nonProfit[];
  disasterType: string;
  organizations: organization[];
};

type nonProfit = {
  name: string;
  websiteUrl: string;
  logoUrl: string;
  orgSummary: string;
};

type organization = {
  name: string;
  websiteUrl: string;
  donationMatched: number;
};

export async function main(): Promise<mapObject[]> {
  const mO: mapObject[] = [];

  // get all the active crises
  const activeCrises = await getActiveCrisies();

  // get all the themes that exist in the non profit organizations
  const themes = getAllUniqueThemes();

  // pass all of the themes and active crises to an LLM and get each crises to be categorized by n # of themes
  const categorizedCrises = await categorizeCrisesByThemes(
    activeCrises!,
    themes,
  );

  // Then for each crises call searchOrganizationsByThemeAndCountry(themeId, countryCode) and add the non-profit organizations that are found as a result to each organization
  for (const { crisis, themeIds } of categorizedCrises) {
    const nonProfits: nonProfit[] = [];
    const countryCode = crisis.data?.[0].fields.country?.[0].iso3 ?? "";
    const countryName = crisis.data?.[0].fields.country?.[0].name ?? "";
    const orgs = searchOrganizationsByThemesAndCountry(themeIds, countryName);
    orgs.forEach((org) => {
      nonProfits.push({
        name: org.name,
        websiteUrl: org.url,
        logoUrl: org.logoUrl,
        orgSummary: org.mission,
      });
    });

    // then construct the mO list and return it to the client side
    mO.push({
      name: crisis.data?.[0].fields.name || "",
      lat: crisis.data?.[0].fields.country?.[0].location.lat,
      lng: crisis.data?.[0].fields.country?.[0].location.lon,
      countryIso: countryCode,
      countryName: countryName,
      summary: crisis.data?.[0].fields.description || "",
      nonProfits,
      disasterType: crisis.data?.[0].fields.type[0]?.name || "",
      organizations: [],
    });
  }
  return mO;
}

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: SchemaType.OBJECT,
    properties: {
      crisies: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            themeIds: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.STRING,
              },
            },
            id: {
              type: SchemaType.STRING,
            },
            type: {
              type: SchemaType.STRING,
            },
          },
        },
      },
    },
  },
};

type geminiResponse = {
  crisies: {
    type: string;
    id: string;
    themeIds: string[];
  }[];
};

type updateCrises = {
  crisis: DisasterResponse;
  themeIds: string[];
};

async function categorizeCrisesByThemes(
  crises: DisasterResponse[],
  themes: Theme[],
): Promise<updateCrises[]> {
  // Logic to categorize crises based on themes using an LLM

  const flattenedCrises = crises.map((c) => {
    return { typeName: c.data?.[0].fields.primary_type.name, id: c.href };
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const flattenedCrisesString = JSON.stringify(flattenedCrises);
  const themesString = JSON.stringify(themes);
  const result = await chatSession.sendMessage(
    `Can you take the list of crises which includes a name and id, and then map the crises based on its name to some N number of themes. And then return a json object which is a list of the crises list I gave you but with a list of the themeIds added on which match the crisis. The Crises ${flattenedCrisesString}, The Themes: ${themesString}`,
  );
  const jsonRes = JSON.parse(result.response.text()) as geminiResponse;
  // parse it back to the disaster response but including the themeIds this time. Also do a bit of cleaning to get rid duplicates that the LLM may have included by looking for duplicate Ids (hrefs)

  // To prevent duplicates, create a Map to track unique crises by `id`
  const uniqueCrisesMap = new Map<string, updateCrises>();

  // Process each crisis from the response, ensuring no duplicate `id`s
  jsonRes.crisies.forEach((c) => {
    if (!uniqueCrisesMap.has(c.id)) {
      // Find the original `DisasterResponse` object based on `id`
      const originalCrisis = crises.find((crisis) => crisis.href === c.id);
      if (originalCrisis) {
        // Add crisis with its themeIds to the map if it's unique
        uniqueCrisesMap.set(c.id, {
          crisis: originalCrisis,
          themeIds: c.themeIds,
        });
      }
    }
  });

  return Array.from(uniqueCrisesMap.values());
}
