'use client';

import React, { useRef, useEffect } from 'react';
import Rellax from 'rellax';
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    new Rellax('.parallax-sm', {
      speed: 0,
    });

    new Rellax('.parallax-lg', {
      speed: 0,
    });
  }, []);

  const name = 'software studio';
  const tag =
    'Branch Software Studio creates web applications that are simple, creative, and human-focused.';
  return (
    <main className="relative">
      <section id="home" className="relative min-h-screen">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/30 to-black"
        ></div>
        <img
          src="/branchhead.webp"
          className="fixed inset-0 h-full w-full object-cover"
          alt="branch head"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-60 pb-10">
          <div className="pb-12 max-w-lg font-semibold">
            <h1 className="block md:hidden text-8xl">{name}</h1>
            <h1 className="hidden md:block text-9xl parallax-sm">{name}</h1>
          </div>
          <div className="ml-auto mt-12 mb-10 md:w-1/2">
            <h2 className="block md:hidden text-xl leading-8">{tag}</h2>
            <h2 className="hidden md:block leading-10 text-2xl parallax-lg">
              {tag}
            </h2>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="relative z-10 bg-gradient-to-b from-black via-black/80 to-black pt-32 backdrop-blur-3xl "
      >
        <div className="z-10 mx-auto px-6 pt-40 max-w-5xl h-[1000px]">
          <h2 className="font-semibold text-5xl md:text-6xl">
            Let&apos;s work together
          </h2>

          <form action="" className="mx-auto">
            <div>
              <label htmlFor="firstname" className="tracking-wide text-white">
                Fistname
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                placeholder="name"
                className="mt-3 w-full border border-white/20 bg-transparent px-4 py-3 text-white/70 outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="tracking-wide text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your mail address"
                className="mt-3 w-full border border-white/20 bg-transparent px-4 py-3 text-white/70 outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="tracking-wide text-white">
                Your message
              </label>
              <textarea
                name="message"
                id="message"
                cols={30}
                rows={6}
                placeholder="Your message"
                className="mt-3 w-full border border-white/20 bg-transparent px-4 py-3 text-white/70 outline-none focus:ring-1 focus:ring-primary"
              ></textarea>
            </div>
            <button
              type="submit"
              className="group ml-auto flex h-12 w-auto items-center overflow-hidden bg-white px-5 transition-all duration-300 hover:bg-primary"
            >
              <span className="relative uppercase tracking-wide text-black group-hover:text-white">
                {' '}
                Send message{' '}
              </span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
