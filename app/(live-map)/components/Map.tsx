'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import Map, { Marker } from 'react-map-gl';
import { useNav } from '@/hooks/useNav';
import 'mapbox-gl/dist/mapbox-gl.css';
import { easeCubic } from 'd3-ease';
import type { MapRef } from 'react-map-gl';

// import ships from '@/data/ships';
import shipRedImg from '@/public/images/ship_red.svg';
import shipYellowImg from '@/public/images/ship_yellow.svg';
import shipGreenImg from '@/public/images/ship_green.svg';

import { getShipDetails } from '@/app/actions/ships';
import { SelectedShipModal } from './SelectedShipModal';
import { SelectedShipRoute } from './SelectedShipRoute';
import { Stats } from './Stats';
import { GenerateReportModal } from './GenerateReportModal';
import { SelectRecipient } from './SelectRecipient';
import { NotificationDialog } from '@/app/components/shared/NotificationDialog';
import { MainLoader } from '@/app/components/shared/MainLoader';

export interface ShipProps {
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
  heading: number;
  shipLength: number;
  shipWidth: number;
  shipDraught: number;
}

interface MapComponentProps {
  ships: ShipProps[];
  token: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  ships,
  token,
}) => {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [selectedShip, setSelectedShip] =
    useState<ShipProps | null>(null);
  const [selectedShipData, setSelectedShipData] =
    useState(null);
  const [isSelectedShipOpen, setIsSelectedShipOpen] =
    useState(false);
  const [isGenerateReportOpen, setIsGenerateReportOpen] =
    useState(false);
  const [isSelectRecipientOpen, setIsSelectRecipientOpen] =
    useState(false);
  const [isNotificationOpen, setIsNotificationOpen] =
    useState(false);

  const mapRef = useRef<MapRef>(null);
  const { onCCenterOpen, onSideNavCollapse } = useNav();

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
    setIsSelectedShipOpen(true);
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

        setSelectedShipData({
          ...data,
          properties: {
            mmsi: selectedShip.mmsi,
            risk: selectedShip.risk,
          },
        });
      }
    };
    getShiptData();
  }, [selectedShip, token]);

  useEffect(() => {
    const checkMapLoaded = () => {
      const map = mapRef.current?.getMap();

      if (map) {
        const handleIdle = () => {
          // Delay to let tiles finish fading in
          setTimeout(() => {
            setIsMapLoading(false);
          }, 500); // adjust delay as needed

          map.off('idle', handleIdle); // clean up
        };

        map.on('idle', handleIdle);
      }
    };

    const interval = setInterval(() => {
      if (mapRef.current?.getMap()) {
        clearInterval(interval);
        checkMapLoaded();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // if (isMapLoading) {
  //   return <MainLoader />;
  // }

  return (
    <>
      {isMapLoading && <MainLoader />}
      <Map
        ref={mapRef}
        {...viewState}
        mapboxAccessToken={
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }
        style={{
          width: '100%',
          height: '100vh',
          fontFamily: 'Inter',
        }}
        mapStyle='mapbox://styles/david-hanenko/cm8wgfqe600qx01sd1owd994m?fresh=true'
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
                </Marker>
              )
            );
          })}

        {selectedShip && isSelectedShipOpen && (
          <SelectedShipModal
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
            isSelectedShipOpen={isSelectedShipOpen}
            setIsSelectedShipOpen={setIsSelectedShipOpen}
            setIsGenerateReportOpen={
              setIsGenerateReportOpen
            }
          />
        )}

        {selectedShipData && (
          <SelectedShipRoute
            selectedShipData={selectedShipData}
          />
        )}

        {selectedShipData && isGenerateReportOpen && (
          <GenerateReportModal
            isGenerateReportOpen={isGenerateReportOpen}
            setIsGenerateReportOpen={
              setIsGenerateReportOpen
            }
            selectedShip={selectedShip}
            setIsSelectRecipientOpen={
              setIsSelectRecipientOpen
            }
          />
        )}

        {isSelectRecipientOpen && (
          <SelectRecipient
            setIsSelectRecipientOpen={
              setIsSelectRecipientOpen
            }
            setIsGenerateReportOpen={
              setIsGenerateReportOpen
            }
            setIsNotificationOpen={setIsNotificationOpen}
          />
        )}

        {isNotificationOpen && (
          <NotificationDialog
            isOpen={isNotificationOpen}
            setIsOpen={setIsNotificationOpen}
            callback={() => {
              setIsNotificationOpen(false);
              onCCenterOpen();
              onSideNavCollapse();
            }}
            btnText={'Return to Command Center'}
            title={'Report Successfully Scheduled!'}
            message={`Your report is being generated. Evidence collection and analysis may take up to 72 hours. You will be notified once it's ready for review in the Evidence Archive and sent to your recipients.`}
            btnClN={
              'bg-blue-600 hover:bg-blue-600/90 text-white'
            }
          />
        )}

        <Stats />
      </Map>
    </>
  );
};

export default MapComponent;
