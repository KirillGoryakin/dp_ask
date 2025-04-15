import Link from 'next/link';
import { clsx } from 'clsx';

import { UserSection } from './user-section';

export function Header() {
  return (
    <header
      className={clsx(
        'relative',
        'z-10',
        'mb-4',
        'md:mb-0',
        'flex',
        'pt-4',
        'md:p-6',
        'lg:px-8',
        'lg:py-8',
        'shadow-sm',
        'md:shadow-none',
      )}
      id="site-header"
    >
      <Link className={clsx('flex', 'ml-4', 'w-60')} href="/">
        <h1 className={clsx('w-32', 'text-4xl', 'leading-none', 'font-semibold')}>АСК</h1>
      </Link>
      <div className="grow" />
      <UserSection />
    </header>
  );
}
