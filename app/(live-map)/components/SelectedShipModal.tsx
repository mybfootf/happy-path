import Image from 'next/image';
import { CircleAlert, X } from 'lucide-react';

import { ArrowRight } from 'lucide-react';
import flagImg from '@/public/images/flag.svg';

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

      <div
        className={`flex items-center justify-between gap-4 border p-2 rounded-md ${
          selectedShip?.risk == 'high'
            ? 'text-red-500 border-red-500 bg-red-100'
            : selectedShip?.risk == 'medium'
            ? 'text-yellow-500 border-yellow-500 bg-yellow-100'
            : 'text-green-500 border-green-500 bg-green-100'
        }`}
      >
        <div className={`flex items-center gap-1 `}>
          <CircleAlert className={`w-4 h-4`} />
          <p className='capitalize'>
            {selectedShip?.risk} Risk
          </p>
        </div>
        <p>
          {selectedShip?.risk == 'high'
            ? 'Illegal oil trade '
            : selectedShip?.risk == 'medium'
            ? 'Some medium risk'
            : ''}
        </p>
      </div>

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

        <div className='flex items-center justify-between gap-4 border border-gray-300 p-4 rounded-sm'>
          <div>
            <div className='flex items-center gap-2'>
              <Image
                src={flagImg}
                alt='flag.'
                width={32}
                height={24}
              />
              <p className='text-gray-500 text-lg font-bold'>
                Oman
              </p>
            </div>
            <p className='text-gray-500'>Sohar</p>
            <p className='text-gray-500'>
              ADT: 2025/01/16 16:28
            </p>
          </div>
          <ArrowRight className='text-gray-500' />
          <div>
            <div className='flex items-center gap-2'>
              <Image
                src={flagImg}
                alt='flag.'
                width={32}
                height={24}
              />
              <p className='text-gray-500 text-lg font-bold'>
                Oman
              </p>
            </div>
            <p className='text-gray-500'>
              {selectedShip?.destination}
            </p>
            <p className='text-gray-500'>
              {`ETA: 2025/02/${selectedShip?.eta.slice(
                0,
                2
              )} ${selectedShip?.eta.slice(
                2,
                4
              )}:${selectedShip?.eta.slice(4, 6)}`}
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <button className='bg-blue-600 text-white p-2 rounded-md font-bold px-8'>
          Generate Report
        </button>
      </div>
    </div>
  );
};
