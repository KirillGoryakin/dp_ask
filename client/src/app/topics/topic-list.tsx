'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { FaArrowRightLong, FaPlus } from 'react-icons/fa6';

import { addTopic, fetchMyTopics, Topic } from '@/features/topics';
import { useUser } from '@/features/user';
import { Spinner } from '@/components/spinner';
import { Field, Form, Input, SubmitButton } from '@/components/form';

export function TopicList() {
  const { replace } = useRouter();
  const { user } = useUser();
  const [topics, setTopics] = useState<Topic[]>();
  const addTopicToList = (newTopic: Topic) => {
    setTopics((prev) => (prev ? [...prev, newTopic] : [newTopic]));
  };
  useEffect(() => {
    if (user) {
      fetchMyTopics().then(setTopics);
    } else if (user === null) {
      replace('/');
    }
  }, [user, replace]);
  if (!topics) {
    return <Spinner />;
  }
  return (
    <>
      <Form
        className={clsx('flex', 'items-end', 'space-x-4', 'px-4')}
        action={async (data) => {
          const name = data.get('name') as string | null;
          if (!user || !name) {
            return;
          }
          const id = await addTopic({ name });
          addTopicToList({ id, name });
        }}
      >
        <Field name="name" label="Добавить тему">
          <Input placeholder="Название темы" />
        </Field>
        <SubmitButton>
          <FaPlus />
        </SubmitButton>
      </Form>
      <div className={clsx('h-[1px]', 'bg-white/10', 'w-full')} />
      <div className={clsx('flex', 'flex-col')}>
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.id}`}
            className={clsx(
              'flex',
              'items-center',
              'justify-between',
              'py-2',
              'px-6',
              'h-[4.5rem]',
              'rounded-lg',
              'transition-colors',
              'hover:bg-white/30',
            )}
          >
            <div className={clsx('flex', 'text-lg', 'pr-6')}>
              {topic.name.length > 155 ? `${topic.name.slice(0, 155).trim()}...` : topic.name}
            </div>
            <FaArrowRightLong className={clsx('flex', 'text-lg', 'shrink-0', 'text-white')} />
          </Link>
        ))}
      </div>
    </>
  );
}
