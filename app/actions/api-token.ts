export const getApiToken = async () => {
  const response = await fetch(
    `https://id.barentswatch.no/connect/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: 'mybfootf@gmail.com:test',
        scope: 'ais',
        client_secret: process.env.API_CLIENT_SECRET || '',
        grant_type: 'client_credentials',
      }),
      // next: {
      //   revalidate: 60 * 60, // 1 hour
      // },
    }
  );

  const data = await response.json();
  return data;
};
