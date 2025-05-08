'use client';

import { useRouter } from 'next/navigation';

import { QuestionForm, QuestionFormProps, updateQuestion } from '@/features/questions';

export type EditQuestionFormProps = { id: string } & Pick<
  QuestionFormProps,
  'className' | 'topicId' | 'defaultValues'
>;

export function EditQuestionForm({ id, ...props }: EditQuestionFormProps) {
  const { push } = useRouter();
  const { topicId } = props;
  return (
    <QuestionForm
      {...props}
      onSubmit={async (question) => {
        await updateQuestion({ ...question, id, topicId });
        push(`/topics/${topicId}`);
      }}
    />
  );
}
