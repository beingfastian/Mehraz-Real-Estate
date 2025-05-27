"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const DesSelStep1StylesModalCarousel = ({
  children,
  className,
  selectedIndex,
}) => {
  const [isSingleChild, setIsSingleChild] = useState(false);
  const sliderRef = useRef(null);

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const CustomPrevArrow = () => (
    <button
      onClick={previousSlide}
      className="absolute w-auto h-auto left-0 -translate-x-[30%] top-[36%] flex z-[1]   justify-center focus:outline-none">
      <span className="bg-[#EFEFEF] bg-opacity-80 p-4 lg:p-3 rounded-full">
        <FaChevronLeft className="text-black w-6 h-auto lg:w-5" size={24} />
      </span>
    </button>
  );

  const CustomNextArrow = () => (
    <button
      onClick={nextSlide}
      className="absolute w-auto h-auto right-0 translate-x-[30%] top-[36%] z-[1] flex justify-center focus:outline-none">
      <span className="bg-[#EFEFEF] bg-opacity-80 p-4 lg:p-3 rounded-full">
        <FaChevronRight className="text-black w-6 h-auto lg:w-5" size={24} />
      </span>
    </button>
  );
  const sliderSettings = {
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    arrows: true,
    dots: true,
    dotsClass: "desSelScreen2StylesModalCarousalDotsContainer",
    infinite: !isSingleChild,
    speed: 500,
    slidesToShow: 4,
    rows: 1,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 2, // Show 2 slides on small screens
          slidesToScroll: 2,
          infinite: !isSingleChild,
          arrows: true,
          dots: true,
          rows: 2,
        },
      },
      {
        breakpoint: 660, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 1, // Show 2 slides on small screens
          slidesToScroll: 1,
          infinite: !isSingleChild,
          arrows: true,
          dots: true,
          rows: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (sliderRef.current && selectedIndex != null) {
      // Use setTimeout to ensure the carousel is mounted
      setTimeout(() => {
        sliderRef.current.slickGoTo(selectedIndex, false); // false for smooth animation
      }, 0);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (sliderRef.current && selectedIndex != null) {
      sliderRef.current.slickGoTo(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <>
      <div className={`w-full relative ${className}`}>
        <div>
          <Slider {...sliderSettings} ref={sliderRef}>
            {children}
          </Slider>
        </div>
        {/* {!isSingleChild && (
          <>
            <button
              onClick={previousSlide}
              className="absolute w-auto h-full left-0 -translate-x-[30%] top-[36%] flex  justify-center focus:outline-none">
              <span className="bg-[#EFEFEF] bg-opacity-80 p-4 lg:p-3 rounded-full">
                <FaChevronLeft
                  className="text-black w-6 h-auto lg:w-5"
                  size={24}
                />
              </span>
            </button>
         
          </>
        )} */}
      </div>
    </>
  );
};

export default DesSelStep1StylesModalCarousel;