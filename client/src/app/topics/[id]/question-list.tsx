'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { Accordion, AccordionItem } from '@/components/accordion';
import { addQuestion, Question, QuestionForm } from '@/features/questions';
import { Button } from '@/components/button';
import { QUESTION_TYPE_LABELS } from '@/features/topics';

export type QuestionListProps = {
  topicId: string;
  initialQuestions?: Question[];
};

export function QuestionList({ topicId, initialQuestions = [] }: QuestionListProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  return (
    <>
      <div className={clsx('text-xl')}>Новый вопрос:</div>
      <QuestionForm
        topicId={topicId}
        onSubmit={async (question) => {
          const id = await addQuestion(question);
          setQuestions([{ id, ...question }, ...questions]);
        }}
        resetAfterSubmit
      />
      <div className={clsx('h-[1px]', 'bg-white/10', 'w-full')} />
      <div className={clsx('text-xl')}>Вопросы:</div>
      <div className={clsx('flex', 'flex-col')}>
        <Accordion type="single" collapsible>
          {questions.map((q) => (
            <AccordionItem
              key={q.id}
              value={q.id}
              header={q.question}
              contentClassName={clsx('space-y-4')}
            >
              <div className={clsx('text-sm', 'text-zinc-400')}>id: {q.id}</div>
              <div>Вопрос: {q.question}</div>
              <div>Тип: {QUESTION_TYPE_LABELS[q.type]}</div>
              {q.type === 'text' ? (
                <div>Правильный ответ: {q.correctAnswer}</div>
              ) : (
                <>
                  <div>Варианты ответа: {q.answerOptions.join(', ')}</div>
                  <div>
                    Правильный ответ:{' '}
                    {q.correctAnswer
                      .split(',')
                      .map((v) => q.answerOptions[+v])
                      .join(', ')}
                  </div>
                </>
              )}
              <div>Количество баллов за правильный ответ: {q.reward}</div>
              <Button primary>
                <Link href={`/topics/${topicId}/question/${q.id}`}>Редактировать</Link>
              </Button>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
