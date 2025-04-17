import { addDoc, collection } from 'firebase/firestore/lite';

import { getFirestore } from '@/firebase';

export async function addTopic(data: { name: string; uid: string }): Promise<string> {
  const db = getFirestore();
  const newTopic = await addDoc(collection(db, 'topics'), data);
  return newTopic.id;
}
