"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { type Settings } from 'react-slick';
import Image  from 'next/image';
import { CustomArrowProps } from "react-slick";

function NextArrow(props:CustomArrowProps){
    const {className, style, onClick} = props;
    return <div style={{...style, color: "black", right: "22px",background : "transparent",borderRadius: "50%", padding: "0"}} className={className} onClick={onClick}></div>
}

function PrevArrow(props:CustomArrowProps){
    const {className, style, onClick} = props;
    return <div style={{...style, color: "black", zIndex: "30", left: "1px" ,background : "transparent",borderRadius: "50%", padding: "0"}} className={className} onClick={onClick}></div>
}

function Hero() {
    const settings:Settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    fade: true,
    arrows:true,
    nextArrow: <NextArrow /> ,
    prevArrow: <PrevArrow /> ,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className=''>
      <Slider {...settings}>
        <div>
            <Image className='object-cover rounded-xl w-full' src="/images/banner-1.jpg" alt='image' width={1000} height={1000} /> 
        </div>
        <div>
            <Image className='object-cover rounded-xl w-full' src="/images/banner-2.jpg" alt='image' width={1000} height={1000} /> 
        </div>
      </Slider>
    </div>
  )
}

export default Hero
