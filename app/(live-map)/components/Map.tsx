'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { easeCubic } from 'd3-ease';
import { CircleAlert } from 'lucide-react';

// import ships from '@/data/ships';
import shipRedImg from '@/public/images/ship_red.svg';
import shipYellowImg from '@/public/images/ship_yellow.svg';
import shipGreenImg from '@/public/images/ship_green.svg';
import flagImg from '@/public/images/flag.svg';

interface ShipProps {
  geometry: {
    coordinates: number[];
  };
  properties: {
    name: string;
    mmsi: number;
    courseOverGround: number;
    risk: string;
    callSign: string;
    destination: string;
    eta: string;
  };
}

interface MapComponentProps {
  ships: ShipProps[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  ships,
}) => {
  const [selectedShip, setSelectedShip] =
    useState<ShipProps | null>(null);
  const mapRef = useRef(null);

  const [viewState, setViewState] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
    transitionDuration?: number;
    transitionEasing?: (t: number) => number;
  }>({
    longitude: 11.0,
    latitude: 65.0,
    zoom: 5,
  });

  // Handle ship click: Center ship & show info in the top-left
  interface HandleShipClick {
    (ship: ShipProps): void;
  }

  const handleShipClick: HandleShipClick = ship => {
    setSelectedShip(ship);
    if (mapRef.current) {
      mapRef.current.easeTo({
        center: [
          ship.geometry.coordinates[0],
          ship.geometry.coordinates[1],
        ],
        zoom: 11,
        duration: 1200, // Smooth animation duration
        easing: easeCubic, // Smooth movement
      });
    }
  };

  console.log(selectedShip);

  return (
    <Map
      ref={mapRef}
      {...viewState}
      mapboxAccessToken={
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      }
      style={{ width: '100%', height: '100vh' }}
      mapStyle='mapbox://styles/david-hanenko/cm73ctjx800ae01s84jwm7to8?fresh=true'
      onMove={evt => setViewState(evt.viewState)}
    >
      {ships &&
        ships.map((ship, i) => {
          const shipImg =
            ship.properties?.risk === 'high'
              ? shipRedImg
              : ship.properties?.risk === 'medium'
              ? shipYellowImg
              : shipGreenImg;
          return (
            ship && (
              <Marker
                key={
                  ship.properties.name +
                  ship.properties.callSign
                }
                longitude={ship.geometry.coordinates[0]}
                latitude={ship.geometry.coordinates[1]}
                className='relative'
              >
                <Image
                  src={shipImg}
                  alt='Ship Icon'
                  width={10}
                  height={20}
                  className={`cursor-pointer ${
                    ship.properties.name ===
                    selectedShip?.properties.name
                      ? 'animate-pulse'
                      : ''
                  }`}
                  onClick={() => handleShipClick(ship)}
                  style={{
                    transform: `rotate(${ship.properties.courseOverGround}deg)`,
                  }}
                />
                {/* <div
              className={`absolute top-1/2 left-1/2 opacity-0 m-3 rounded-full h-10 w-10 shadow-lg animate-pulsate`}
            ></div> */}
              </Marker>
            )
          );
        })}

      {selectedShip && (
        <div className='absolute top-[90px] right-6 bg-white p-4 rounded-lg shadow-lg w-[500px] text-primaryDark space-y-3'>
          <div className='flex items-start justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <Image
                src={flagImg}
                alt='flag.'
                width={32}
                height={24}
              />
              <h3 className='text-2xl font-bold'>
                {selectedShip.properties.name}
              </h3>
            </div>
            <button
              className='text-2xl'
              onClick={() => setSelectedShip(null)}
            >
              &times;
            </button>
          </div>
          <p className='text-gray1'>Oil/Chemical Tanker</p>

          <div
            className={`flex items-center justify-between gap-4 border p-2 rounded-md ${
              selectedShip.risk == 'high'
                ? 'text-red-500 border-red-500 bg-red-100'
                : selectedShip.risk == 'medium'
                ? 'text-yellow-500 border-yellow-500 bg-yellow-100'
                : 'text-green-500 border-green-500 bg-green-100'
            }`}
          >
            <div className={`flex items-center gap-1 `}>
              <CircleAlert className={`w-4 h-4 `} />
              <p className='capitalize'>
                {selectedShip.properties.risk} Risk
              </p>
            </div>
            <p>Illegal oil trade</p>
          </div>

          <ul className='text-gray1'>
            <li className='inline-flex items-center gap-1 mr-3'>
              {' '}
              <span className='text-xl'>&#x2022;</span>{' '}
              Flag: Panama
            </li>
            <li className='inline-flex items-center gap-1 mr-3'>
              <span className='text-xl'>&#x2022;</span>{' '}
              MMSI: {selectedShip.properties.mmsi}
            </li>
            <li className='inline-flex items-center gap-1 mr-3'>
              <span className='text-xl'>&#x2022;</span>{' '}
              Course:{' '}
              {selectedShip.properties.courseOverGround}°
            </li>
            <li className='inline-flex items-center gap-1 mr-3'>
              <span className='text-xl'>&#x2022;</span>{' '}
              Latitude:{' '}
              {selectedShip.geometry.coordinates[1]}
            </li>
            <li className='inline-flex items-center gap-1 mr-3'>
              <span className='text-xl'>&#x2022;</span>{' '}
              Longitude:{' '}
              {selectedShip.geometry.coordinates[0]}
            </li>
          </ul>

          <div>
            <p className='text-lg font-bold'>
              Trip Summary
            </p>
            <ul className='text-gray1'>
              <li className='inline-flex items-center gap-1 mr-3'>
                {' '}
                <span className='text-xl'>
                  &#x2022;
                </span>{' '}
                Departure: Tromsø, Norway
              </li>
              <li className='inline-flex items-center gap-1 mr-3'>
                <span className='text-xl'>&#x2022;</span>{' '}
                Destination:{' '}
                {selectedShip.properties.destination}{' '}
              </li>
              <li className='inline-flex items-center gap-1 mr-3'>
                <span className='text-xl'>&#x2022;</span>{' '}
                ETA: {selectedShip.properties.eta}
              </li>
            </ul>
          </div>
        </div>
      )}
    </Map>
  );
};

export default MapComponent;
