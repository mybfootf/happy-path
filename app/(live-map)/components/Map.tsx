'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { easeCubic } from 'd3-ease';
import { CircleAlert } from 'lucide-react';

// import ships from '@/data/ships';
import shipRedImg from '@/public/images/ship_red.svg';
import shipYellowImg from '@/public/images/ship_yellow.svg';
import shipGreenImg from '@/public/images/ship_green.svg';

import { getShipDetails } from '@/app/actions/ships';
import { SelectedShipModal } from './SelectedShipModal';
import { SelectedShipRoute } from './SelectedShipRoute';

interface ShipProps {
  name: string;
  mmsi: number;
  courseOverGround: number;
  risk: string;
  callSign: string;
  destination: string;
  eta: string;
  longitude: number;
  latitude: number;
  shipType: number;
  speed: number;
  length: number;
  width: number;
  draught: number;
  heading: number;
}

interface MapComponentProps {
  ships: ShipProps[];
  token: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  ships,
  token,
}) => {
  const [selectedShip, setSelectedShip] =
    useState<ShipProps | null>(null);
  const [selectedShipData, setSelectedShipData] =
    useState(null);

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
        center: [ship.longitude, ship.latitude],
        zoom: 8,
        duration: 1200, // Smooth animation duration
        easing: easeCubic, // Smooth movement
      });
    }
  };

  useEffect(() => {
    const getShiptData = async () => {
      if (selectedShip) {
        const data = await getShipDetails(
          selectedShip.mmsi,
          token
        );

        setSelectedShipData(data);
      }
    };
    getShiptData();
  }, [selectedShip, token]);

  // console.log(selectedShipData);

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
        ships.map(ship => {
          const shipImg =
            ship?.risk == 'high'
              ? shipRedImg
              : ship?.risk == 'medium'
              ? shipYellowImg
              : shipGreenImg;
          return (
            ship && (
              <Marker
                key={ship.mmsi}
                longitude={ship.longitude}
                latitude={ship.latitude}
                className='relative'
              >
                <Image
                  src={shipImg}
                  alt='Ship Icon'
                  width={10}
                  height={20}
                  className={`cursor-pointer ${
                    ship.name === selectedShip?.name
                      ? 'animate-pulse'
                      : ''
                  }`}
                  onClick={() => handleShipClick(ship)}
                  style={{
                    transform: `rotate(${ship.courseOverGround}deg)`,
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
        <SelectedShipModal
          selectedShip={selectedShip}
          setSelectedShip={setSelectedShip}
        />
      )}

      {selectedShipData && (
        <SelectedShipRoute
          selectedShipData={selectedShipData}
        />
      )}
    </Map>
  );
};

export default MapComponent;
