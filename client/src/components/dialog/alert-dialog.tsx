'use client';

import * as RadixDialog from '@radix-ui/react-alert-dialog';

import { useCloseDialog } from './use-close-dialog';
import { Overlay, DialogBox, Title, Description } from './elements';

export type AlertDialogProps = { children: React.ReactNode };
export function AlertDialog({ children }: AlertDialogProps) {
  const close = useCloseDialog();
  return (
    <RadixDialog.Root open={true} onOpenChange={close}>
      <RadixDialog.Overlay asChild>
        <Overlay>
          <RadixDialog.Content asChild>
            <DialogBox>{children}</DialogBox>
          </RadixDialog.Content>
        </Overlay>
      </RadixDialog.Overlay>
    </RadixDialog.Root>
  );
}

export type AlertDialogTitleProps = Omit<RadixDialog.AlertDialogTitleProps, 'asChild'>;
export function AlertDialogTitle({ children, ...props }: AlertDialogTitleProps) {
  return (
    <RadixDialog.Title {...props} asChild>
      <Title>{children}</Title>
    </RadixDialog.Title>
  );
}

export type AlertDialogDescriptionProps = Omit<RadixDialog.AlertDialogDescriptionProps, 'asChild'>;
export function AlertDialogDescription({ children, ...props }: AlertDialogDescriptionProps) {
  return (
    <RadixDialog.Description {...props} asChild>
      <Description>{children}</Description>
    </RadixDialog.Description>
  );
}

export {
  Cancel as AlertDialogCancel,
  Action as AlertDialogAction,
} from '@radix-ui/react-alert-dialog';
