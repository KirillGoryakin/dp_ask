import clsx from 'clsx';
import { Metadata } from 'next';

import { LayoutProviders } from './layout-providers';

export const metadata: Metadata = {
  title: {
    default: 'АСК',
    template: '%s — АСК',
  },
  description: 'АСК - Система автоматического создания контрольных работ и тестов',
};

type Props = {
  header: React.ReactNode;
  dialogs: React.ReactNode;
  children: React.ReactNode;
};
export default function RootLayout({ header, dialogs, children }: Props) {
  return (
    <html lang="ru">
      <body className={clsx('text-stone-900', 'font-sans')}>
        <LayoutProviders>
          <div className={clsx('flex', 'flex-col', 'min-h-[var(--100dvh)]')}>
            {header}
            {children}
          </div>
          {dialogs}
        </LayoutProviders>
      </body>
    </html>
  );
}
