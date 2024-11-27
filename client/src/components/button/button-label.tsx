'use client';

import { useRef, useLayoutEffect } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import { clsx } from 'clsx';

import { useButtonContext } from './button-context';

export type ButtonLabelProps = { className?: string; children: React.ReactNode };
export function ButtonLabel({ className, children }: ButtonLabelProps) {
  const { labelRef, labelTextRef } = useButtonContext();
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const { current: element } = ref;
    if (element) labelTextRef.current = element.textContent || '';
  }, [labelTextRef, children]);

  return (
    <span
      className={clsx(
        'justify-self-stretch',
        'text-left',
        'text-sm',
        'font-semibold',
        'whitespace-pre',
        'transition-transform',
        'group-active/button:scale-95',
        className,
      )}
      ref={useMergedRef(ref, labelRef)}
    >
      {children}
    </span>
  );
}
