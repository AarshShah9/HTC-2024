"use server";

import fs from "fs";
import path from "path";

type Organization = {
  activeProjects: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  countries: {
    country: {
      iso3166CountryCode: string;
      name: string;
    };
  };
  country: string;
  ein: string;
  id: number;
  iso3166CountryCode: string;
  logoUrl: string;
  mission: string;
  name: string;
  postal: string;
  state: string;
  themes: {
    theme: {
      id: string;
      name: string;
    }[];
  };
  totalProjects: number;
  url: string;
};

export async function searchOrganizationsByThemeAndCountry(
  themeId: string,
  countryCode: string,
): Promise<Organization[]> {
  const filePath = path.join(process.cwd(), "data", "organization-data.json");

  // Read and parse the JSON file
  const data = await fs.promises.readFile(filePath, "utf-8");
  const organizations: Organization[] = JSON.parse(data);

  // Filter organizations by theme and country
  return organizations.filter(
    (org) =>
      org.countries.country.iso3166CountryCode === countryCode &&
      org.themes.theme.some((t) => t.id === themeId),
  );
}

type Country = {
  iso3166CountryCode: string;
  name: string;
};

export async function getAllCountries(): Promise<Country[]> {
  const filePath = path.join(process.cwd(), "src\\server\\data", "organization-data.json");
  // Read and parse the JSON file
  const data = await fs.promises.readFile(filePath, 'utf-8');
  const organizationsData = JSON.parse(data);

  // Assuming the JSON structure is as described
  const organizations: Organization[] = organizationsData.organizations.organization;

  // Collect unique countries
 const countriesMap = new Map<string, string>();
  organizations.forEach(org => {
    const country = org.countries?.country;
    if (country && country.iso3166CountryCode) {
      if (!countriesMap.has(country.iso3166CountryCode)) {
        countriesMap.set(country.iso3166CountryCode, country.name);
      }
    }
  });

  // Convert the Map to an array of Country objects
  return Array.from(countriesMap, ([iso3166CountryCode, name]) => ({ iso3166CountryCode, name }));
}

type Theme = {
  id: string;
  name: string;
};

export async function getAllUniqueThemes(): Promise<Theme[]> {
  const filePath = path.join(process.cwd(), "src", "server", "data", "organization-data.json");

  // Read and parse the JSON file
  const data = await fs.promises.readFile(filePath, 'utf-8');
  const organizationsData = JSON.parse(data);

  // Assuming the JSON structure is as described
  const organizations: Organization[] = organizationsData.organizations.organization;

  // Collect unique themes
  const themesMap = new Map<string, string>();
  organizations.forEach(org => {
    const themes = org.themes?.theme;

    // Ensure themes is an array before using forEach
    if (Array.isArray(themes)) {
      themes.forEach(theme => {
        if (!themesMap.has(theme.id)) {
          themesMap.set(theme.id, theme.name);
        }
      });
    }
  });

  // Convert the Map to an array of Theme objects
  return Array.from(themesMap, ([id, name]) => ({ id, name }));
}
