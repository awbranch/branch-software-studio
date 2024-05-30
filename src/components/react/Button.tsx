import React, { type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Button({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        "w-full rounded-lg bg-gray-800 px-5 py-2.5 text-center font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 sm:w-auto",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
