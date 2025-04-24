import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore/lite';

import { getFirebaseAuth, getFirestore } from '@/firebase';

import { Topic } from './types';
import { Question } from '../questions';

export async function fetchMyTopics(): Promise<Topic[]> {
  const uid = getFirebaseAuth().currentUser?.uid;
  if (!uid) {
    throw new Error('User is not authenticated');
  }
  const db = getFirestore();
  const q = query(collection(db, 'topics'), where('uid', '==', uid));
  const topicDocs = await getDocs(q);
  return topicDocs.docs.map((doc) => ({
    id: doc.id,
    name: doc.get('name'),
  }));
}

export async function fetchTopic(id: string): Promise<Topic> {
  const db = getFirestore();
  const topicDoc = await getDoc(doc(db, 'topics', id));
  if (!topicDoc.exists()) {
    throw new Error('Topic not found');
  }

  const topic: Topic = {
    id: topicDoc.id,
    name: topicDoc.get('name'),
  };

  const questionDocs = await getDocs(collection(db, 'topics', id, 'questions'));
  if (!questionDocs.empty) {
    topic.questions = questionDocs.docs.map<Question>((doc) => ({
      id: doc.id,
      topicId: id,
      answerOptions: doc.get('answer_options'),
      correctAnswer: doc.get('correct_answer'),
      question: doc.get('question'),
      reward: doc.get('reward'),
      type: doc.get('type'),
    }));
  }

  return topic;
}

export async function addTopic(data: { name: string }): Promise<string> {
  const uid = getFirebaseAuth().currentUser?.uid;
  if (!uid) {
    throw new Error('User is not authenticated');
  }
  const db = getFirestore();
  const newTopic = await addDoc(collection(db, 'topics'), { ...data, uid });
  return newTopic.id;
}
