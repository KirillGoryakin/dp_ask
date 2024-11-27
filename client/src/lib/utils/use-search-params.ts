'use client';

import { usePathname, useRouter, useSearchParams as useSearchParamsNative } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface UseSearchParamsReturn {
  /**
   * The current changable URL search params.
   *
   * (Use `updateRoute()` to update the URL with changed `searchParams`)
   */
  searchParams: URLSearchParams;
  /**
   * Function to update the URL with the current `searchParams`.
   */
  updateRoute: () => void;
  /**
   * Sets a search parameter and updates the URL.
   *
   * @param name The name of the parameter.
   * @param value New value.
   * @param deleteIfEmpty If true, deletes the parameter if `value` is empty.
   */
  set: (name: string, value: string, deleteIfEmpty?: boolean) => void;
  /**
   * Deletes a search parameter and updates the URL.
   * @param name The name of the parameter.
   */
  delete: (name: string) => void;
}

/**
 * Hook for managing URL search parameters.
 */
export function useSearchParams(): UseSearchParamsReturn {
  const { push } = useRouter();
  const pathname = usePathname();
  const readonlySearchParams = useSearchParamsNative();
  const searchParams = useMemo(
    () => new URLSearchParams(readonlySearchParams?.toString()),
    [readonlySearchParams],
  );
  const updateRoute = useCallback(() => {
    push(pathname + '?' + searchParams.toString());
  }, [push, searchParams, pathname]);
  return useMemo(
    () => ({
      searchParams,
      updateRoute,
      set: (name, value, deleteIfEmpty) => {
        if (!value && deleteIfEmpty) {
          searchParams.delete(name);
        } else {
          searchParams.set(name, value);
        }
        updateRoute();
      },
      delete: (name) => {
        searchParams.delete(name);
        updateRoute();
      },
    }),
    [searchParams, updateRoute],
  );
}
