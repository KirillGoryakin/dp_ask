import { clsx } from 'clsx';

import { SvgSpinner } from '@/components/icons';

export function ButtonLoading() {
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
