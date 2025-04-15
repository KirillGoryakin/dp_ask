'use client';

import { getFirebaseAuth } from '@/firebase';

export function signOut() {
  return getFirebaseAuth().signOut();
}
