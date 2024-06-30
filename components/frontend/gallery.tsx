"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image'
import React, { useState } from 'react'

const Gallery = ({ dishMedia }: { dishMedia: string[] }) => {
  const [ mainImage, setMainImage ] = useState(dishMedia[ 0 ]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={mainImage}
        alt="dish"
        width={500}
        height={500}
        className="rounded-lg w-96 h-96 shadow-xl object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {dishMedia.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={200}
            width={200}
            alt="dish"
            className={cn("w-20 h-20 rounded-lg object-cover cursor-pointer", mainImage === image ? "border-2 p-1 border-red-500" : "")}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery