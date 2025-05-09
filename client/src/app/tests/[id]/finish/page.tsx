import clsx from 'clsx';

import { fetchTest } from '@/features/tests';

export type FinishTestPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FinishTestPage({ params }: FinishTestPageProps) {
  const { id } = await params;
  const test = await fetchTest(id);
  return (
    <div className={clsx('mt-12')}>
      <h1 className={clsx('text-center', 'font-bold', 'text-white', 'mb-8', 'text-4xl')}>
        Тест завершён
      </h1>
      <main
        className={clsx(
          'flex',
          'flex-col',
          'space-y-4',
          'lg:w-[40rem]',
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
        <p className={clsx('text-center')}>Результаты теста были отправлены вашему учителю.</p>
      </main>
    </div>
  );
}
