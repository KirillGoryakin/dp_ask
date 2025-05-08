import clsx from 'clsx';

import { fetchQuestions } from '@/features/questions';

import { EditQuestionForm } from './edit-question-form';

export type SingleTopicPageProps = {
  params: { id: string; qid: string };
};

export default async function SingleTopicPage({
  params: { id: topicId, qid: questionId },
}: SingleTopicPageProps) {
  const [question] = await fetchQuestions(topicId, [questionId]);
  return (
    <div className={clsx('mt-12')}>
      <h1 className={clsx('text-center', 'font-bold', 'text-white', 'mb-4', 'text-4xl')}>
        Редактировать вопрос
      </h1>
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
        <EditQuestionForm id={questionId} topicId={topicId} defaultValues={question} />
      </main>
    </div>
  );
}
