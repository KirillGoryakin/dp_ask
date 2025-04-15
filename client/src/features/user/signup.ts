import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore/lite';

import { getFirebaseAuth, getFirestore } from '@/firebase';
import { User } from './types';

export async function signUp(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  const db = getFirestore();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, 'users', user.uid), { email: user.email, displayName: '' });
  return {
    id: user.uid,
    email: user.email || '',
    displayName: '',
  };
}
