'use client';

import { ListChecks } from 'lucide-react';

export const CommandCenterPanel = () => {
  return (
    <div>
      <div className='absolute top-[100px] left-[100px] z-40 flex justify-between items-center px-6 py-4 bg-white rounded-md shadow-xl'>
        <ListChecks className='text-gray-900' />
      </div>
    </div>
  );
};
