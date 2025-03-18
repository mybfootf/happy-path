import Image from 'next/image';
import { X } from 'lucide-react';

import { ArrowRight } from 'lucide-react';
import flagImg from '@/public/images/flag.svg';
import { RiskBar } from '@/app/components/shared/RiskBar';
import { TripSummary } from '@/app/components/shared/TripSummary';

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

type SelectedShipModalProps = {
  selectedShip: ShipProps | null;
  setSelectedShip: (ship: ShipProps) => void;
};

export const SelectedShipModal = ({
  selectedShip,
  setSelectedShip,
}: SelectedShipModalProps) => {
  return (
    <div className='absolute top-[90px] right-6 bg-white p-4 rounded-lg shadow-lg w-[500px] text-primaryDark space-y-4'>
      <div className='flex items-start justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Image
            src={flagImg}
            alt='flag.'
            width={32}
            height={24}
          />
          <h3 className='text-2xl font-bold'>
            {selectedShip && selectedShip.name}
          </h3>
        </div>
        <button
          className='text-2xl'
          onClick={() => setSelectedShip(null)}
        >
          <X />
        </button>
      </div>
      <p className='text-gray1'>Oil/Chemical Tanker</p>

      {selectedShip?.risk && (
        <RiskBar risk={selectedShip?.risk} />
      )}

      <ul className='text-gray1'>
        <li className='inline-flex items-center gap-1 mr-3 p-0'>
          {' '}
          <span className='text-xl'>&#x2022;</span> Flag:
          Panama
        </li>
        <li className='inline-flex items-center gap-1 mr-3'>
          <span className='text-xl'>&#x2022;</span> MMSI:{' '}
          {selectedShip?.mmsi}
        </li>
        <li className='inline-flex items-center gap-1 mr-3'>
          <span className='text-xl'>&#x2022;</span> Course:{' '}
          {selectedShip?.courseOverGround}°
        </li>
        <li className='inline-flex items-center gap-1 mr-3'>
          <span className='text-xl'>&#x2022;</span>{' '}
          Latitude: {selectedShip?.latitude}
        </li>
        <li className='inline-flex items-center gap-1 mr-3'>
          <span className='text-xl'>&#x2022;</span>{' '}
          Longitude: {selectedShip?.longitude}
        </li>
      </ul>

      <div className=''>
        <p className='text-lg font-bold mb-2'>
          Trip Summary
        </p>

        {selectedShip && (
          <TripSummary ship={selectedShip} />
        )}
      </div>
      <div className='flex justify-end'>
        <button className='bg-blue-600 text-white p-2 rounded-md font-bold px-8'>
          Generate Report
        </button>
      </div>
    </div>
  );
};
