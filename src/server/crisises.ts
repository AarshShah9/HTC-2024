"use server";

export type DisasterResponse = {
  time: number;
  href: string;
  links: {
    self: {
      href: string;
    };
    collection: {
      href: string;
    };
  };
  took: number;
  totalCount: number;
  count: number;
  data: Array<{
    id: string;
    fields: {
      id: number;
      name: string;
      description: string;
      status: string;
      glide: string;
      related_glide: string[];
      primary_country: {
        href: string;
        id: number;
        name: string;
        shortname: string;
        iso3: string;
        location: {
          lat: number;
          lon: number;
        };
      };
      primary_type: {
        id: number;
        name: string;
        code: string;
      };
      country: Array<{
        href: string;
        id: number;
        name: string;
        shortname: string;
        iso3: string;
        location: {
          lat: number;
          lon: number;
        };
        primary: boolean;
      }>;
      type: Array<{
        id: number;
        name: string;
        code: string;
        primary: boolean;
      }>;
      url: string;
      url_alias: string;
      date: {
        changed: string;
        created: string;
        event: string;
      };
      current: boolean;
      "description-html": string;
      profile: {
        overview: string;
        appeals_response_plans: {
          title: string;
          active: Array<{
            url: string;
            title: string;
            cover: string;
          }>;
        };
        useful_links: {
          title: string;
          active: Array<{
            url: string;
            title: string;
            logo?: string;
          }>;
        };
        "overview-html": string;
      };
    };
  }>;
};

export async function getActiveCrisies() {
  try {
    return getOngoingOrAlertDisasters();
  } catch (error) {
    console.error(error);
  }
}

async function getOngoingOrAlertDisasters() {
  const url = "https://api.reliefweb.int/v1/disasters";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const body = {
    filter: {
      field: "status",
      value: ["alert", "ongoing"],
    },
    limit: 1000,
    appname: "htc-2024",
  };

  try {
    // Fetch initial list of disasters
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const initialData = await response.json();

    // Array to hold the detailed data from each disaster's href link
    const disasterDetails: DisasterResponse[] = [];

    // Fetch details from each disaster's href
    for (const disaster of initialData.data) {
      if (disaster.href) {
        const detailResponse = await fetch(disaster.href, { headers });
        if (!detailResponse.ok) {
          console.warn(`Warning: Failed to fetch details for ${disaster.href}`);
          continue;
        }

        const detailData = await detailResponse.json();
        disasterDetails.push(detailData);
      }
    }

    console.log("All Disaster Details:", disasterDetails);
    return disasterDetails;
  } catch (error) {
    console.error("Failed to fetch disasters:", error);
  }
}
