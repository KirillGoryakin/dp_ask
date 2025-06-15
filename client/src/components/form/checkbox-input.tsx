'use client';

import clsx from 'clsx';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

export type CheckboxInputProps = Omit<RadixCheckbox.CheckboxProps, 'asChild'> & { label?: string };

export function CheckboxInput({ className, label, ...props }: CheckboxInputProps) {
  const text = label ?? props.value;
  return (
    <RadixCheckbox.Root {...props} asChild>
      <label
        className={clsx(
          'flex',
          'items-center',
          'w-full',
          'min-h-10',
          'py-2',
          'px-4',
          'rounded-lg',
          'bg-black/5',
          'data-[state=unchecked]:backdrop-blur-sm',
          'transition-shadow',
          'shadow-black/50',
          'shadow-inner',
          'focus-visible:shadow-white/50',
          'cursor-pointer',
          className,
        )}
      >
        <div className={clsx('relative', 'w-4', 'h-4')}>
          <MdCheckBoxOutlineBlank
            className={clsx(
              'text-xl',
              'absolute',
              'top-1/2',
              'left-1/2',
              '-translate-x-1/2',
              '-translate-y-1/2',
            )}
          />
          <RadixCheckbox.Indicator asChild>
            <MdCheckBox
              className={clsx(
                'text-xl',
                'absolute',
                'top-1/2',
                'left-1/2',
                '-translate-x-1/2',
                '-translate-y-1/2',
                'transition-opacity',
                'opacity-0',
                'data-[state=checked]:opacity-100',
              )}
            />
          </RadixCheckbox.Indicator>
        </div>
        {text && <span className={clsx('ml-2', 'flex-1')}>{text}</span>}
      </label>
    </RadixCheckbox.Root>
  );
}
