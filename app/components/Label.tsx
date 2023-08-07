import React from 'react';
import classNames from 'classnames';

const labelClasses = 'tracking-wide';

export default function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={classNames(labelClasses, className)} {...props}>
      {children}
    </label>
  );
}
