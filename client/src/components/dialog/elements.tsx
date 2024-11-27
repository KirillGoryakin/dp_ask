import { forwardRef } from 'react';
import { clsx } from 'clsx';
import {
  type DialogOverlayProps,
  type DialogContentProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
} from '@radix-ui/react-dialog';

export type OverlayProps = Omit<DialogOverlayProps, 'forceMount' | 'asChild'>;
export const Overlay = forwardRef(function Overlay(
  { className, ...props }: OverlayProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      className={clsx(
        'fixed',
        'z-50',
        'inset-0',
        'flex',
        'bg-stone-200/60',
        'aria-hidden:hidden',
        'overflow-auto',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export type DialogBoxProps = Omit<DialogContentProps, 'forceMount' | 'asChild'>;
export const DialogBox = forwardRef(function DialogBox(
  { className, ...props }: DialogBoxProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      className={clsx(
        'mt-auto',
        'sm:m-auto',
        'relative',
        'w-full',
        'sm:max-w-[28rem]',
        'px-6',
        'pt-8',
        'pb-[calc(2rem+env(safe-area-inset-bottom))]',
        'sm:p-12',
        'bg-white',
        'rounded-t-md',
        'sm:rounded-b-md',
        'shadow-2xl',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export type TitleProps = Omit<DialogTitleProps, 'asChild'>;
export const Title = forwardRef(function Title(
  { className, ...props }: TitleProps,
  ref: React.Ref<HTMLHeadingElement>,
) {
  return (
    <h1
      className={clsx('mb-6', 'text-2xl', 'sm:text-3xl', 'font-bold', 'text-center', className)}
      ref={ref}
      {...props}
    />
  );
});

export type DescriptionProps = Omit<DialogDescriptionProps, 'asChild'>;
export const Description = forwardRef(function Title(
  { className, ...props }: DescriptionProps,
  ref: React.Ref<HTMLParagraphElement>,
) {
  return <p className={clsx('mb-6', 'last:mb-0', 'text-sm', className)} ref={ref} {...props} />;
});

export type DialogSectionProps = DialogBoxProps;
export function DialogSection({ className, ...props }: DialogSectionProps) {
  return (
    <div
      className={clsx(
        '-mx-6',
        'sm:-mx-12',
        'first:-mt-8',
        'sm:first:-mt-12',
        'px-6',
        'sm:px-12',
        'border-b',
        'border-stone-200',
        'last:border-none',
        className,
      )}
      {...props}
    />
  );
}
