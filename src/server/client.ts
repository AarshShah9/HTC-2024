import { DisasterResponse, getActiveCrisies } from "./crisises";
import { getAllUniqueThemes, searchOrganizationsByThemeAndCountry, searchOrganizationsByThemesAndCountry, Theme } from "./organizations";

type mapObject = {
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
  console.log("Active Crises", activeCrises)

  // get all the themes that exist in the non profit organizations
  const themes = await getAllUniqueThemes();
  console.log("themes", themes)

  // pass all of the themes and active crises to an LLM and get each crises to be categorized by n # of themes
  const categorizedCrises = await categorizeCrisesByThemes(
    activeCrises!,
    themes,
  );
  console.log("categorizedCrises", categorizedCrises)

  // Then for each crises call searchOrganizationsByThemeAndCountry(themeId, countryCode) and add the non-profit organizations that are found as a result to each organization
  for (const { crisis, themeIds } of categorizedCrises) {
    const nonProfits: nonProfit[] = [];
    const countryCode = crisis.data?.[0].fields.country?.[0].iso3 ?? ""
    const countryName = crisis.data?.[0].fields.country?.[0].name ?? ""
    const orgs = await searchOrganizationsByThemesAndCountry(themeIds, countryCode);
    orgs.forEach(org => {
        nonProfits.push({
            name: org.name,
            websiteUrl: org.url,
            logoUrl: org.logoUrl,
            orgSummary: org.mission,
        });
    });
    
    // then construct the mO list and return it to the client side
    mO.push({
        lat: crisis.data?.[0].fields.country?.[0].location.lat,
        lng: crisis.data?.[0].fields.country?.[0].location.lon,
        countryIso: countryCode,
        countryName: countryName,
        summary: crisis.data?.[0].fields.description || "",
        nonProfits,
        disasterType: crisis.data?.[0].fields.type[0]?.name || "",
        organizations: nonProfits.map(org => ({
            name: org.name,
            websiteUrl: org.websiteUrl,
            donationMatched: 0, // Add relevant logic if donationMatched info is available
        })),
    });
  }
  return mO;
}

async function categorizeCrisesByThemes(
  crises: DisasterResponse[],
  themes: Theme[],
): Promise<{ crisis: DisasterResponse; themeIds: string[] }[]> {
  // Logic to categorize crises based on themes using an LLM
  return crises?.map((crisis) => ({ crisis, themeIds: ["exampleThemeId"] })); // Stub implementation
}
