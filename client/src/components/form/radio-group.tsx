'use client';

import clsx from 'clsx';
import * as RadixRadio from '@radix-ui/react-radio-group';

export type RadioGroupProps = RadixRadio.RadioGroupProps;

export function RadioGroup({ children, ...props }: RadioGroupProps) {
  return <RadixRadio.Root {...props}>{children}</RadixRadio.Root>;
}

export type RadioItemProps = Omit<RadixRadio.RadioGroupItemProps, 'asChild'> & {
  label?: string;
};

export function RadioItem({ className, label, ...props }: RadioItemProps) {
  const text = label ?? props.value;
  return (
    <RadixRadio.Item {...props} asChild>
      <label
        className={clsx(
          'flex',
          'items-center',
          'w-full',
          'h-10',
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
        <div
          className={clsx(
            'flex',
            'justify-center',
            'items-center',
            'w-4',
            'h-4',
            'rounded-full',
            'border-2',
            'border-white',
          )}
        >
          <RadixRadio.Indicator
            className={clsx(
              'block',
              'bg-white',
              'rounded-full',
              'w-2',
              'h-2',
              'transition-opacity',
              'opacity-0',
              'data-[state=checked]:opacity-100',
            )}
          />
        </div>
        {text && <span className={clsx('ml-2')}>{text}</span>}
      </label>
    </RadixRadio.Item>
  );
}
