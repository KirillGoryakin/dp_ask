'use client';

import { createContext as createContextNative, useContext as useContextNative } from 'react';

type ContextProviderProps<T> = { value: T; children: React.ReactNode };
type CreateContextReturn<T> = [
  Provider: React.ComponentType<ContextProviderProps<T>>,
  useContext: () => T,
];

export function createContext<T>(displayName: string): CreateContextReturn<T>;
export function createContext<T>(displayName: string, defaultValue: T): CreateContextReturn<T>;
export function createContext<T>(displayName: string, defaultValue?: T): CreateContextReturn<T> {
  const context =
    defaultValue !== undefined
      ? createContextNative<T | undefined>(defaultValue)
      : createContextNative<T | undefined>(undefined);
  context.displayName = displayName;

  const useContext = () => {
    const value = useContextNative(context);
    if (value === undefined) {
      throw new Error(
        `useContext must be inside a Provider with a value, missing provider for ${context.displayName}`,
      );
    }
    return value;
  };

  return [context.Provider as any, useContext];
}
