'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import flagImg from '@/public/images/flag.svg';

type ShipProps = {
  ship: {
    destination: string;
    eta: string;
  };
  children?: React.ReactNode;
};

export const TripSummary = ({
  ship,
  children,
}: ShipProps) => {
  return (
    <div className='border border-gray-300 p-4 rounded-md'>
      <div className='flex items-center justify-between gap-4'>
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
            {ship?.destination}
          </p>
          <p className='text-gray-500'>
            {`ETA: 2025/02/${ship?.eta?.slice(
              0,
              2
            )} ${ship?.eta?.slice(2, 4)}:${ship?.eta?.slice(
              4,
              6
            )}`}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};
