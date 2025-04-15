import * as RadixForm from '@radix-ui/react-form';
import clsx from 'clsx';
import { ComponentProps } from 'react';

export type InputProps = ComponentProps<'input'>;

export function Input(props: InputProps) {
  return (
    <RadixForm.Control asChild>
      <input
        {...props}
        className={clsx(
          'w-full',
          'py-2',
          'px-4',
          '!border-0',
          'border-transparent',
          'rounded-lg',
          'bg-black/5',
          'backdrop-blur-sm',
          'transition-shadow',
          'shadow-black/50',
          'shadow-inner',
          'outline-none',
          'focus-visible:shadow-white/50',
          props.className,
        )}
      />
    </RadixForm.Control>
  );
}
