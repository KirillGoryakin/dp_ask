import clsx from 'clsx';

import { fetchTest } from '@/features/tests';
import { fetchQuestions } from '@/features/questions';

import { DoTestForm } from './do-test-form';

export type SingleTestPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SingleTestPage({ params }: SingleTestPageProps) {
  const { id } = await params;
  const test = await fetchTest(id);
  const questions = await fetchQuestions(test.topicId, test.questionIds);
  return (
    <div className={clsx('mt-12')}>
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
        <h2 className={clsx('font-bold', 'text-white', 'text-2xl')}>{test.name}</h2>
        <p className={clsx('text-white', 'text-lg', 'whitespace-pre')}>{test.description}</p>
        <div className={clsx('h-[1px]', 'bg-white/10', 'w-full')} />
        <DoTestForm test={test} questions={questions} />
      </main>
    </div>
  );
}
