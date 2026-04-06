"use client";
import Image from "next/image";
import Slider from "react-slick";

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full h-64">
      <Slider {...settings}>
        <div className="relative w-full h-64">
          <Image
            src="/images/banner-1.jpg"
            width={1000}
            className="w-full h-full object-cover"
            height={1000}
            alt="banner-1"
            priority={true}
          />
        </div>
        <div className="relative w-full h-64">
          <Image
            src="/images/banner-2.jpg"
            width={1000}
            height={1000}
            className="w-full h-full "
            priority={true}
            alt="banner-1"
          />
        </div>
      </Slider>
    </div>
  );
}
