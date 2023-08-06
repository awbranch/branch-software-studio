import React from 'react';

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const buttonClass =
  'relative py-1.5 before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10';

export default function NavButton({ href, className, children }: Props) {
  return (
    <a href={href} className={[buttonClass, className].join(' ').trim()}>
      {children}
    </a>
  );
}
