"use client";

import React from "react";
import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import slide1 from "../../../public/slide1.png";
import slide2 from "../../../public/slide2.webp";
import slide3 from "../../../public/slide3.png";
import slide4 from "../../../public/slide4.png";

function MarketingSlide() {
  const settings: object = {
    items: 4,
    mouseTracking: false,
    autoPlay: true,
    infinite: true,
    animationDuration: 900,
    autoPlayInterval: 2500,
    disableDotsControls: true,
    disableButtonsControls: true,
    disableSlideInfo: true,
    activeIndex: 1,
  };

  return (
    <div className="mt-12">
      <AliceCarousel {...settings}>
        <Image
          src={slide1}
          alt="img"
          className="w-auto h-auto object-contain border border-base-300 rounded-xl"
        />
        <Image
          src={slide2}
          alt="img"
          className="w-auto h-auto object-contain border border-base-300 rounded-xl"
        />
        <Image
          src={slide3}
          alt="img"
          className="w-auto h-auto object-contain border border-base-300 rounded-xl"
        />
        <Image
          src={slide4}
          alt="img"
          className="w-auto h-auto object-contain border border-base-300 rounded-xl"
        />
      </AliceCarousel>
    </div>
  );
}

export default MarketingSlide;
