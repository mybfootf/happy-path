'use client';

import { useState } from 'react';

import {
  Ship,
  ChartNetwork,
  SearchCheck,
} from 'lucide-react';
import { useNav } from '@/hooks/useNav';
import Link from 'next/link';

export default function SideNav() {
  const [active, setActive] = useState('fleet');

  const {
    isSideNavExpanded,
    onSideNavExpand,
    onSideNavCollapse,
  } = useNav();

  return (
    <nav
      className={`absolute left:0 top-[72px] z-50 bg-primaryDark text-white px-4 h-screen ${
        isSideNavExpanded ? 'w-[260px]' : 'w-[90px]'
      } transition-all duration-300`}
      onMouseOver={() => onSideNavExpand()}
      onMouseOut={() => onSideNavCollapse()}
    >
      <div className='flex flex-col gap-3 py-6'>
        <Link
          href='/'
          className={`${
            active == 'fleet'
              ? 'bg-white text-primaryDark hover:none'
              : 'text-white bg-none hover:bg-gray1'
          } py-3 px-4 rounded-md cursor-pointer flex items-center gap-2 relative`}
          onClick={() => setActive('fleet')}
        >
          <Ship />
          <p
            className={`${
              isSideNavExpanded
                ? 'visible w-full'
                : 'hidden w-0'
            } absolute left-12 whitespace-nowrap`}
          >
            Fleet Tracking
          </p>
        </Link>
        <Link
          href='/thread-assessment'
          className={`${
            active == 'threat'
              ? 'bg-white text-primaryDark hover:none'
              : 'text-white bg-none hover:bg-gray1'
          } py-3 px-4 rounded-md cursor-pointer flex items-center gap-2 relative`}
          onClick={() => setActive('threat')}
        >
          <ChartNetwork />
          <p
            className={`${
              isSideNavExpanded
                ? 'visible w-full'
                : 'hidden w-0'
            } absolute left-12 whitespace-nowrap`}
          >
            Thread Assessment
          </p>
        </Link>

        <Link
          href='/entity'
          className={`${
            active == 'entity'
              ? 'bg-white text-primaryDark hover:none'
              : 'text-white bg-none hover:bg-gray1'
          } py-3 px-4 rounded-md cursor-pointer flex items-center gap-2 relative`}
          onClick={() => setActive('entity')}
        >
          <SearchCheck />
          <p
            className={`${
              isSideNavExpanded
                ? 'visible w-full'
                : 'hidden w-0'
            } absolute left-12 whitespace-nowrap`}
          >
            Entity Deep Dive
          </p>
        </Link>
      </div>
    </nav>
  );
}
