import React from 'react';
import { fieldClasses } from './TextField';
import Text from '@/components/Text';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export default function TextArea({ error, className, ...props }: Props) {
  return (
    <div>
      <textarea
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
