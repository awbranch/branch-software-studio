import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className="relative" style={{ width: 1024, height: 1024 }}>
        <Image
          src={'/branchhead.jpg'}
          style={{ objectFit: 'cover' }}
          fill={true}
          alt="branchhead"
        />
        <img
          src={'/logo-text.svg'}
          width={1024}
          style={{ position: 'absolute', bottom: 20 }}
        />
      </div>
      <h3>
        Using innovation, design, and technology to create products that
        positively impact people&apos;s lives.
      </h3>
    </main>
  );
}
