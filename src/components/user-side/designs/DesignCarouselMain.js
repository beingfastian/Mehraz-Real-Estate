"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { auth } from "@/Firebase/firebase";

const DesignCarouselMain = ({ children, slidesCount = 1, className = "" }) => {
  const sliderRef = useRef(null);

  const CustomPrevArrow = () => (
    <button className="custom-arrows prev-arrow hidden" />
  );

  const CustomNextArrow = () => (
    <button className="custom-arrows next-arrow hidden" />
  );

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const sliderSettings = {
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dots: false,
    infinite: true,

    slidesToShow: 1,

    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Mobile devices
        settings: {
          autoplay: true, // Ensure autoplay on mobile
          autoplaySpeed: 3000, // Adjust autoplay speed if needed
        },
      },
      {
        breakpoint: 1024, // Tablet and larger screens
        settings: {
          autoplay: false, // Disable autoplay for tablets and up
        },
      },
    ],
  };
  return (
    <>
      <div className={`w-full relative flex-center ${className}`}>
        <div className={`relative w-[90%]`}>
          {slidesCount > 1 ? (
            <Slider {...sliderSettings} ref={sliderRef}>
              {children}
            </Slider>
          ) : (
            <div>{children}</div>
          )}
        </div>
        {slidesCount > 1 && (
          <>
            <button
              onClick={previousSlide}
              className="block sm:hidden absolute top-1/2 -translate-y-1/2 left-0 bg-[#EFEFEF]/60 p-3 rounded-full hover:bg-[#EFEFEF]/90">
              <FaChevronLeft
                className="text-[#2f2f2f]"
                size={24}
                stroke="#2F2F2F"
                strokeWidth={20}
              />
            </button>
            <button
              onClick={nextSlide}
              className="block sm:hidden absolute top-1/2 -translate-y-1/2 right-0 bg-[#EFEFEF]/60 p-3 rounded-full hover:bg-[#EFEFEF]/90">
              <FaChevronRight
                className="text-[#2f2f2f]"
                size={24}
                stroke="#2F2F2F"
                strokeWidth={20}
              />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default DesignCarouselMain;
