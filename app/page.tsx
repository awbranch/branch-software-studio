import Image from 'next/image';

export default function Home() {
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
        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-60 pt-60">
          <div className="pb-12">
            <h1
              data-rellax-speed="-3"
              data-rellax-xs-speed="0"
              data-rellax-mobile-speed="0"
              className="rellax max-w-lg font-semibold text-8xl md:text-9xl"
            >
              software studio
            </h1>
          </div>
          <div>
            <div className="ml-auto pt-12 md:w-1/2">
              <p className="mb-20 text-xl leading-8 md:leading-10 md:text-2xl">
                Branch Software Studio creates web applications that are simple,
                creative, and human-focused.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
