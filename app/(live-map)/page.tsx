import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./components/Map'));

export default function LiveMap() {
  return (
    <main className='w-full h-screen'>
      <Map />
    </main>
  );
}
