import React from 'react';
import { fieldClasses } from './TextField';
import Text from '@/components/Text';
import classNames from 'classnames';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export default function TextArea({ error, className, ...props }: Props) {
  return (
    <div>
      <textarea className={classNames(fieldClasses, className)} {...props} />
      {error && (
        <Text variant="error" className="mt-1.5 px-4">
          {error}
        </Text>
      )}
    </div>
  );
}
