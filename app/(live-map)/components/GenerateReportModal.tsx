import Image from 'next/image';

import { X } from 'lucide-react';
import { ShipProps } from './Map';

import shipImg from '@/public/images/luna-major.svg';
import shipRouteImg from '@/public/images/ship-route.png';

type GenerateReportModalProps = {
  isGenerateReportOpen: boolean;
  setIsGenerateReportOpen: (
    isGenerateReportOpen: boolean
  ) => void;
  selectedShip: ShipProps | null;
  setIsSelectRecipientOpen: (
    isSelectRecipientOpen: boolean
  ) => void;
};

export const GenerateReportModal = ({
  setIsGenerateReportOpen,
  selectedShip,
  setIsSelectRecipientOpen,
}: GenerateReportModalProps) => {
  const handleClose = () => {
    setIsGenerateReportOpen(false);
  };

  const handleProceed = () => {
    setIsGenerateReportOpen(false);
    setIsSelectRecipientOpen(true);
  };

  return (
    <div className='absolute z-30 top-[90px] left-1/2 -translate-x-1/2 w-8/12 h-[calc(100vh-110px)] bg-white p-8 rounded-lg shadow-lg text-primaryDark space-y-4 overflow-y-auto'>
      <div className='flex items-start justify-between gap-2'>
        <h4 className='text-2xl font-bold'>
          Send/Export Report
        </h4>
        <button className='text-2xl' onClick={handleClose}>
          <X />
        </button>
      </div>

      <div className='rounded-lg border border-gray-200 p-8 space-y-8'>
        <div className='flex items-center justify-between gap-2 color-gray2'>
          <p className='text-lg font-semibold'>
            {`Incident Report: Transponder Tampering - ${selectedShip?.name}`}
          </p>
          <p className='text-lg'>
            {`${new Date().toLocaleDateString()}`}
          </p>
        </div>

        <div className='flex items-start justify-between gap-12'>
          <Image
            src={shipImg}
            alt=''
            width={250}
            height={250}
          />
          <div className='px-4 space-y-8'>
            <p className='text-gray2 text-base font-medium'>
              Luna Major is a Panama-flagged oil tanker that
              has been in service for 12 years, previously
              known as Ocean Trader. It is currently
              sanctioned by OFAC for engaging in illegal
              trade within restricted zones.
            </p>

            <ul className='text-gray3 grid grid-cols-2 w-fit font-medium'>
              <li className='inline-flex items-center gap-1 mr-3 p-0'>
                {' '}
                <span className='text-xl'>
                  &#x2022;
                </span>{' '}
                <span className='font-bold'>Flag:</span>{' '}
                Panama
              </li>
              <li className='inline-flex items-center gap-1 mr-3 p-0'>
                {' '}
                <span className='text-xl'>
                  &#x2022;
                </span>{' '}
                <span className='font-bold'>IMO:</span>{' '}
                9876543
              </li>
              <li className='inline-flex items-center gap-1 mr-3'>
                <span className='text-xl'>&#x2022;</span>{' '}
                <span className='font-bold'>MMSI:</span>{' '}
                {selectedShip?.mmsi}
              </li>
              <li className='inline-flex items-center gap-1 mr-3 p-0'>
                {' '}
                <span className='text-xl'>
                  &#x2022;
                </span>{' '}
                <span className='font-bold'>
                  Call Sign:
                </span>{' '}
                {selectedShip?.callSign}
              </li>
              <li className='inline-flex items-center gap-1 mr-3 p-0'>
                {' '}
                <span className='text-xl'>
                  &#x2022;
                </span>{' '}
                <span className='font-bold'>Length:</span>{' '}
                {selectedShip?.shipLength} meters
              </li>
              <li className='inline-flex items-center gap-1 mr-3 p-0'>
                {' '}
                <span className='text-xl'>
                  &#x2022;
                </span>{' '}
                <span className='font-bold'>Width:</span>{' '}
                {selectedShip?.shipWidth} meters
              </li>
              <li className='inline-flex items-center gap-1 mr-3 p-0'>
                {' '}
                <span className='text-xl'>
                  &#x2022;
                </span>{' '}
                <span className='font-bold'>
                  Sanction Status:
                </span>{' '}
                Sanctioned by OFAC
              </li>
            </ul>
          </div>
        </div>

        <div className='w-full h-[300px] relative'>
          <Image src={shipRouteImg} alt='' fill />
        </div>

        <div>
          <ul className='list-disc list-inside text-gray3 font-medium'>
            <li>Observed Activity:</li>
            <li>
              The AIS system of the Hormuz was observed
              tampering with its transponder data.
            </li>
            <li>
              The reported path deviated significantly from
              the actual path.
            </li>
          </ul>
          <ul className='list-disc list-inside text-gray3 font-medium'>
            <li>Observed Activity:</li>
            <li>
              The AIS system of the Hormuz was observed
              tampering with its transponder data.
            </li>
            <li>
              The reported path deviated significantly from
              the actual path.
            </li>
            <li>Tampering Behavior:</li>
            <li>
              Reported Path: A straight-line route from Port
              A to Port B.
            </li>
            <li>
              Actual Path: Evidence suggests a diversion
              into unauthorized waters, possibly for an
              illicit ship-to-ship transfer.
            </li>
            <li>Details:</li>
            <li>Date: January 11, 2025</li>
            <li>Time: 15:42 UTC</li>
            <li>Coordinates: 25.2048° N, 55.2708° E</li>
          </ul>
        </div>
      </div>

      <div className='flex justify-end'>
        <button
          className='bg-blue-600 hover:bg-blue-600/90 text-sm text-white py-2 rounded-md font-bold px-8 transition'
          onClick={handleProceed}
        >
          Proceed to Send Report
        </button>
      </div>
    </div>
  );
};
