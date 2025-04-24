import { Question } from '../questions';

export const QUESTION_TYPE_LABELS: Record<Question['type'], string> = {
  radio: 'Один вариант ответа',
  checkbox: 'Несколько вариантов ответа',
  text: 'Текстовый',
};
