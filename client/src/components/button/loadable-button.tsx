'use client';

import { forwardRef, useState } from 'react';
import { clsx } from 'clsx';

import { Button, ButtonProps } from './button';
import { Spinner } from '../spinner';

export type LoadableButtonProps = ButtonProps & {
  loading?: boolean;
};
export const LoadableButton = forwardRef(function LoadableButton(
  { children, loading, ...props }: LoadableButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [isClickLoading, setIsClickLoading] = useState(false);
  const isLoading = loading || isClickLoading;
  const { onClick } = props;
  if (onClick) {
    props.onClick = async (e) => {
      if (isLoading) return;
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
    <Button {...props} ref={ref}>
      <div className={clsx('transition-opacity', isLoading ? 'opacity-0' : 'opacity-100')}>
        {children}
      </div>
      {isLoading && (
        <div
          className={clsx(
            'absolute',
            'top-0',
            'left-0',
            'w-full',
            'h-full',
            'flex',
            'items-center',
            'justify-center',
            'animate-in',
            'fade-in',
          )}
        >
          <Spinner className={clsx('size-8')} />
        </div>
      )}
    </Button>
  );
});
