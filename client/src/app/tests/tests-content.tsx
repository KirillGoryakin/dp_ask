'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

import { Spinner } from '@/components/spinner';
import { fetchMyTests, Test } from '@/features/tests';
import { useUser } from '@/features/user';

export function TestsContent() {
  const { replace } = useRouter();
  const { user } = useUser();
  const [tests, setTests] = useState<Test[]>();
  useEffect(() => {
    if (user) {
      fetchMyTests().then(setTests);
    } else if (user === null) {
      replace('/');
    }
  }, [user, replace]);
  if (!tests) {
    return <Spinner />;
  }
  return (
    <div className={clsx('flex', 'flex-col')}>
      {tests.map((test) => (
        <Link
          key={test.id}
          href={`/tests/${test.id}/edit`}
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
          <div className={clsx('flex-1', 'line-clamp-2', 'text-lg', 'pr-6')}>{test.name}</div>
          <FaArrowRightLong className={clsx('flex', 'text-lg', 'shrink-0', 'text-white')} />
        </Link>
      ))}
    </div>
  );
}
