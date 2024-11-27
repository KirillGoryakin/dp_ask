import { useContext as useContextNative } from 'react';

export function useContext<T>(context: React.Context<T | undefined>): T {
  const contextValue = useContextNative(context);
  if (contextValue === undefined) {
    throw new Error(
      `useContext must be inside a Provider with a value${
        context.displayName && `, missing provider for ${context.displayName}`
      }`,
    );
  }
  return contextValue;
}
