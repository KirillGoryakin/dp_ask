'use client';

import { useState, useMemo } from 'react';

import { createContext } from '@/lib/react-utils';

type DialogsActions = {
  pushDialog: (node: React.ReactElement) => void;
  replaceDialog: (node: React.ReactElement) => void;
  closeDialog: () => void;
};
const [Provider, useDynamicDialogs] = createContext<DialogsActions>('DynamicDialogsContext');
export { useDynamicDialogs };

export function DynamicDialogsProvider({ children }: React.PropsWithChildren) {
  const [nodes, setNodes] = useState<React.ReactElement[]>([]);
  const methods = useMemo(
    () => ({
      pushDialog: (node: React.ReactElement) => {
        setNodes((nodes) => [node, ...nodes]);
      },
      replaceDialog: (node: React.ReactElement) => {
        setNodes([node]);
      },
      closeDialog: () => {
        setNodes([]);
      },
    }),
    [],
  );
  return (
    <Provider value={methods}>
      {children}
      {nodes}
    </Provider>
  );
}
