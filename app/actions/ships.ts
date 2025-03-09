import { getApiToken } from './api-token';

export const getShipsDataGeo = async (token: string) => {
  // const token = await getApiToken();
  // if (!token) {
  //   console.error('🚨 No API token available!');
  //   return null;
  // }

  try {
    const response = await fetch(
      `https://live.ais.barentswatch.no/v1/combined?modelType=Full&modelFormat=Geojson`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shipTypes: [80],
          // // countryCodes: ['DK'],
          modelType: 'Full',
          Downsample: false,
        }),
        // next: {
        //   revalidate: 60 * 60,
        // },
      }
    );

    if (!response.body) {
      throw new Error('🚨 Response body is empty!');
    }

    // Read and process the stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = '';

    const MAX_CHUNKS = 10; // Prevent infinite loops
    let chunkCount = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      result += chunk;

      chunkCount++;
      if (chunkCount > MAX_CHUNKS) {
        // console.error('Stream reading exceeded max limit.');
        break; // Exit to prevent infinite loop
      }
    }

    const lines = result.trim().split('\n'); // Split into separate JSON lines
    const ships = lines.map(line => JSON.parse(line)); // Parse each line

    return ships;
  } catch (error) {
    console.error(
      'Error fetching ships data (GeoJSON):',
      error
    );
    return null;
  }
};

export const getShipsData = async (token: string) => {
  try {
    const response = await fetch(
      `https://live.ais.barentswatch.no/v1/latest/combined?modelType=Full`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60,
        },
      }
    );

    const data = await response.json();

    const ships = data.map((ship: any) => {
      if (ship.shipType >= 80 && ship.shipType < 85) {
        const riskLevel =
          ship.shipType > 83
            ? 'high'
            : ship.shipType >= 81 && ship.shipType <= 83
            ? 'medium'
            : 'low';

        return {
          ...ship,
          risk: riskLevel,
        };
      }
    });

    return ships;
    // return data.slice(0, 30);
  } catch (error) {
    console.error('Error fetching ships data:', error);
    return null;
  }
};

export const getShipDetails = async (
  mmsi: number,
  token: string
) => {
  // const token = await getApiToken();
  // if (!token) {
  //   console.error('🚨 No API token available!');
  //   return null;
  // }

  try {
    const response = await fetch(
      `https://historic.ais.barentswatch.no/v1/historic/trackslast24hours/${mmsi}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.body) {
      throw new Error('🚨 Response body is empty!');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      result += chunk;
    }

    const lines = result.trim().split('\n'); // Split into separate JSON lines
    const data = lines.map(line => JSON.parse(line)); // Parse each line

    const routeGeoJSON = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: data[0].map((point: any) => [
          point.longitude,
          point.latitude,
        ]),
      },
      properties: {
        mmsi: mmsi,
      },
    };

    return routeGeoJSON;
  } catch (error) {
    console.error('Error fetching ship details:', error);
    return null;
  }
};
