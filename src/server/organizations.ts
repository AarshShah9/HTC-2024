import fs from "fs";
import path from "path";

type Country = {
  iso3166CountryCode: string;
  name: string;
};

type Organization = {
  activeProjects: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  countries: {
    country: Country | Country[];  // country can be either an object or an array of objects
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
    theme: NamedType[] | NamedType;
  };
  totalProjects: number;
  url: string;
};

type NamedType = {
  id: string
  name: string
}

export async function searchOrganizationsByThemesAndCountry(
  themeIds: string[],
  countryName: string,
): Promise<Organization[]> {
  const filePath = path.join(
    process.cwd(),
    "src", "server", "data", "organization-data.json",
  );

  // Read and parse the JSON file
  const data = await fs.promises.readFile(filePath, "utf-8");
  const organizationsData = JSON.parse(data);

  // Assuming the JSON structure is as described
  const organizations: Organization[] =
    organizationsData.organizations.organization;

  return organizations.filter(org => {
    // Handle country being an object or array of objects
    const country = org.countries?.country;
    const matchesCountry = Array.isArray(country)
      ? country.some(c => c.name === countryName)
      : country?.name === countryName;

    // Handle theme being an object or an array of objects
    const themes = org.themes?.theme;
    const matchesTheme = Array.isArray(themes)
      ? themes.some(theme => themeIds.includes(theme.id))
      : themes && themeIds.includes(themes.id);

    return matchesCountry && matchesTheme;
  });
}

export type Theme = {
  id: string;
  name: string;
};

export async function getAllUniqueThemes(): Promise<Theme[]> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "server",
    "data",
    "organization-data.json",
  );

  // Read and parse the JSON file
  const data = await fs.promises.readFile(filePath, "utf-8");
  const organizationsData = JSON.parse(data);

  // Assuming the JSON structure is as described
  const organizations: Organization[] =
    organizationsData.organizations.organization;

  // Collect unique themes
  const themesMap = new Map<string, string>();
  organizations.forEach((org) => {
    const themes = org.themes?.theme;

    // Ensure themes is an array before using forEach
    if (Array.isArray(themes)) {
      themes.forEach((theme) => {
        if (!themesMap.has(theme.id)) {
          themesMap.set(theme.id, theme.name);
        }
      });
    }
  });

  // Convert the Map to an array of Theme objects
  return Array.from(themesMap, ([id, name]) => ({ id, name }));
}
