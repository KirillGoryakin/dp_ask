import clsx from 'clsx';
import { ComponentProps } from 'react';

import spinnerGif from './spinner.gif';

export type SpinnerProps = ComponentProps<'div'>;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div {...props} className={clsx('flex', 'size-10', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img className={clsx('w-full', 'h-auto')} src={spinnerGif.src} />
    </div>
  );
}
