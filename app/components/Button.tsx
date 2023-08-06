import React from 'react';

const defaultClass = 'h-12 px-5 bg-white text-black hover:bg-gray-200';
export default function Button({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={[defaultClass, className].join(' ').trim()} {...props}>
      {children}
    </button>
  );
}
