'use client';

import clsx from 'clsx';
import { useState } from 'react';

import {
  Field,
  Form,
  CheckboxInput,
  Select,
  SelectItem,
  Textarea,
  Input,
  SubmitButton,
  RadioGroup,
  RadioItem,
} from '@/components/form';
import { QUESTION_TYPE_LABELS } from '@/features/topics';
import { ArrayInput, ArrayInputValue } from '@/components/array-input';
import { addQuestion, Question } from '@/features/questions';

export type NewQuestionFormProps = {
  className?: string;
  onCreate?: (question: Question) => void;
  topicId: string;
};

export function NewQuestionForm({ className, onCreate, topicId }: NewQuestionFormProps) {
  const [type, setType] = useState<Question['type']>('radio');
  const [answerOptions, setAnswerOptions] = useState<ArrayInputValue[]>([]);
  return (
    <Form
      className={clsx('flex', 'flex-col', 'space-y-4', className)}
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const text = (data.get('question') as string | null) ?? '';
        const correctAnswer =
          type === 'radio'
            ? ((data.get('correct_answer') as string) ?? '0')
            : answerOptions
                .map((_, i) => data.get(`correct_answer_${i}`))
                .filter((v) => v)
                .join(',');
        const reward = +(data.get('reward') ?? 1);
        const question = {
          topicId,
          answerOptions: answerOptions.map((o) => o.value),
          question: text,
          type,
          correctAnswer,
          reward,
        };
        const questionId = await addQuestion(question);
        onCreate?.({ ...question, id: questionId });
        (e.target as HTMLFormElement).reset();
        setAnswerOptions([]);
        setType('radio');
      }}
    >
      <Field name="question" label="Вопрос">
        <Textarea />
      </Field>
      <Field name="type" label="Тип вопроса">
        <Select
          name="type"
          defaultValue="radio"
          onValueChange={(value) => setType(value as Question['type'])}
        >
          {Object.entries(QUESTION_TYPE_LABELS).map(([type, label]) => (
            <SelectItem key={type} value={type} label={label} />
          ))}
        </Select>
      </Field>
      {!type ? null : type === 'text' ? (
        <Field name="correct_answer" label="Правильный ответ">
          <Input name="correct_answer" />
        </Field>
      ) : (
        <div>
          <div>
            Варианты ответов. Отметьте{' '}
            {type === 'checkbox' ? 'правильные варианты.' : 'правильный вариант.'}
          </div>
          <div className={clsx('flex')}>
            <ArrayInput values={answerOptions} setValues={setAnswerOptions} />
            <RadioGroup name="correct_answer">
              <div className={clsx('flex', 'flex-col')}>
                {answerOptions.map(({ id }, index, arr) => {
                  const isLast = index + 1 === arr.length;
                  return type === 'checkbox' ? (
                    <CheckboxInput
                      key={id}
                      name={`correct_answer_${index}`}
                      value={index}
                      label=""
                      className={clsx(
                        '!rounded-l-none',
                        arr.length === 1
                          ? null
                          : index === 0
                            ? '!rounded-b-none'
                            : isLast
                              ? '!rounded-t-none'
                              : '!rounded-none',
                      )}
                    />
                  ) : type === 'radio' ? (
                    <RadioItem
                      key={id}
                      value={index.toString()}
                      label=""
                      className={clsx(
                        '!rounded-l-none',
                        arr.length === 1
                          ? null
                          : index === 0
                            ? '!rounded-b-none'
                            : isLast
                              ? '!rounded-t-none'
                              : '!rounded-none',
                      )}
                    />
                  ) : null;
                })}
              </div>
            </RadioGroup>
          </div>
        </div>
      )}
      <Field name="reward" label="Количество баллов за правильный ответ">
        <Input
          type="number"
          min={-1000}
          max={1000}
          name="reward"
          className={clsx('!w-20', 'text-right')}
          defaultValue={1}
        />
      </Field>
      <SubmitButton className={clsx('w-max')} disabled={!type}>
        Создать вопрос
      </SubmitButton>
    </Form>
  );
}
