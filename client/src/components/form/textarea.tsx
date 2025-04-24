import clsx from 'clsx';
import { ComponentProps } from 'react';

export type TextareaProps = ComponentProps<'textarea'>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
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
    />
  );
}
