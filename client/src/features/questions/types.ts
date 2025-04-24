export type Question = {
  id: string;
  topicId: string;
  answerOptions: string[];
  correctAnswer: string;
  question: string;
  reward: number;
  type: 'text' | 'checkbox' | 'radio';
};
