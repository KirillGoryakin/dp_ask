import { clsx } from 'clsx';

import { Skeleton } from '@/components/skeleton';
import { SvgSpinner } from '@/components/icons';

import { Overlay, DialogBox } from './elements';

export function DialogLoading() {
  return (
    <Overlay>
      <DialogBox>
        <Skeleton className={clsx('mt-16', 'w-1/4', 'h-3', '!rounded')} />
        <Skeleton className={clsx('mt-2', 'w-full', 'h-10')} />
        <Skeleton className={clsx('mt-6', 'w-2/5', 'h-3', '!rounded')} />
        <Skeleton className={clsx('mt-2', 'w-full', 'h-10')} />
        <Skeleton className={clsx('mt-6', 'w-3/4', 'h-6')} />
        <Skeleton className={clsx('mt-3', 'w-2/4', 'h-6')} />
        <Skeleton className={clsx('mt-6', 'w-1/5', 'h-3', '!rounded')} />
        <Skeleton className={clsx('mt-2', 'w-full', 'h-10')} />
      </DialogBox>
    </Overlay>
  );
}

export function DialogSpinner() {
  return (
    <Overlay>
      <SvgSpinner
        className={clsx(
          'm-auto',
          'text-5xl',
          'text-amber-600',
          'animate-in',
          'ease-linear',
          'spin-in-[-360deg]',
          'duration-500',
          'repeat-infinite',
        )}
      />
    </Overlay>
  );
}
