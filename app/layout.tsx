import React from 'react';
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'] });

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
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} bg-gray-950 text-white`}>
        <header className="fixed top-0 z-20 w-full">
          <nav className="mx-auto max-w-5xl px-6 py-12">
            <div className="flex items-center justify-between">
              <a href="/" className="text-3xl font-extrabold tracking-widest">
                BRANCH
              </a>
              <a
                href="#contact"
                className="relative py-1.5 before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10"
              >
                <span className="relative text-lg">contact me</span>
              </a>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
