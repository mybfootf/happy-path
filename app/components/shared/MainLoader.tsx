'use client';

import Image from 'next/image';

import logoImg from '@/public/images/logo.svg';

export const MainLoader = () => {
  return (
    <div className='absolute inset-0 z-20 flex items-center justify-center bg-black'>
      <div>
        <Image
          src={logoImg}
          alt=''
          width={42}
          height={42}
          className='animate-spin'
        />
      </div>
    </div>
  );
};
