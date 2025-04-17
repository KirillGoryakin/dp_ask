import clsx from 'clsx';
import { Metadata } from 'next';

import { LayoutProviders } from './layout-providers';
import './global.css';

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
    <LayoutProviders>
      <html lang="ru">
        <body
          className={clsx(
            'min-h-screen',
            'text-zinc-200',
            'font-sans',
            'bg-gradient-to-br',
            'from-indigo-500',
            'to-[#7142aa]',
            'bg-no-repeat',
            'pb-16',
          )}
        >
          <div className={clsx('flex', 'flex-col', 'min-h-[calc(100vh-4rem)]')}>
            {header}
            {children}
          </div>
          {dialogs}
        </body>
      </html>
    </LayoutProviders>
  );
}
