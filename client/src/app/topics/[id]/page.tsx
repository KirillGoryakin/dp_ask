import clsx from 'clsx';

import { fetchTopic } from '@/features/topics';

import { QuestionList } from './question-list';

export type SingleTopicPageProps = {
  params: { id: string };
};

export default async function SingleTopicPage({ params: { id } }: SingleTopicPageProps) {
  const topic = await fetchTopic(id);
  return (
    <div className={clsx('mt-12')}>
      <h1 className={clsx('text-center', 'font-bold', 'text-white', 'mb-4', 'text-4xl')}>Тема</h1>
      <main
        className={clsx(
          'flex',
          'flex-col',
          'space-y-4',
          'lg:w-[50rem]',
          'w-full',
          'mx-auto',
          'py-5',
          'px-6',
          'bg-black/35',
          'rounded-xl',
          'backdrop-blur-sm',
          'shadow-white/20',
          'shadow-inner',
        )}
      >
        <h2 className={clsx('font-bold', 'text-white', 'text-2xl')}>{topic.name}</h2>
        <div className={clsx('h-[1px]', 'bg-white/10', 'w-full')} />
        <QuestionList topicId={id} initialQuestions={topic.questions} />
      </main>
    </div>
  );
}
