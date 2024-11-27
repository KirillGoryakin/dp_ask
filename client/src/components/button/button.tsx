'use client';

import { forwardRef, useState, useRef } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

import { Tooltip } from '@/components/tooltip';

import { ButtonContextProvider, useButtonContext } from './button-context';

export type ButtonProps = React.HTMLAttributes<HTMLElement> & {
  primary?: boolean;
  neutral?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
};
export const Button = forwardRef(function Button(
  { className, children, primary: isPrimary, neutral: isNeutral, asChild, ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [isLabelVisible, setIsLabelVisible] = useState(true);
  const labelRef = useRef<HTMLSpanElement>(null);
  useResizeObserver(labelRef, ({ contentRect: { width } }) => setIsLabelVisible(width > 1));

  return (
    <ButtonContextProvider labelRef={labelRef}>
      <ButtonTooltip disabled={isLabelVisible}>
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
            'rounded',
            'outline-none',
            'border',
            'disabled:opacity-70',
            'focus-visible:ring',
            'focus-visible:ring-amber-500/50',
            'transition-colors',
            '[&>svg]:justify-self-end',
            '[&>svg]:text-2xl',
            '[&>svg]:transition-transform',
            '[&:active>svg]:scale-95',
            isPrimary
              ? [
                  'primary',
                  'border-amber-600',
                  'text-white',
                  'bg-amber-600',
                  '[&:not(:disabled):hover]:!bg-amber-700',
                  '[&:not(:disabled):hover]:border-amber-700',
                  'duration-300',
                ]
              : isNeutral
                ? [
                    'border-0',
                    'bg-amber-600/20',
                    '[&:not(:disabled):hover]:bg-amber-600/30',
                    'text-amber-600',
                  ]
                : [
                    'border-amber-600/60',
                    'text-amber-600',
                    'bg-transparent',
                    '[&:not(:disabled):hover]:bg-orange-50',
                  ],
            className,
          )}
          ref={ref}
          {...props}
        >
          {asChild ? children : <button type="button">{children}</button>}
        </Slot>
      </ButtonTooltip>
    </ButtonContextProvider>
  );
});

type ButtonTooltipProps = { children: React.ReactElement; disabled: boolean };
function ButtonTooltip({ children, disabled }: ButtonTooltipProps) {
  const { labelTextRef } = useButtonContext();
  return (
    <Tooltip content={labelTextRef.current} disabled={disabled} soft>
      {children}
    </Tooltip>
  );
}
