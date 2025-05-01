'use client';

import { PropsWithChildren } from 'react';

import { useUser } from '@/features/user';

export function AuthOnly({ children }: PropsWithChildren) {
  const { user } = useUser();
  if (user) {
    return children;
  }
  return null;
}
