import React from 'react';

export const Tooltip = ({ children, text, position = 'top' }) => {
  const baseStyles = 'absolute z-10 px-3 py-1 text-sm text-white bg-black rounded shadow-lg whitespace-nowrap';
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative z-10 group inline-block cursor-pointer">
      {children}
      <div
        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${baseStyles} ${positions[position]}`}
      >
        {text}
      </div>
    </div>
  );
};
