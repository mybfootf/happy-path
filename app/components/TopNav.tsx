import Image from 'next/image';
import { Bell, ChevronDown } from 'lucide-react';

export default function TopNav() {
  return (
    <nav className='fixed top-0 z-50 bg-primaryDark text-white h-[72px] w-screen flex justify-between items-center px-8'>
      <div className='flex items-center gap-2'>
        <Image
          src='/images/logo.svg'
          alt='Compass Logo.'
          width={24}
          height={24}
          className='cursor-pointer fill-white'
        />
        <p className='text-2xl font-semibold'>COMPASS</p>
      </div>
      <div className='flex items-center gap-4'>
        <Bell />
        <div className='flex items-center gap-2'>
          <Image
            src='/images/profile.png'
            alt='Profile avatar.'
            width={32}
            height={32}
            className='rounded-full'
          />
          <p>John Doe</p>
          <ChevronDown className='text-gray1' />
        </div>
      </div>
    </nav>
  );
}
