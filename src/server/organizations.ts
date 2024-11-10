import organizationsData from "./data/organization-data.json";

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
    country: Country | Country[]; // country can be either an object or an array of objects
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
  id: string;
  name: string;
};

export function searchOrganizationsByThemesAndCountry(
  themeIds: string[],
  countryName: string,
): Organization[] {
    // Assuming the JSON structure is as described
  const organizations: Organization[] =
    (organizationsData as any).organizations.organization;

  return organizations.filter((org) => {
    // Handle country being an object or array of objects
    const country = org.countries?.country;
    const matchesCountry = Array.isArray(country)
      ? country.some((c) => c.name === countryName)
      : country?.name === countryName;

    // Handle theme being an object or an array of objects
    const themes = org.themes?.theme;
    const matchesTheme = Array.isArray(themes)
      ? themes.some((theme) => themeIds.includes(theme.id))
      : themes && themeIds.includes(themes.id);

    return matchesCountry && matchesTheme;
  });
}

export type Theme = {
  id: string;
  name: string;
};

export function getAllUniqueThemes(): Theme[] {
  // Assuming the JSON structure is as described
  const organizations: Organization[] =
    (organizationsData as any).organizations.organization;

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
