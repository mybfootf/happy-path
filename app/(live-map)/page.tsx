import dynamic from 'next/dynamic';

import { getShipsDataGeo } from '../actions/ships';

const MapComponent = dynamic(
  () => import('./components/Map')
);

export default async function LiveMap() {
  // if (!token) {
  //   return (
  //     <div className='w-full h-screen flex items-center justify-center'>
  //       <p className='text-2xl font-bold'>
  //         Failed to load map
  //       </p>
  //     </div>
  //   );
  // }

  const ships = await getShipsDataGeo();
  // const ships = await getShipsData(token.access_token);

  return (
    <main className='w-full h-screen'>
      <MapComponent ships={ships} />
    </main>
  );
}
