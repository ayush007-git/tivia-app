// src/components/button.jsx
import React from 'react';

const Button = ({ children, className, variant = 'default', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-lg transition-colors duration-200';
  const variantClasses = {
    default: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    outline: 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export { Button };
