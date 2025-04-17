import { collection, getDocs, query, where } from 'firebase/firestore/lite';

import { getFirestore } from '@/firebase';

import { Topic } from './types';

export async function fetchTopics(uid: string): Promise<Topic[]> {
  const db = getFirestore();
  const q = query(collection(db, 'topics'), where('uid', '==', uid));
  const topics = await getDocs(q);
  const res = topics.docs.map((doc) => ({
    id: doc.id,
    name: doc.get('name'),
  }));
  console.log(res);
  return res;
}
