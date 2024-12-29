import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
        transition-colors duration-200"
    >
      {children}
    </button>
  );
};