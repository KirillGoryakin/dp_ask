'use client';

import * as RadixSlider from '@radix-ui/react-slider';
import clsx from 'clsx';

export type SliderProps = RadixSlider.SliderProps;

export function Slider({ className, ...props }: SliderProps) {
  return (
    <RadixSlider.Root
      className={clsx(
        'relative',
        'flex',
        'h-5',
        'w-max',
        'grow',
        'touch-none',
        'select-none',
        'items-center',
        className,
      )}
      {...props}
    >
      <RadixSlider.Track
        className={clsx(
          'relative',
          'h-1',
          'grow',
          'rounded-full',
          'bg-black/5',
          'shadow-black/50',
          'shadow-inner',
        )}
      >
        <RadixSlider.Range className={clsx('absolute', 'h-full', 'rounded-full', 'bg-zinc-200')} />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className={clsx(
          'block',
          'size-5',
          'rounded-xl',
          'bg-zinc-200',
          'transition-colors',
          'transition-shadow',
          'shadow',
          'shadow-black',
          'hover:shadow-[0_0_0_1px]',
          'focus:shadow-[0_0_0_3px]',
          'focus:outline-none',
          'cursor-grab',
        )}
      />
    </RadixSlider.Root>
  );
}
