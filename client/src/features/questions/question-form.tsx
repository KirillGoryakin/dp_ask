'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { nanoid } from 'nanoid';

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
import { Question } from '@/features/questions';

export type QuestionFormProps = {
  className?: string;
  onSubmit?: (question: Omit<Question, 'id'>) => Promise<void> | void;
  resetAfterSubmit?: boolean;
  defaultValues?: Partial<Question>;
  topicId: string;
};

export function QuestionForm({
  className,
  onSubmit,
  resetAfterSubmit = false,
  defaultValues,
  topicId,
}: QuestionFormProps) {
  const [type, setType] = useState<Question['type']>(defaultValues?.type || 'radio');
  const [answerOptions, setAnswerOptions] = useState<ArrayInputValue[]>(() =>
    (defaultValues?.answerOptions || []).map((v) => ({ id: nanoid(), value: v })),
  );
  return (
    <Form
      className={clsx('flex', 'flex-col', 'space-y-4', className)}
      onSubmit={async (e, data) => {
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
        await onSubmit?.(question);
        if (resetAfterSubmit) {
          (e.target as HTMLFormElement).reset();
          setAnswerOptions([]);
          setType('radio');
        }
      }}
    >
      <Field name="question" label="Вопрос">
        <Textarea defaultValue={defaultValues?.question} />
      </Field>
      <Field name="type" label="Тип вопроса">
        <Select
          name="type"
          defaultValue={defaultValues?.type || 'radio'}
          onValueChange={(value) => setType(value as Question['type'])}
        >
          {Object.entries(QUESTION_TYPE_LABELS).map(([type, label]) => (
            <SelectItem key={type} value={type} label={label} />
          ))}
        </Select>
      </Field>
      {!type ? null : type === 'text' ? (
        <Field name="correct_answer" label="Правильный ответ">
          <Input name="correct_answer" defaultValue={defaultValues?.correctAnswer} />
        </Field>
      ) : (
        <div>
          <div>
            Варианты ответов. Отметьте{' '}
            {type === 'checkbox' ? 'правильные варианты.' : 'правильный вариант.'}
          </div>
          <div className={clsx('flex')}>
            <ArrayInput values={answerOptions} setValues={setAnswerOptions} />
            <RadioGroup name="correct_answer" defaultValue={defaultValues?.correctAnswer}>
              <div className={clsx('flex', 'flex-col')}>
                {answerOptions.map(({ id }, index, arr) => {
                  const isLast = index + 1 === arr.length;
                  return type === 'checkbox' ? (
                    <CheckboxInput
                      key={id}
                      name={`correct_answer_${index}`}
                      value={index}
                      label=""
                      defaultChecked={(
                        defaultValues?.correctAnswer?.split(',').map(Number) ?? []
                      ).includes(index)}
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
          defaultValue={defaultValues?.reward || 1}
        />
      </Field>
      <SubmitButton className={clsx('w-max')} disabled={!type}>
        Сохранить
      </SubmitButton>
    </Form>
  );
}
