import { getApiToken } from './api-token';

export const getShipsDataGeo = async () => {
  const token = await getApiToken();
  if (!token) {
    console.error('🚨 No API token available!');
    return null;
  }

  try {
    const response = await fetch(
      `https://live.ais.barentswatch.no/v1/combined?modelType=Full&modelFormat=Geojson`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          // 'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   shipTypes: [20],
        //   countryCodes: ['DK'],
        //   modelType: 'Full',
        //   Downsample: false,
        // }),
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

    const MAX_CHUNKS = 100; // Prevent infinite loops
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
      `https://live.ais.barentswatch.no/v1/latest/combined`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60 * 60, // 1 hour
        },
      }
    );

    const data = await response.json();
    console.log(data);
    return data.slice(0, 20);
  } catch (error) {
    console.error('Error fetching ships data:', error);
    return null;
  }
};
