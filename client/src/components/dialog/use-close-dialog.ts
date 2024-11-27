'use client';

import { useRouter } from 'next/navigation';

import { useDynamicDialogs } from './dynamic-dialogs-context';

export type DialogMode = 'dynamic' | 'parallel' | 'standalone';
export type CloseDialogProps = { mode?: DialogMode; closeHref?: string; onClose?: () => void };

export function useCloseDialog({
  mode = 'dynamic',
  closeHref = '/',
  onClose,
}: CloseDialogProps = {}) {
  const { closeDialog } = useDynamicDialogs();
  const { back: routeBack, push: pushRoute } = useRouter();
  return () => {
    if (mode === 'dynamic') closeDialog();
    else if (mode === 'parallel') routeBack();
    else if (mode === 'standalone') pushRoute(closeHref, { scroll: false });
    onClose?.();
  };
}
