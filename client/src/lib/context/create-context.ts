import { createContext as createContextNative } from 'react';

export function createContext<T>(displayName: string): React.Context<T | undefined>;
export function createContext<T>(displayName: string, defaultValue: T): React.Context<T>;
export function createContext<T>(displayName: string, defaultValue?: T) {
  const context =
    defaultValue !== undefined
      ? createContextNative<T>(defaultValue)
      : createContextNative<T | undefined>(undefined);
  context.displayName = displayName;
  return context;
}
