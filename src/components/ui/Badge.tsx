import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'highlight' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const base = 'inline-flex items-center font-medium rounded-full border tracking-wide select-none';

  const variants = {
    primary: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
    secondary: 'bg-teal-950/60 text-teal-300 border-teal-500/30',
    accent: 'bg-pink-950/60 text-pink-300 border-pink-500/30',
    highlight: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
    success: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    warning: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
    danger: 'bg-red-950/60 text-red-300 border-red-500/30',
    outline: 'bg-transparent text-zinc-300 border-zinc-700',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], sizes[size], className))} {...props}>
      {children}
    </span>
  );
};
