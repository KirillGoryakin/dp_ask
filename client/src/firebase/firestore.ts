import { getFirestore as _getFirestore, type Firestore } from 'firebase/firestore/lite';

import { getFirebaseApp } from './app';
import { getFirebaseAuth } from './auth';

let firestore: Firestore | undefined;
export function getFirestore() {
  if (!firestore) {
    getFirebaseAuth();
    firestore = _getFirestore(getFirebaseApp());
  }
  return firestore;
}
