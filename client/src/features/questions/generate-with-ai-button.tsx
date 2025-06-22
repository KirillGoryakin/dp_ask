'use client';

import { BsStars } from 'react-icons/bs';
import clsx from 'clsx';

import { LoadableButton } from '@/components/button';

import { generateQuestion, GenerateQuestionData } from './generate-question';

export type GenerateWithAIButtonProps = {
  className?: string;
  data: GenerateQuestionData;
  onGenerate?: (
    generatedQuestion: Awaited<ReturnType<typeof generateQuestion>>,
  ) => void | Promise<void>;
};

export function GenerateWithAIButton({ className, data, onGenerate }: GenerateWithAIButtonProps) {
  const handleClick = async () => {
    if (!onGenerate) return;
    const res = await generateQuestion(data);
    console.log('Result from YandexGPT.', res);
    await onGenerate(res);
  };
  return (
    <LoadableButton className={clsx(className)} onClick={handleClick}>
      <BsStars className={clsx('text-lg')} />
    </LoadableButton>
  );
}
