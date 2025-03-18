import Image from 'next/image';
import {
  Ellipsis,
  Gauge,
  LocateFixed,
  SatelliteDish,
} from 'lucide-react';

import shipImg from '@/public/images/ship_red.png';
import { RiskBar } from '../shared/RiskBar';
import { TripSummary } from '../shared/TripSummary';

interface ShipProps {
  ship: {
    name: string;
    risk: string;
    courseOverGround: number;
    speedOverGround: number;
    msgtime: string;
    routeProgress?: number;
    destination: string;
    eta: string;
  };
  getReportTime: (msgTime: string) => string;
}

export const ShipItem: React.FC<ShipProps> = ({
  ship,
  getReportTime,
}) => {
  return (
    <div className='py-4 border-y border-gray-300 space-y-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <div
            className={`w-3 h-3 rounded-full ${
              ship.risk == 'low'
                ? 'bg-green-500'
                : ship.risk == 'medium'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
          ></div>
          <p className='text-lg font-semibold capitalize text-black'>
            {ship.name.toLowerCase()}
          </p>
        </div>
        <Ellipsis className='cursor-pointer' />
      </div>

      {ship.risk == 'high' && <RiskBar risk={ship.risk} />}

      <div className='flex items-center gap-4'>
        <Image src={shipImg} alt='' />
      </div>

      <div className='flex items-center gap-4 text-gray-500 text-sm'>
        <div className='flex items-center gap-1 p-0'>
          <LocateFixed />
          <div className='flex items-center'>
            <span className='font-bold'>
              {ship.courseOverGround}
            </span>
            <span>°</span>
          </div>
        </div>
        <div className='flex items-center gap-1 p-0'>
          <Gauge />
          <div className='flex items-center'>
            <span className='font-bold'>
              {ship.speedOverGround}
            </span>
            &nbsp;
            <span>knots</span>
          </div>
        </div>
        <div className='flex items-center gap-1 p-0'>
          <SatelliteDish />
          <div className='flex items-center'>
            <span className='font-bold'>
              {getReportTime(ship.msgtime)}
            </span>
            &nbsp;
            <span>ago</span>
          </div>
        </div>
      </div>

      {ship && (
        <TripSummary ship={ship}>
          <div className='flex items-center justify-between gap-4 mt-4'>
            <input
              type='range'
              min={0}
              max={100}
              className='w-full'
              value={ship?.routeProgress || 40}
              readOnly
            />
            <p className='text-gray-500 text-sm text-center'>
              {ship?.routeProgress || 40}%
            </p>
          </div>
        </TripSummary>
      )}
      <div className='flex justify-end'>
        <button className='text-white font-semibold bg-blue-500 rounded-md px-10 py-3'>
          View Details
        </button>
      </div>
    </div>
  );
};
