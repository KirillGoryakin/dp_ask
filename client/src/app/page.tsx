import clsx from 'clsx';

import { SignupForm } from '@/features/auth/signup-form';

export default async function Home() {
  return (
    <div className={clsx('mt-12')}>
      <h1 className={clsx('text-center', 'font-bold', 'text-white', 'mb-8', 'text-4xl')}>
        Авторизация
      </h1>
      <main
        className={clsx(
          'flex',
          'flex-col',
          'space-y-4',
          'w-max',
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
        <SignupForm />
      </main>
    </div>
  );
}
