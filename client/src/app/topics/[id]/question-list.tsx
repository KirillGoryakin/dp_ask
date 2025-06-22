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
  topicTitle?: string;
  initialQuestions?: Question[];
};

export function QuestionList({ topicId, topicTitle, initialQuestions = [] }: QuestionListProps) {
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
        generateWithAI={{
          show: true,
          data: { topicTitle, existingQuestions: questions.map((q) => q.question) },
        }}
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
              contentClassName={clsx('space-y-4', '[&_span]:text-gray-400')}
            >
              <div className={clsx('text-sm', 'text-zinc-400')}>id: {q.id}</div>
              <div>
                <span>Вопрос:</span> {q.question}
              </div>
              <div>
                <span>Тип:</span> {QUESTION_TYPE_LABELS[q.type]}
              </div>
              {q.type === 'text' ? (
                <div>
                  <span>Правильный ответ:</span> {q.correctAnswer}
                </div>
              ) : (
                <>
                  <div>
                    <span>Варианты ответа:</span> {q.answerOptions.join(', ')}
                  </div>
                  <div>
                    <span>Правильный ответ:</span>{' '}
                    {q.correctAnswer
                      .split(',')
                      .map((v) => q.answerOptions[+v])
                      .join(', ')}
                  </div>
                </>
              )}
              <div>
                <span>Баллы за правильный ответ:</span> {q.reward}
              </div>
              <Button>
                <Link href={`/topics/${topicId}/question/${q.id}`}>Редактировать</Link>
              </Button>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
