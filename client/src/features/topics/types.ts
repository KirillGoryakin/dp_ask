import { Question } from '../questions';

export type Topic = {
  id: string;
  name: string;
  questions?: Question[];
};
