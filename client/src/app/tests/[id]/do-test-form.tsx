'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import {
  CheckboxInput,
  Field,
  Form,
  Input,
  RadioGroup,
  RadioItem,
  SubmitButton,
} from '@/components/form';
import { finishTest, Test } from '@/features/tests';
import { Question } from '@/features/questions';

export type DoTestFormProps = {
  className?: string;
  test: Test;
  questions: Question[];
};

export function DoTestForm({ className, test, questions: questionsInitial }: DoTestFormProps) {
  const { push } = useRouter();
  const questions = test.questionIds.reduce<Record<string, Question | undefined>>(
    (acc, id) => ({ ...acc, [id]: questionsInitial.find((q) => q.id === id) }),
    {},
  );
  return (
    <Form
      className={clsx('flex', 'flex-col', 'space-y-6', className)}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = (formData.get('name') as string) || '';

        const answers: Record<string, string> = {};
        test.questionIds.forEach((id) => {
          const q = questions[id];
          if (!q) {
            return;
          }
          if (q.type === 'text') {
            answers[id] = formData.get(id) as string;
          } else if (q.type === 'radio') {
            answers[id] = formData.get(id) as string;
          } else {
            const answerOptions = q.answerOptions.map((_, i) => `${id}_${i}`);
            answers[id] = answerOptions
              .filter((name) => formData.has(name))
              .map((name) => name.split('_')[1])
              .join(',');
          }
        });

        await finishTest({ name, testId: test.id, answers });
        push(`/tests/${test.id}/finish`);
      }}
    >
      <Field name="name" label="Ваше имя">
        <Input required />
      </Field>
      {test.questionIds.map((id) => {
        const q = questions[id];
        if (!q) {
          return null;
        }
        return (
          <div key={id} className={clsx('flex', 'flex-col', 'space-y-2')}>
            <div>{q.question}</div>
            {q.type === 'text' ? (
              <Input name={id} required />
            ) : q.type === 'radio' ? (
              <RadioGroup className={clsx('flex', 'flex-col', 'space-y-2')} name={id} required>
                {q.answerOptions.map((text, i) => {
                  return <RadioItem key={`${id}_${i}`} value={i.toString()} label={text} />;
                })}
              </RadioGroup>
            ) : (
              q.answerOptions.map((text, i) => {
                const name = `${id}_${i}`;
                return <CheckboxInput key={name} name={name} value={name} label={text} />;
              })
            )}
          </div>
        );
      })}
      <SubmitButton className={clsx('w-max', 'mx-auto')}>Завершить тест</SubmitButton>
    </Form>
  );
}
