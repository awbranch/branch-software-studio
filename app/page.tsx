import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <h1>Branch</h1>
      <h2>Software Studio</h2>
      <h3>
        Using innovation, design, and technology to create products that
        positively impact people&apos;s lives.
      </h3>

      <div>
        <Image
          src="/branchhead.jpg"
          alt="Branch Head"
          fill={true}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </main>
  );
}
