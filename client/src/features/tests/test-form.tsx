'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  CheckboxInput,
  Field,
  Form,
  Input,
  Select,
  SelectItem,
  Slider,
  SubmitButton,
  Textarea,
} from '@/components/form';
import { fetchMyTopics, Topic } from '@/features/topics';
import { useUser } from '@/features/user';
import { Spinner } from '@/components/spinner';
import { fetchQuestions, Question } from '@/features/questions';
import { Button } from '@/components/button';
import { getRandomItems } from '@/lib/utils';
import { Test } from '@/features/tests';

export type TestFormProps = {
  className?: string;
  onSubmit?: (test: Omit<Test, 'id'>) => boolean | void | Promise<boolean | void>;
  defaultValues?: Partial<Test>;
};

export function TestForm({ className, onSubmit, defaultValues }: TestFormProps) {
  const { replace } = useRouter();
  const { user } = useUser();
  const [topics, setTopics] = useState<Topic[]>();
  useEffect(() => {
    if (user) {
      fetchMyTopics().then(setTopics);
    } else if (user === null) {
      replace('/');
    }
  }, [user, replace]);

  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(
    defaultValues?.topicId,
  );
  const [questions, setQuestions] = useState<Question[]>();
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>(
    defaultValues?.questionIds ?? [],
  );
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (selectedTopicId) {
      fetchQuestions(selectedTopicId).then(setQuestions);
    } else {
      setQuestions(undefined);
    }
  }, [selectedTopicId]);

  if (!topics) {
    return <Spinner />;
  }

  return (
    <Form
      className={clsx('flex', 'flex-col', 'space-y-4', className)}
      onSubmit={async (e, data) => {
        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const reset = await onSubmit?.({
          name,
          description,
          topicId: selectedTopicId!,
          questionIds: selectedQuestionIds,
        });
        if (reset) {
          (e.target as HTMLFormElement).reset();
          setSelectedTopicId(defaultValues?.topicId);
          setSelectedQuestionIds(defaultValues?.questionIds ?? []);
          setCount(1);
        }
      }}
    >
      <Field name="name" label="Заголовок">
        <Input defaultValue={defaultValues?.name} />
      </Field>
      <Field name="description" label="Описание">
        <Textarea defaultValue={defaultValues?.description} />
      </Field>
      <Field name="topic_id" label="Тема">
        <Select
          name="topic_id"
          placeholder="Выберите тему"
          onValueChange={(value) =>
            setSelectedTopicId(topics.find((topic) => topic.id === value)?.id)
          }
          value={selectedTopicId}
        >
          {topics.map((topic) => (
            <SelectItem key={topic.id} value={topic.id} label={topic.name} />
          ))}
        </Select>
      </Field>
      {selectedTopicId && !questions ? (
        <Spinner />
      ) : (
        questions &&
        questions.length > 0 && (
          <>
            <div className={clsx('flex', 'items-center', 'space-x-6')}>
              <Button
                onClick={() => {
                  const randomQuestions = getRandomItems(questions, count);
                  setSelectedQuestionIds(randomQuestions.map((q) => q.id));
                }}
              >
                Выбрать случайные вопросы
              </Button>
              <span>{count}</span>
              <Slider
                min={1}
                max={questions.length}
                step={Math.max(1, questions.length / 100)}
                value={[count]}
                onValueChange={(v) => setCount(v[0])}
              />
            </div>
            <div className={clsx('flex', 'flex-col', 'space-y-2')}>
              <div>Вопросы: </div>
              {questions.map((q) => (
                <CheckboxInput
                  key={q.id}
                  name={`question_id_${q.id}`}
                  value={q.id}
                  label={q.question}
                  checked={selectedQuestionIds.includes(q.id)}
                  onCheckedChange={(state) => {
                    if (state) {
                      setSelectedQuestionIds([...selectedQuestionIds, q.id]);
                    } else {
                      setSelectedQuestionIds(selectedQuestionIds.filter((id) => id !== q.id));
                    }
                  }}
                />
              ))}
            </div>
            <SubmitButton>Сохранить тест</SubmitButton>
          </>
        )
      )}
    </Form>
  );
}
