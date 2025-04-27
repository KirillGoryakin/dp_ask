'use client';

import { Test, TestForm, updateTest } from '@/features/tests';

export type EditTestFormProps = {
  test: Test;
};

export function EditTestForm({ test }: EditTestFormProps) {
  return (
    <TestForm
      defaultValues={test}
      onSubmit={async (newTest) => {
        await updateTest({ id: test.id, ...newTest });
      }}
    />
  );
}
