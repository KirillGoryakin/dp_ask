'use client';

import { useState, useEffect } from 'react';

import { createContext } from '@/lib/react-utils';

const [Provider, useIsSSR] = createContext<boolean>('SSRContext');
export { useIsSSR };

export function SSRProvider({ children }: React.PropsWithChildren) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => setIsSSR(false), []);

  return <Provider value={isSSR}>{children}</Provider>;
}
