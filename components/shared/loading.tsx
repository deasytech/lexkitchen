'use client';

import Image from 'next/image';

export const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image
        src="/images/loading-cart.gif"
        alt="loading cart"
        width={200}
        height={200}
      />
    </div>
  );
};