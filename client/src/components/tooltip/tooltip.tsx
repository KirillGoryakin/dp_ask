'use client';

import { useState } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';

function TooltipContent({ children }: React.PropsWithChildren) {
  return (
    <RadixTooltip.Portal forceMount>
      <RadixTooltip.Content
        className={clsx(
          'relative',
          'z-50',
          'px-2',
          'py-1',
          'rounded',
          'bg-stone-700',
          'text-white',
          'text-sm',
          'select-none',
        )}
        sideOffset={4}
        collisionPadding={4}
      >
        <RadixTooltip.Arrow className={clsx('fill-stone-700')} />
        {children}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  );
}

export type TooltipProps = {
  children: React.ReactElement;
  content: React.ReactNode;
  disabled?: boolean;
  soft?: boolean;
};
export function Tooltip({ content, children, disabled: isDisabled, soft: isSoft }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerProps: RadixTooltip.TooltipTriggerProps = {};
  if (isSoft) triggerProps['aria-describedby'] = undefined;

  return (
    <RadixTooltip.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(!isDisabled && isOpen)}>
      <RadixTooltip.Trigger {...triggerProps} asChild>
        {children}
      </RadixTooltip.Trigger>

      {isOpen && <TooltipContent key="tooltip">{content}</TooltipContent>}
    </RadixTooltip.Root>
  );
}

export const { Provider: TooltipProvider } = RadixTooltip;
