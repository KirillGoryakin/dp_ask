'use client';

import { useEffect } from 'react';

export function DynamicViewportHeight() {
  useEffect(() => {
    if (!CSS.supports('height: 100dvh')) {
      const handler = () => {
        document.documentElement.style.setProperty('--100dvh', `${window.innerHeight}px`);
      };
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    }
  }, []);
  return null;
}
