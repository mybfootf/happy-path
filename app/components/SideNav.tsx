'use client';

import { useState } from 'react';

import {
  Ship,
  ChartNetwork,
  SearchCheck,
} from 'lucide-react';
import { useNav } from '@/hooks/useNav';

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
      <ul className='flex flex-col gap-3 py-6'>
        <li
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
        </li>
        <li
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
        </li>
        <li
          className={`${
            active == 'dive'
              ? 'bg-white text-primaryDark hover:none'
              : 'text-white bg-none hover:bg-gray1'
          } py-3 px-4 rounded-md cursor-pointer flex items-center gap-2 relative`}
          onClick={() => setActive('dive')}
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
        </li>
      </ul>
    </nav>
  );
}
