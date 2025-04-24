'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { Accordion, AccordionItem } from '@/components/accordion';
import { Question } from '@/features/questions';

import { NewQuestionForm } from './new-question-form';

export type QuestionListProps = {
  topicId: string;
  initialQuestions?: Question[];
};

export function QuestionList({ topicId, initialQuestions = [] }: QuestionListProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  return (
    <>
      <div className={clsx('text-xl')}>Новый вопрос:</div>
      <NewQuestionForm
        topicId={topicId}
        onCreate={(question) => setQuestions([question, ...questions])}
      />
      <div className={clsx('h-[1px]', 'bg-white/10', 'w-full')} />
      <div className={clsx('text-xl')}>Вопросы:</div>
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
    </>
  );
}
