'use client';

import { useRouter } from 'next/router';

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
