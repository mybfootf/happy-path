'use client';

import Image from 'next/image';
import { X, ArrowDownUp } from 'lucide-react';

import profileImg from '@/public/images/profile.png';
import { useNav } from '@/hooks/useNav';

type SelectRecipientProps = {
  setIsSelectRecipientOpen: (
    isSelectRecipientOpen: boolean
  ) => void;
  setIsGenerateReportOpen: (
    isGenerateReportOpen: boolean
  ) => void;
  setIsNotificationOpen: (
    isNotificationOpen: boolean
  ) => void;
};

export const SelectRecipient = ({
  setIsSelectRecipientOpen,
  setIsGenerateReportOpen,
  setIsNotificationOpen,
}: SelectRecipientProps) => {
  const { onCCenterClose } = useNav();

  const handleClose = () => {
    setIsSelectRecipientOpen(false);
  };

  // Close the modal and open the generate report modal
  const handleGoBack = () => {
    setIsSelectRecipientOpen(false);
    setIsGenerateReportOpen(true);
  };

  // Close the modal and open the notification dialog
  const handleSend = () => {
    setIsSelectRecipientOpen(false);
    setIsNotificationOpen(true);
    onCCenterClose();
  };

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg w-[600px] h-fit max-h-[500px] overflow-y-auto text-primaryDark space-y-4'>
      <div className='flex items-start justify-between gap-2'>
        <h3 className='text-2xl font-bold'>
          Select Recipient
        </h3>
        <button
          className='text-2xl'
          onClick={() => handleClose()}
        >
          <X />
        </button>
      </div>

      <div className='rounded-lg border border-gray-200 space-y-8'>
        <div className='flex items-center justify-between gap-2 color-gray2 bg-gray-100 rounded-t-lg p-4'>
          <div className='flex items-center gap-2 '>
            <p>Recipient</p>
            <ArrowDownUp className='w-4 h-4' />
          </div>
          <div className='w-1/4 text-start'>
            <p>Preview</p>
          </div>
        </div>

        <div>
          <ul className='px-4 space-y-4 pb-6'>
            <li className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-4'>
                <Image src={profileImg} alt='' />
                <div>
                  <p className='text-lg text-gray2 font-medium'>
                    John Doe
                  </p>
                  <p className=' text-gray3'>
                    johndoe@gmail.com
                  </p>
                </div>
              </div>
              <button className='text-red-500 text-base font-semibold'>
                Remove
              </button>
            </li>

            <li className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-4'>
                <Image src={profileImg} alt='' />
                <div>
                  <p className='text-lg text-gray2 font-medium'>
                    John Doe1
                  </p>
                  <p className=' text-gray3'>
                    johndoe1@gmail.com
                  </p>
                </div>
              </div>
              <button className='text-red-500 text-base font-semibold'>
                Remove
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <p className='text-base'>Optional Message</p>
        <input
          type='text'
          placeholder='Provide additional context if needed…'
          className='border border-gray-300 rounded-md py-2 px-4 w-full mt-2'
        />
      </div>

      <div className='flex justify-end gap-4'>
        <button
          className='border-[1px] text-sm text-gray3 border-gray-300 hover:bg-gray-100 py-2 px-8 rounded-md transition'
          onClick={handleGoBack}
        >
          Go Back
        </button>
        <button
          className='bg-blue-600 hover:bg-blue-600/90 text-sm text-white py-2 rounded-md font-bold px-8 transition'
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};
