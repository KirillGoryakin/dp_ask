import clsx from 'clsx';
import { ComponentProps } from 'react';

export type InputProps = ComponentProps<'input'>;

export function Input({ className, ...props }: InputProps) {
  return (
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
        className,
      )}
      onBlur={(e) => {
        if (props.type === 'number') {
          if (typeof props.min === 'number' && +e.target.value < props.min) {
            e.target.value = props.min.toString();
          }
          if (typeof props.max === 'number' && +e.target.value > props.max) {
            e.target.value = props.max.toString();
          }
        }
        props.onBlur?.(e);
      }}
    />
  );
}
