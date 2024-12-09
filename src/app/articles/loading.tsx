import Image from 'next/image';

export default function Loading() {
  return (
    <div className="loading-container">
      <Image
        src="/images/loading.svg"
        alt="Loading..."
        width={50}
        height={50}
        priority
      />
    </div>
  );
} 