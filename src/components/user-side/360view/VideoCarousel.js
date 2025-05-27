"use client";
import { useState } from "react";
import Slider from "react-slick";
import "./Carauls3d.scss";

// import icons
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Image from "next/image";

// import images
// import img1 from "./images/img1.jpg";
// import img2 from "./images/img2.jpg";
// import img3 from "./images/img3.jpg";
// import img4 from "./images/img4.jpg";
const img1 = "https://picsum.photos/800/800/?random";
const img2 = "https://picsum.photos/800/800/?random";
const img3 = "https://picsum.photos/600/800/?random";
const img4 = "https://picsum.photos/800/500/?random";
const images = [img1, img2, img3, img4];

function SampleNextArrow({ onClick }) {
  return (
    <div className="arrow arrow-right" onClick={onClick}>
      <BsArrowRight />
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div className="arrow arrow-left" onClick={onClick}>
      <BsArrowLeft />
    </div>
  );
}
function EmptyArrow({ onClick }) {
  return <div></div>;
}

function VideoCarousel() {
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    beforeChange: (current, next) => setSlideIndex(next),
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (current, next) => (
      <div className={current === slideIndex ? "dot dot-active" : "dot"}></div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          nextArrow: <EmptyArrow />,
          prevArrow: <EmptyArrow />,
        },
      },
    ],
  };

  return (
    <>
      <div className="container">
        {/* <h2 className="header">Modern React Carusel</h2> */}
        <div className="slider">
          <Slider {...settings}>
            {images.map((img, index) => (
              <div
                className={
                  index === slideIndex ? "slide slide-active" : "slide"
                }
                key={index}>
                {/* <iframe
                  // width="560"
                  // height="315"
                  src="https://www.youtube.com/embed/JX5qDzWDF4U?si=xBK509aR2lJXSpdR"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen></iframe>{" "} */}
                <Image src={img} alt="alt" fill  />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm text-white font-medium  focus:outline-none bg-black  border border-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Interior
        </button>
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm text-white font-medium  focus:outline-none bg-black  border border-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Exterior{" "}
        </button>
      </div>
    </>
  );
}

export default VideoCarousel;
