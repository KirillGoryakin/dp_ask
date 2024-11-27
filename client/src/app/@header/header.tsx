import Link from 'next/link';
import { clsx } from 'clsx';

export function Header() {
  return (
    <header
      className={clsx(
        'relative',
        'z-10',
        'mb-4',
        'md:mb-0',
        'flex',
        'items-center',
        'flex-wrap',
        'pt-4',
        'md:p-6',
        'lg:px-8',
        'lg:py-8',
        'shadow-sm',
        'md:shadow-none',
      )}
      id="site-header"
    >
      <Link
        className={clsx(
          'grow',
          'md:grow-0',
          'ml-4',
          'md:ml-0',
          'flex',
          'items-center',
          'space-x-4',
          'lg:w-60',
        )}
        href="/"
      >
        <h1
          className={clsx(
            'md:hidden',
            'lg:block',
            'w-24',
            'md:w-32',
            'text-xs',
            'leading-none',
            'md:text-sm',
            'md:leading-none',
            'md:font-semibold',
          )}
        >
          АСК
        </h1>
      </Link>
    </header>
  );
}
