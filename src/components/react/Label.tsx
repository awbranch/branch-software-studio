import React, { type LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Label({
  className,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={twMerge(
        "block font-medium text-gray-900 dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;