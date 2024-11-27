import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

import { Tooltip } from '@/components/tooltip';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
  label: string;
  tooltip?: boolean;
  asChild?: boolean;
};
export const IconButton = forwardRef(function IconButton(
  { className, label, tooltip = true, asChild, children, ...props }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <Tooltip content={label} disabled={!tooltip} soft>
      <Slot
        className={clsx('transition-opacity', 'opacity-60', 'enabled:hover:opacity-100', className)}
        aria-label={label}
        ref={ref}
        {...props}
      >
        {asChild ? children : <button type="button">{children}</button>}
      </Slot>
    </Tooltip>
  );
});
