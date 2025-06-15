'use client';

import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';

import { Button } from '@/components/button';
import { useIsSSR } from '@/components/ssr';

export function NewTestButton() {
  const isSsr = useIsSSR();
  if (isSsr) return null;
  return (
    <Button asChild>
      <Link href="/tests/new">
        <FaPlus />
      </Link>
    </Button>
  );
}
