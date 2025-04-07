'use client';

import { usePathname } from 'next/navigation';

export default function usePath() {
  const pathname = usePathname();

  return pathname;
}
