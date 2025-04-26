import clsx from 'clsx';

import { NewTestForm } from './new-test-form';

export default function NewTestPage() {
  return (
    <div className={clsx('mt-12')}>
      <h1 className={clsx('text-center', 'font-bold', 'text-white', 'mb-4', 'text-4xl')}>
        Новый тест
      </h1>
      <main
        className={clsx(
          'flex',
          'flex-col',
          'space-y-4',
          'w-[50rem]',
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
        <NewTestForm />
      </main>
    </div>
  );
}
