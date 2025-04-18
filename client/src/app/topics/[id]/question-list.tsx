'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { FaArrowRightLong } from 'react-icons/fa6';

import { Question } from '@/features/topics';
import { Accordion, AccordionItem } from '@/components/accordion';

export type QuestionListProps = {
  initialQuestions?: Question[];
};

export function QuestionList({ initialQuestions = [] }: QuestionListProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  return (
    <div className={clsx('flex', 'flex-col')}>
      <Accordion type="single" collapsible>
        {questions.map((q) => (
          <AccordionItem key={q.id} value={q.id} header={q.question}>
            <div>{q.question}</div>
            <div>{q.id}</div>
            <div>{q.type}</div>
            <div>{q.answerOptions.join(', ')}</div>
            <div>{q.correctAnswer}</div>
            <div>{q.reward}</div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
