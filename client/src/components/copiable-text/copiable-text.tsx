'use client';

import clsx from 'clsx';
import { MdContentCopy } from 'react-icons/md';

import { Button } from '../button';

export type CopiableTextProps = {
  className?: string;
  children: string;
};

export function CopiableText({ className, children }: CopiableTextProps) {
  return (
    <div
      className={clsx(
        'relative',
        'w-full',
        'py-2',
        'px-4',
        'rounded-lg',
        'bg-black/5',
        'backdrop-blur-sm',
        'shadow-black/50',
        'shadow-inner',
        className,
      )}
    >
      <div className={clsx('absolute', 'top-2', 'right-2', 'z-10')}>
        <Button
          className={clsx('!bg-white/40', '[&:not(:disabled):hover]:!bg-white/60')}
          onClick={() => navigator.clipboard.writeText(children)}
        >
          <MdContentCopy />
        </Button>
      </div>
      <div className={clsx('max-w-full', 'text-lg', 'break-all')}>{children}</div>
    </div>
  );
}
