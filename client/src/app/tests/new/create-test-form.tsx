'use client';

import { useRouter } from 'next/navigation';

import { addTest, TestForm } from '@/features/tests';

export function CreateTestForm() {
  const { push } = useRouter();
  return (
    <TestForm
      onSubmit={async (test) => {
        const testId = await addTest(test);
        push(`/tests/${testId}/edit`);
      }}
    />
  );
}
