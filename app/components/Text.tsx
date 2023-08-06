import React, { ElementType } from 'react';

type Variant = 'h1' | 'h2' | 'body' | 'error';

interface Props {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  body: 'p',
  error: 'span',
};

const sizes: Record<Variant, string> = {
  h1: 'font-semibold text-7xl md:text-9xl tracking-wide',
  h2: 'font-semibold text-5xl md:text-6xl tracking-wide',
  body: 'text-xl leading-10 tracking-wide',
  error: 'text-sm text-yellow-300 font-normal block tracking-wide',
};

export default function Text({
  variant = 'body',
  children,
  className,
  as,
}: Props) {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];
  return (
    <Tag className={[sizeClasses, className].join(' ').trim()}>{children}</Tag>
  );
}
