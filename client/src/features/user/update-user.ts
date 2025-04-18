import { doc, updateDoc } from 'firebase/firestore/lite';

import { getFirebaseAuth, getFirestore } from '@/firebase';

export function updateUser(data: { displayName: string }) {
  const uid = getFirebaseAuth().currentUser?.uid;
  if (!uid) {
    throw new Error('User is not authenticated');
  }
  return updateDoc(doc(getFirestore(), 'users', uid), data);
}
