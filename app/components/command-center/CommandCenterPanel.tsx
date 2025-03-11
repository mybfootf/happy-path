'use client';

import { useAuth } from '@/hooks/useNav';
import {
  ListChecks,
  ArrowLeftFromLine,
  Search,
  SlidersHorizontal,
  Ellipsis,
} from 'lucide-react';

import shipImg from '@/public/images/ship_red.png';
import Image from 'next/image';

export const CommandCenterPanel = ships => {
  const { isCCenterOpen, onCCenterClose, onCCenterOpen } =
    useAuth();

  return (
    <div>
      <div className='absolute top-[100px] left-[100px] z-40 flex justify-between items-center  bg-white rounded-md shadow-xl transition-all duration-300'>
        {!isCCenterOpen ? (
          <div
            className='text-gray-900 cursor-pointer w-full h-full px-6 py-4'
            onClick={() => onCCenterOpen()}
          >
            <ListChecks />
          </div>
        ) : (
          <div className='text-gray-900 px-6 py-4 w-[400px] space-y-2 h-[calc(100vh-120px)] overflow-auto'>
            <div className='flex items-center justify-between gap-4'>
              <p className='text-2xl'>Command Center</p>
              <ArrowLeftFromLine
                className='cursor-pointer text-gray-400 '
                onClick={() => onCCenterClose()}
              />
            </div>
            <div className='relative text-gray-600'>
              <Search className='absolute top-1/2 left-2 -translate-y-1/2' />
              <input
                placeholder='Search'
                className='p-2 border border-gray-300 w-full rounded-sm placeholder:pl-6'
              />
            </div>
            <div className='text-gray-500 flex items-center gap-4'>
              <SlidersHorizontal />
              <select className='border border-gray-300 rounded-full px-3'>
                <option>Risk level</option>
              </select>
            </div>

            {/* Ships */}
            <div>
              {ships?.ships.map((ship, index) => (
                <div
                  key={index}
                  className='py-4 border-y border-gray-300'
                >
                  <div className='flex items-center justify-between'>
                    <p className='text-gray-700 font-semibold'>
                      {ship.name}
                    </p>
                    <Ellipsis className='cursor-pointer' />
                  </div>
                  <div className='flex items-center gap-4'>
                    <Image src={shipImg} alt='' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
