'use client';

import { useRef, useMemo } from 'react';

import { createContext, useContext } from '@/lib/context';

type ButtonContextType = {
  labelRef: React.Ref<HTMLSpanElement>;
  labelTextRef: React.MutableRefObject<string>;
};
const ButtonContext = createContext<ButtonContextType>('ButtonContext');
export const useButtonContext = () => useContext(ButtonContext);

export type ButtonContentProvider = Pick<ButtonContextType, 'labelRef'> & {
  children: React.ReactNode;
};
export function ButtonContextProvider({ labelRef, children }: ButtonContentProvider) {
  const labelTextRef = useRef('');
  return (
    <ButtonContext.Provider
      value={useMemo(() => ({ labelRef, labelTextRef }), [labelRef, labelTextRef])}
    >
      {children}
    </ButtonContext.Provider>
  );
}
