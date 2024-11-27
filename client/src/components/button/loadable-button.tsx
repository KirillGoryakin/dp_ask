'use client';

import { forwardRef, useState } from 'react';
import { clsx } from 'clsx';

import { SvgSpinner } from '@/components/icons';

import { Button } from './button';

export type LoadableButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  loading?: boolean;
  children: React.ReactNode;
};
export const LoadableButton = forwardRef(function LoadableButton(
  { children, loading, type = 'button', ...props }: LoadableButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [isClickLoading, setIsClickLoading] = useState(false);
  const isLoading = loading || isClickLoading;
  const { onClick } = props;
  if (onClick) {
    props.onClick = async (e) => {
      if (isClickLoading) return;
      const result = onClick(e) as void | Promise<void>;
      if (typeof result?.then === 'function') {
        setIsClickLoading(true);
        try {
          await result;
        } finally {
          setIsClickLoading(false);
        }
      }
    };
  }

  return (
    <Button {...props} ref={ref} asChild>
      <button type={type}>
        {children}
        {isLoading && <ButtonLoading />}
      </button>
    </Button>
  );
});

function ButtonLoading() {
  return (
    <span
      className={clsx(
        'absolute',
        'z-10',
        'top-0',
        'left-0',
        '!m-0',
        'flex',
        'justify-center',
        'items-center',
        'w-full',
        'h-full',
        'bg-white',
        'group-[.primary]/button:bg-amber-600',
      )}
    >
      <SvgSpinner
        className={clsx(
          'text-2xl',
          'animate-in',
          'ease-linear',
          'spin-in-[-360deg]',
          'duration-500',
          'repeat-infinite',
        )}
      />
    </span>
  );
}
