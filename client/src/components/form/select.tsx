import * as RadixSelect from '@radix-ui/react-select';
import clsx from 'clsx';
import { IoIosArrowDown } from 'react-icons/io';

export type SelectProps = RadixSelect.SelectProps & {
  className?: string;
  placeholder?: string;
};

export function Select({ className, placeholder, children, ...props }: SelectProps) {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger asChild>
        <div
          className={clsx(
            'flex',
            'justify-between',
            'items-center',
            'px-3',
            'h-10',
            'transition-colors',
            'bg-white/25',
            'rounded-lg',
            'shadow-white/20',
            'shadow-inner',
            'focus-visible:shadow-white',
            'focus-visible:ring-0',
            '[&:not(:disabled):hover]:!bg-white/30',
            'duration-300',
            'cursor-pointer',
            className,
          )}
        >
          <div className={clsx('flex-1', 'line-clamp-1')}>
            <RadixSelect.Value placeholder={placeholder} />
          </div>
          <RadixSelect.Icon asChild className={clsx('text-lg', 'shrink-0')}>
            <IoIosArrowDown />
          </RadixSelect.Icon>
        </div>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className={clsx(
            'max-w-[48rem]',
            'bg-black/35',
            'rounded-xl',
            'backdrop-blur-lg',
            'shadow-white/20',
            'shadow-inner',
            'animate-in',
            'fade-in',
          )}
        >
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
          <RadixSelect.Arrow />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

export type SelectItemProps = { value: string; label?: string };

export function SelectItem({ value, label }: SelectItemProps) {
  return (
    <RadixSelect.Item
      value={value}
      className={clsx(
        'py-3',
        'px-3',
        'cursor-pointer',
        'rounded-xl',
        'transition-colors',
        'hover:bg-white/30',
        'outline-0',
      )}
    >
      <RadixSelect.ItemText>{label || value}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
}
