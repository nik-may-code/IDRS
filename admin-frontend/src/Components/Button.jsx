import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  isLoading = false,
  variant = 'primary',
  fullWidth = false,
}) => {
  const baseClasses = "relative py-2.5 px-6 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";
  
  const variantClasses = {
    primary: "bg-black hover:bg-gray-900 text-white focus:ring-black",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
    >
      {isLoading && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      <span className={isLoading ? "opacity-0" : ""}>{children}</span>
    </button>
  );
};

export default Button;