import { clsx } from 'clsx';

export type SkeletonProps = { className?: string; style?: React.CSSProperties };
export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div className={clsx('bg-stone-200', 'rounded-md', 'animate-pulse', className)} style={style} />
  );
}
