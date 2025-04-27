import clsx from 'clsx';
import Image from 'next/image';

import { fetchTest } from '@/features/tests';
import { generateQrCode } from '@/lib/utils';
import { BaseURL } from '@/lib/network';
import { CopiableText } from '@/components/copiable-text';
import { EditTestForm } from './edit-test-form';

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
        <h2 className={clsx('font-bold', 'text-white', 'text-2xl')}>Пройти тест</h2>
        <div className={clsx('flex', 'space-x-4', 'items-center')}>
          <Image
            className={clsx('block', 'size-80', 'rounded-2xl', 'shrink-0')}
            src={qrCodeUrl}
            alt="QR-code"
            width={320}
            height={320}
          />
          <CopiableText className={clsx('flex-1', 'min-w-0')}>{href}</CopiableText>
        </div>
        <div className={clsx('h-[1px]', 'bg-white/10', 'w-full')} />
        <h2 className={clsx('font-bold', 'text-white', 'text-2xl')}>Редактировать тест</h2>
        <EditTestForm test={test} />
      </main>
    </div>
  );
}
