import { addDoc, collection, documentId, getDocs, query, where } from 'firebase/firestore/lite';

import { getFirestore } from '@/firebase';

import { Question } from './types';

export async function addQuestion(question: Omit<Question, 'id'>) {
  const db = getFirestore();
  const doc = await addDoc(collection(db, 'topics', question.topicId, 'questions'), {
    question: question.question,
    type: question.type,
    answer_options: question.answerOptions,
    correct_answer: question.correctAnswer,
    reward: question.reward,
  });
  return doc.id;
}

export async function fetchQuestions(topidId: string, ids?: string[]): Promise<Question[]> {
  const db = getFirestore();
  const q =
    ids === undefined
      ? collection(db, 'topics', topidId, 'questions')
      : query(collection(db, 'topics', topidId, 'questions'), where(documentId(), 'in', ids));
  const questionsDocs = await getDocs(q);
  return questionsDocs.docs.map<Question>((doc) => ({
    id: doc.id,
    topicId: topidId,
    question: doc.get('question'),
    type: doc.get('type'),
    answerOptions: doc.get('answer_options'),
    correctAnswer: doc.get('correct_answer'),
    reward: doc.get('reward'),
  }));
}
