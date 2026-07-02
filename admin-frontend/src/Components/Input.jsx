import React from 'react';

const Input = ({ className, ...props }) => (
  <input
    {...props}
    className={`w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-900 
    focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
    transition-all duration-200 ease-in-out placeholder:text-gray-400 ${className || ''}`}
  />
);

export default Input;