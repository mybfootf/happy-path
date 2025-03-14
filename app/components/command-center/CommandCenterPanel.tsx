'use client';

import { useAuth } from '@/hooks/useNav';
import {
  ListChecks,
  ArrowLeftFromLine,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

import { useCallback } from 'react';
import { ShipItem } from './ShipItem';

export const CommandCenterPanel = ships => {
  const { isCCenterOpen, onCCenterClose, onCCenterOpen } =
    useAuth();

  const getReportTime = useCallback((msgTime: string) => {
    const currentTime = new Date();
    const reportTime = new Date(msgTime);
    const timeDifference = Math.abs(
      currentTime.getTime() - reportTime.getTime()
    );
    const minutesDifference = Math.floor(
      timeDifference / 60000
    );
    if (minutesDifference < 1) {
      return '1m';
    }
    if (minutesDifference > 59) {
      return `${Math.floor(minutesDifference / 60)}h`;
    }
    if (minutesDifference > 60 * 24 - 1) {
      return `${Math.floor(
        minutesDifference / (60 * 24)
      )}d`;
    }
    return `${minutesDifference}m`;
  }, []);

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
          <div className='text-gray-900 px-6 py-4 w-[400px] space-y-3 h-[calc(100vh-120px)] overflow-auto'>
            <div className='flex items-center justify-between gap-4'>
              <p className='text-2xl'>Command Center</p>
              <ArrowLeftFromLine
                className='cursor-pointer text-gray-400 '
                onClick={() => onCCenterClose()}
              />
            </div>
            <div className='relative text-gray-600'>
              <Search className='absolute top-1/2 left-2 -translate-y-1/2 text-gray-400' />
              <input
                placeholder='Search'
                className='p-2 border border-gray-300 w-full rounded-md pl-8'
              />
            </div>
            <div className='text-gray-500 flex items-center gap-4'>
              <SlidersHorizontal className='cursor-pointer' />
              <select className='border border-gray-300 rounded-full py-[2px] px-3 cursor-pointer'>
                <option>Risk level</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Ships */}
            <div>
              {ships?.ships.map(ship => (
                <ShipItem
                  key={ship.mmsi}
                  ship={ship}
                  getReportTime={getReportTime}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
