"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { SLIDER_IMAGES } from "@/constants";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slideshow = () => {
  return (
    <Swiper
      navigation
      pagination={{ type: "fraction" }}
      autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
      modules={[ Navigation, Pagination, Autoplay ]}
      className="w-full max-h-[600px]"
    >
      {SLIDER_IMAGES.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1900}
              height={749}
              className="block h-full w-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slideshow