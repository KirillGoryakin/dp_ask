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
      <div className={clsx('flex', 'items-center', 'space-x-6')}>
        <HeaderLink href="/topics">Темы</HeaderLink>
        <HeaderLink href="/tests">Тесты</HeaderLink>
      </div>
      <div className="grow" />
      <UserSection />
    </header>
  );
}

type HeaderLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};
function HeaderLink({ children, href, className }: HeaderLinkProps) {
  return (
    <Link
      className={clsx('font-semibold', 'transition-colors', 'hover:text-zinc-400', className)}
      href={href}
    >
      {children}
    </Link>
  );
}
