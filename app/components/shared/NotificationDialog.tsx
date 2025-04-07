import Image from 'next/image';

import { X } from 'lucide-react';

type NotificationDialogProps = {
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  callback: () => void;
  title: string;
  message: string;
  btnText: string;
  btnClN: string | undefined | null | '';
};

export const NotificationDialog = ({
  setIsOpen,
  callback,
  title,
  message,
  btnText,
  btnClN = 'bg-blue-600 hover:bg-blue-600/80 text-white',
}: NotificationDialogProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleProceed = () => {
    setIsOpen(false);
    callback();
  };

  return (
    <div className='absolute z-30 top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[350px] bg-white p-8 rounded-lg shadow-lg text-primaryDark space-y-4 overflow-y-auto'>
      <div className='flex items-start justify-between gap-2'>
        <h4 className='font-bold text-lg'>{title}</h4>
        <button className='text-2xl' onClick={handleClose}>
          <X />
        </button>
      </div>
      <div>
        <p className='text-gray3 text-sm font-normal'>
          {message}
        </p>
      </div>

      <div className='flex justify-end'>
        <button
          className={`text-sm py-2 rounded-md font-bold px-8 transition ${btnClN}`}
          onClick={handleProceed}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};
