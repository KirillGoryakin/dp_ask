import clsx from 'clsx';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

import { fetchTest } from '@/features/tests';
import { generateQrCode } from '@/lib/utils';
import { BaseURL } from '@/lib/network';
import { CopiableText } from '@/components/copiable-text';
import { Button } from '@/components/button';

import { EditTestForm } from './edit-test-form';
import { TestResultsTable } from './test-results-table';

export type EditTestPageProps = {
  params: { id: string };
};

export default async function EditTestPage({ params: { id } }: EditTestPageProps) {
  const test = await fetchTest(id);
  const href = new BaseURL('tests/' + id).toString();
  const qrCodeUrl = await generateQrCode(href);
  return (
    <div className={clsx('mt-12')}>
      <h1 className={clsx('text-center', 'font-bold', 'text-white', 'mb-4', 'text-4xl')}>Тест</h1>
      <main
        className={clsx(
          'flex',
          'flex-col',
          'space-y-4',
          'lg:w-[50rem]',
          'w-full',
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
        <h2 className={clsx('font-bold', 'text-white', 'text-2xl')}>Пройти тест</h2>
        <div className={clsx('flex', 'gap-4', 'justify-center', 'items-center', 'flex-wrap')}>
          <Image
            className={clsx('block', 'size-80', 'rounded-2xl', 'shrink-0')}
            src={qrCodeUrl}
            alt="QR-code"
            width={320}
            height={320}
          />
          <div
            className={clsx('flex', 'flex-col', 'items-center', 'space-y-4', 'flex-1', 'min-w-64')}
          >
            <CopiableText className={clsx('flex-1', 'min-w-0')}>{href}</CopiableText>
            <Button primary className={clsx('w-max')}>
              <Link href={href} target="_blank">
                <FiExternalLink className={clsx('text-2xl')} />
              </Link>
            </Button>
          </div>
        </div>
        <div className={clsx('h-[1px]', 'bg-white/10', 'w-full')} />
        <h2 className={clsx('font-bold', 'text-white', 'text-2xl')}>
          Сформировать результаты теста
        </h2>
        <TestResultsTable test={test} />
        <div className={clsx('h-[1px]', 'bg-white/10', 'w-full')} />
        <h2 className={clsx('font-bold', 'text-white', 'text-2xl')}>Редактировать тест</h2>
        <EditTestForm test={test} />
      </main>
    </div>
  );
}
