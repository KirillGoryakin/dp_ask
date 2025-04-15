import { doc, updateDoc } from 'firebase/firestore/lite';

import { getFirestore } from '@/firebase';

export function updateUser(uid: string, data: { displayName: string }) {
  return updateDoc(doc(getFirestore(), 'users', uid), data);
}
