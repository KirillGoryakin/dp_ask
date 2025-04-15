import { getAuth, type Auth } from 'firebase/auth';

import { getFirebaseApp } from './app';

let auth: Auth | undefined;
export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}
