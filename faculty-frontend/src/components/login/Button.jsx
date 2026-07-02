import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  const baseStyles = "w-full font-bold py-3 px-4 transition-opacity duration-300 hover:opacity-90";
  
  const variants = {
    primary: "bg-black text-white rounded-full", // For Login page
    secondary: "bg-white text-black border-2 border-black", // For Forgot Password page
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;