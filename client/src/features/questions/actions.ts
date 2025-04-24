import { addDoc, collection } from 'firebase/firestore/lite';

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
