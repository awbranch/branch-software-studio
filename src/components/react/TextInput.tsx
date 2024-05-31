import React, { type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={"text"}
      className={twMerge(
        "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
        className,
      )}
      {...props}
    />
  );
}

export default TextInput;
