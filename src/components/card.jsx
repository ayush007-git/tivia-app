// src/components/card.jsx
import React from 'react';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`bg-gray-800 rounded-xl shadow-2xl ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Card, CardContent };
