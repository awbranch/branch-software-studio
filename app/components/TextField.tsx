import React from 'react';
import Text from '@/components/Text';
import classNames from 'classnames';

export const fieldClasses =
  'block w-full text-white/70 bg-transparent px-4 py-3 border border-white/20 outline-none focus:ring-1 focus:ring-primary';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function TextField({ error, className, ...props }: Props) {
  return (
    <div>
      <input className={classNames(fieldClasses, className)} {...props} />
      {error && (
        <Text variant="error" className="mt-2 px-4">
          {error}
        </Text>
      )}
    </div>
  );
}
