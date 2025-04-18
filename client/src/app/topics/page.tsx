import clsx from 'clsx';

import { TopicList } from './topic-list';

export default function TopicsPage() {
  return (
    <div className={clsx('mt-12')}>
      <h1 className={clsx('text-center', 'font-bold', 'text-white', 'mb-8', 'text-4xl')}>
        Список тем
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
        <TopicList />
      </main>
    </div>
  );
}
