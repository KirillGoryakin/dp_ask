'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { clsx } from 'clsx';

import { IconButton } from '@/components/icon-button';
import { SvgRemove } from '@/components/icons';

import { type CloseDialogProps, useCloseDialog } from './use-close-dialog';
import { Overlay, DialogBox, Title, Description, DialogSection } from './elements';

export type DialogBaseProps = CloseDialogProps;

export type DialogProps = React.PropsWithChildren<DialogBaseProps>;
export function Dialog({ children, ...props }: DialogProps) {
  const close = useCloseDialog(props);
  return (
    <RadixDialog.Root open={true} onOpenChange={close}>
      <RadixDialog.Overlay asChild>
        <Overlay>
          <RadixDialog.Content asChild>
            <DialogBox>
              {children}
              <RadixDialog.Close
                className={clsx('absolute', 'top-4', 'right-4', 'text-4xl')}
                asChild
              >
                <IconButton label="Закрыть окно" tooltip={false}>
                  <SvgRemove />
                </IconButton>
              </RadixDialog.Close>
            </DialogBox>
          </RadixDialog.Content>
        </Overlay>
      </RadixDialog.Overlay>
    </RadixDialog.Root>
  );
}

export type DialogTitleProps = Omit<RadixDialog.DialogTitleProps, 'asChild'>;
export function DialogTitle({ children, ...props }: DialogTitleProps) {
  return (
    <RadixDialog.Title {...props} asChild>
      <Title>{children}</Title>
    </RadixDialog.Title>
  );
}

export type DialogDescriptionProps = Omit<RadixDialog.DialogDescriptionProps, 'asChild'>;
export function DialogDescription({ children, ...props }: DialogDescriptionProps) {
  return (
    <RadixDialog.Description {...props} asChild>
      <Description>{children}</Description>
    </RadixDialog.Description>
  );
}

export { DialogSection };
