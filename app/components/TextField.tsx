import React from 'react';
import Text from '@/components/Text';

export const fieldClasses =
  'block w-full text-white/70 bg-transparent px-4 py-3 border border-white/20 outline-none focus:ring-1 focus:ring-primary';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function TextField({ error, className, ...props }: Props) {
  return (
    <div>
      <input
        className={[fieldClasses, className].join(' ').trim()}
        {...props}
      />
      {error && (
        <Text variant="error" className="mt-1.5 px-4">
          {error}
        </Text>
      )}
    </div>
  );
}
