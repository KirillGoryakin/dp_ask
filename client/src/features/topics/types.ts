export type Question = {
  id: string;
  answerOptions: string[];
  correctAnswer: string;
  question: string;
  reward: number;
  type: 'text' | 'checkbox' | 'radio';
};

export type Topic = {
  id: string;
  name: string;
  questions?: Question[];
};
