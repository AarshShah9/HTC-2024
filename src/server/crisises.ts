"use server";

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
    "Accept": "application/json",
  };
  
  const body = {
    filter: {
      field: "status",
      value: ["alert", "ongoing"]
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
    const disasterDetails: any[] = [];

    // Fetch details from each disaster's href
    for (let disaster of initialData.data) {
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
