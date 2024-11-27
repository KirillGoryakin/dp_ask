'use client';

import { Suspense } from 'react';

import { useIsSSR } from './ssr-context';

export function withClientSuspense<T extends object>(
  Component: React.ComponentType<T>,
  Fallback?: React.ComponentType,
) {
  const ComponentWithFallback = (props: T) => {
    const fallback = Fallback ? <Fallback /> : null;
    if (useIsSSR()) return fallback;
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };

  const displayName = Component.displayName || Component.name;
  ComponentWithFallback.displayName = `withClientSuspense(${displayName})`;

  return ComponentWithFallback;
}
