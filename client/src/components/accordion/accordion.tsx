import * as RadixAccordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { IoIosArrowDown } from 'react-icons/io';

export type AccordionProps =
  | RadixAccordion.AccordionSingleProps
  | RadixAccordion.AccordionMultipleProps;

export function Accordion(props: AccordionProps) {
  return <RadixAccordion.Root {...props} />;
}

export type AccordionItemProps = RadixAccordion.AccordionItemProps & {
  header: string;
  headerClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
};

export function AccordionItem({
  header,
  headerClassName,
  contentClassName,
  children,
  ...props
}: AccordionItemProps) {
  return (
    <RadixAccordion.Item {...props}>
      <RadixAccordion.Header>
        <RadixAccordion.Trigger asChild>
          <div
            className={clsx(
              'flex',
              'items-center',
              'justify-between',
              'py-2',
              'px-6',
              'h-[4.5rem]',
              'rounded-2xl',
              'cursor-pointer',
              'select-none',
              'transition-colors',
              'hover:bg-white/30',
              '[&>svg]:data-[state=open]:rotate-180',
              'data-[state=open]:rounded-b-none',
              'data-[state=open]:backdrop-blur-sm',
              headerClassName,
            )}
          >
            <div className={clsx('flex-1', 'text-lg', 'pr-6', 'line-clamp-2')}>{header}</div>
            <IoIosArrowDown className={clsx('text-xl', 'transition-transform', 'shrink-0')} />
          </div>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content asChild>
        <div
          className={clsx(
            'rounded-b-2xl',
            'py-2',
            'px-4',
            'border-transparent',
            'bg-black/5',
            'backdrop-blur-sm',
            'shadow-black/50',
            'shadow-inner',
            contentClassName,
          )}
        >
          {children}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}
