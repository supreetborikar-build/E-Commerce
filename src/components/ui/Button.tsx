import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { soundFx } from '../../utils/sound';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'primary' || variant === 'accent' || variant === 'secondary') {
      soundFx.playBuySound();
    } else {
      soundFx.playClick();
    }
    if (onClick) onClick(e);
  };
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090B] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary:
      'bg-purple-600 hover:bg-purple-500 text-white shadow-glow-primary focus:ring-purple-500 border border-purple-400/30',
    secondary:
      'bg-teal-500 hover:bg-teal-400 text-zinc-950 font-semibold shadow-glow-secondary focus:ring-teal-400 border border-teal-300/30',
    accent:
      'bg-pink-600 hover:bg-pink-500 text-white shadow-glow-accent focus:ring-pink-500 border border-pink-400/30',
    outline:
      'bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-100 border border-zinc-700/80 hover:border-zinc-500 focus:ring-purple-500',
    ghost:
      'bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white focus:ring-purple-500',
    danger:
      'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500 border border-red-400/30',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-2xl',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
