import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite';

import { getFirebaseAuth, getFirestore } from '@/firebase';

import { Test, TestResult } from './types';

export async function fetchMyTests() {
  const uid = getFirebaseAuth().currentUser?.uid;
  if (!uid) {
    throw new Error('User is not authenticated');
  }
  const db = getFirestore();
  const q = query(collection(db, 'tests'), where('uid', '==', uid));
  const testsDocs = await getDocs(q);
  return testsDocs.docs.map<Test>((doc) => ({
    id: doc.id,
    name: doc.get('name'),
    description: doc.get('description'),
    topicId: doc.get('topic_id'),
    questionIds: doc.get('question_ids'),
  }));
}

export async function fetchTest(id: string): Promise<Test> {
  const db = getFirestore();
  const testDoc = await getDoc(doc(db, 'tests', id));
  if (!testDoc.exists()) {
    throw new Error('Test not found');
  }
  return {
    id: testDoc.id,
    name: testDoc.get('name'),
    description: testDoc.get('description'),
    topicId: testDoc.get('topic_id'),
    questionIds: testDoc.get('question_ids'),
  };
}

export async function addTest(test: Omit<Test, 'id'>) {
  const uid = getFirebaseAuth().currentUser?.uid;
  if (!uid) {
    throw new Error('User is not authenticated');
  }
  const db = getFirestore();
  const doc = await addDoc(collection(db, 'tests'), {
    name: test.name,
    description: test.description,
    topic_id: test.topicId,
    question_ids: test.questionIds,
    uid,
  });
  return doc.id;
}

export async function updateTest(test: Omit<Partial<Test>, 'id'> & { id: string }) {
  const uid = getFirebaseAuth().currentUser?.uid;
  if (!uid) {
    throw new Error('User is not authenticated');
  }
  const db = getFirestore();
  await updateDoc(doc(db, 'tests', test.id), {
    name: test.name,
    description: test.description,
    topic_id: test.topicId,
    question_ids: test.questionIds,
  });
}

export async function finishTest({
  testId,
  name,
  answers,
}: {
  testId: string;
  name: string;
  answers: Record<string, string>;
}) {
  const db = getFirestore();
  const resDoc = await addDoc(collection(db, 'tests', testId, 'results'), {
    name,
    answers,
    date: new Date(),
  });
  return resDoc.id;
}

export async function fetchTestResults(id: string): Promise<TestResult[]> {
  const db = getFirestore();
  const { docs } = await getDocs(collection(db, 'tests', id, 'results'));
  return docs.map<TestResult>((doc) => ({
    id: doc.id,
    testId: id,
    name: doc.get('name'),
    date: doc.get('date'),
    answers: doc.get('answers'),
  }));
}
