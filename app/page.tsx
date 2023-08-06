import React from 'react';
import Image from 'next/image';
import Text from '@/components/Text';
import ServiceButton from '@/components/ServiceButton';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main>
      <section id="home" className="relative min-h-screen">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/30 to-black"
        ></div>
        <Image
          src="/branchhead.webp"
          className="fixed inset-0 h-full w-full object-cover"
          width={1024}
          height={1024}
          priority={true}
          alt="branch software studio"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-60 pb-10">
          <Text variant="h1" className="max-w-lg">
            software studio
          </Text>
          <div className="ml-auto mt-16 md:mt-10 md:w-1/2 ">
            <Text>
              Branch Software Studio creates web applications that are simple,
              creative, and human-focused.
            </Text>
            <div className="mt-3 text-3xl flex gap-4">
              <ServiceButton service="linkedin" />
              <ServiceButton service="github" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="bg-gradient-to-b from-black via-black/80 to-black backdrop-blur-3xl"
      >
        <div className="mx-auto px-6 pt-32 max-w-5xl pb-[500px]">
          <Text variant="h2" className="mb-8">
            Let&apos;s work together
          </Text>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
