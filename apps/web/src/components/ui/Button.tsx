import React from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
  secondary: 'border border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500',
};

/**
 * Reusable button component with variants
 */
export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const baseClasses = 'rounded-xl px-4 py-2 text-sm font-semibold transition';
  const variantClass = variantClasses[variant];

  return (
    <button className={`${baseClasses} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
