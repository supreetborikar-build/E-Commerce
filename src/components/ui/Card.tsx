import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  glass = true,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl border border-white/10 overflow-hidden',
          glass ? 'bg-zinc-900/60 backdrop-blur-md' : 'bg-[#18181B]',
          hoverable &&
            'transition-all duration-300 hover:border-purple-500/40 hover:shadow-glow-primary hover:-translate-y-1',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
