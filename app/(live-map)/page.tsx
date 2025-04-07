import dynamic from 'next/dynamic';

import {
  getShipsData,
  getShipsDataGeo,
} from '../actions/ships';
import { getApiToken } from '../actions/api-token';

const MapComponent = dynamic(
  () => import('./components/Map')
);

export default async function LiveMap() {
  const token = await getApiToken();

  // const s = await getShipsDataGeo(token.access_token);
  const ships = await getShipsData(token.access_token);

  // console.log(ships);

  return (
    <main className='w-full h-screen relative'>
      <MapComponent
        ships={ships}
        token={token.access_token}
      />
    </main>
  );
}
