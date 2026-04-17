import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-900',
    outline: 'border-2 border-black text-black hover:bg-black hover:text-white',
    accent: 'bg-accent text-white hover:opacity-90',
  };

  return (
    <button
      className={twMerge(
        'px-6 py-3 font-display uppercase text-sm tracking-widest transition-all active:scale-95 disabled:opacity-50',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
