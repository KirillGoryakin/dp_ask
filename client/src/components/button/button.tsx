'use client';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

export type ButtonProps = React.HTMLAttributes<HTMLElement> & {
  disabled?: boolean;
  asChild?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};
export const Button = forwardRef(function Button(
  { className, children, asChild, type = 'button', ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <Slot
      className={clsx(
        'group/button',
        'relative',
        'inline-grid',
        'grid-flow-col',
        'gap-2',
        'items-center',
        'px-3',
        'h-10',
        'outline-none',
        'disabled:opacity-70',
        'transition-colors',
        'transition-shadow',
        '[&>svg]:justify-self-end',
        '[&>svg]:text-2xl',
        '[&>svg]:transition-transform',
        '[&:active>svg]:scale-95',
        'bg-white/25',
        'rounded-lg',
        'shadow-white/20',
        'shadow-inner',
        'focus-visible:shadow-white',
        '[&:not(:disabled):hover]:!bg-white/30',
        'duration-300',
        className,
      )}
      ref={ref}
      {...props}
    >
      {asChild ? children : <button type={type}>{children}</button>}
    </Slot>
  );
});
