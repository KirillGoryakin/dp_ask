import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';

import { getFirebaseAuth, getFirestore } from '@/firebase';

import { User } from './types';

export async function signIn(email: string, password: string): Promise<User> {
  const { user } = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  const { get } = await getDoc(doc(getFirestore(), 'users', user.uid));
  return {
    id: user.uid,
    email: user.email || '',
    displayName: get('displayName'),
  };
}
