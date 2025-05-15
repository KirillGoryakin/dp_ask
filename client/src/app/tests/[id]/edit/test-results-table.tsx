'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { Button } from '@/components/button';
import { fetchTestResults, Test, TestResult } from '@/features/tests';
import { fetchQuestions, Question } from '@/features/questions';
import { exportCsv } from '@/lib/utils';

export type TestResultsTableProps = {
  test: Pick<Test, 'id' | 'topicId' | 'questionIds'>;
};

export function TestResultsTable({ test }: TestResultsTableProps) {
  const [data, setData] = useState<string[][]>();

  const updateResults = async () => {
    const res = await fetchTestResults(test.id);
    const questions = await fetchQuestions(test.topicId, test.questionIds).then(
      (questionsInitial) =>
        test.questionIds.reduce<Record<string, Question | undefined>>(
          (acc, id) => ({ ...acc, [id]: questionsInitial.find((q) => q.id === id) }),
          {},
        ),
    );
    if (res.length === 0) {
      setData([]);
      return;
    }

    const result: (Omit<TestResult, 'answers'> & {
      answers: Record<string, { name: string; answer: string; score: number }>;
    })[] = res.map((r) => ({
      ...r,
      answers: test.questionIds.reduce((acc, id) => {
        const q = questions?.[id];
        if (!q) {
          return acc;
        }
        return {
          ...acc,
          [id]: {
            name: q.question,
            answer: r.answers[id],
            score: q.correctAnswer === r.answers[id] ? q.reward : 0,
          },
        };
      }, {}),
    }));

    console.log(result);

    const data: string[][] = [];
    data[0] = [
      'Имя',
      ...test.questionIds.map((id) => questions?.[id]?.question || ''),
      'Результат',
    ];
    result.forEach((r) => {
      const row: string[] = [];
      let totalScore = 0;
      let maxScore = 0;
      row.push(r.name);
      test.questionIds.forEach((id) => {
        const q = questions?.[id];
        if (!q) {
          return;
        }
        totalScore += r.answers[id]?.score;
        maxScore += q.reward;
        const ans =
          q.type === 'text'
            ? r.answers[id]?.answer
            : r.answers[id]?.answer
                .split(',')
                .map((v) => q.answerOptions[+v])
                .join('; ');
        row.push(`${ans ?? '-'} (${r.answers[id]?.score})`);
      });
      row.push(`${totalScore} / ${maxScore} (${+((totalScore / maxScore) * 100).toFixed(2)}%)`);
      data.push(row);
    });
    setData(data);
  };

  return (
    <div>
      <div className={clsx('flex', 'gap-2')}>
        <Button primary onClick={updateResults}>
          Сформировать
        </Button>
        {data && data.length > 0 && (
          <Button primary onClick={() => exportCsv(data)}>
            Экспорт в .csv
          </Button>
        )}
      </div>
      <div
        className={clsx(
          'w-full',
          'h-[40rem]',
          'overflow-scroll',
          'mt-4',
          'bg-black/5',
          'backdrop-blur-sm',
          'transition-shadow',
          'shadow-black/50',
          'shadow-inner',
          'outline-none',
        )}
      >
        {data && data.length > 0 && (
          <table
            className={clsx(
              'w-full',
              '[&_tr>*]:min-w-44',
              '[&_tr>*]:border',
              '[&_tr>*]:border-zinc-200',
              '[&_tr>*]:p-2',
            )}
          >
            <thead>
              <tr>
                {data[0].map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
