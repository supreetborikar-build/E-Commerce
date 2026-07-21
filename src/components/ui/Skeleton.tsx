import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  ...props
}) => {
  const base = 'animate-pulse bg-zinc-800/80 rounded-xl relative overflow-hidden';

  const variants = {
    rectangular: '',
    circular: 'rounded-full',
    text: 'h-4 w-full rounded-md',
  };

  return (
    <div className={twMerge(clsx(base, variants[variant], className))} {...props}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
};
