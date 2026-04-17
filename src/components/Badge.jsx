import React from 'react';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, className, variant = 'accent' }) => {
  const variants = {
    accent: 'bg-accent text-white',
    new: 'bg-black text-white',
    sale: 'bg-accent text-white',
    outline: 'border border-black text-black bg-transparent',
  };

  return (
    <span
      className={twMerge(
        'px-2 py-1 text-[10px] font-display uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
