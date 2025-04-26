import clsx from 'clsx';
import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';

import { Button } from '@/components/button';

import { TestsContent } from './tests-content';

export default function TestsPage() {
  return (
    <div className={clsx('mt-12')}>
      <h1 className={clsx('text-center', 'font-bold', 'text-white', 'mb-8', 'text-4xl')}>Тесты</h1>
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
        <h2 className={clsx('font-bold', 'text-white', 'text-2xl', 'flex', 'justify-between')}>
          <div>Ваши тесты:</div>
          <Button primary asChild>
            <Link href="/tests/new">
              <FaPlus />
            </Link>
          </Button>
        </h2>
        <TestsContent />
      </main>
    </div>
  );
}
