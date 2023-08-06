import React from 'react';
import './globals.css';
import { Poppins } from 'next/font/google';
import NavButton from '@/components/NavButton';

const poppins = Poppins({
  weight: ['400', '600', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Branch Software Studio',
  description:
    'Product development, branding, UI/UX, web development, mobile development, SEO and marketing.',
};

// TODO: Add OpenGraph and Twitter metadata.
// See https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="bg-gray-950 text-white">
        <header className="fixed top-0 z-20 w-full">
          <nav className="mx-auto max-w-5xl px-6 py-12">
            <div className="flex items-center justify-between">
              <a href="/" className="text-3xl font-extrabold tracking-widest">
                BRANCH
              </a>
              <NavButton href="#contact">contact me</NavButton>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
