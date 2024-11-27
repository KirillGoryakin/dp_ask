'use client';

import { useRef, useCallback } from 'react';
import { useEvent } from 'react-use';

const modifierClassName = 'pointer-events-none';

export function NoHoverOnScroll() {
  const timeoutRef = useRef<number>();
  const handleScroll = useCallback(() => {
    const { classList } = document.body;
    if (!classList.contains(modifierClassName)) {
      classList.add(modifierClassName);
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      classList.remove(modifierClassName);
    }, 50);
  }, []);
  useEvent('scroll', handleScroll);

  return null;
}
