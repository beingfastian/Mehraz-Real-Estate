"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { industrialImage, circleCheckIcon } from "@/assets";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HomeProgramPopup from "./HomeProgramPopup";
import { VideoCarousel } from "@/components";

export default function DesSelStep2Screen4() {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showHomeProgram, setShowHomeProgram] = useState(false);
  const [showVideoTour, setShowVideoTour] = useState(false);

  const images = [
    industrialImage,
    industrialImage,
    industrialImage,
    industrialImage,
    industrialImage,
  ];
  const visibleThumbs = 4;
  const [thumbStart, setThumbStart] = useState(0);

  const handleNextImage = () => {
    if (mainImageIndex < images.length - 1)
      setMainImageIndex(mainImageIndex + 1);
  };

  const handlePrevImage = () => {
    if (mainImageIndex > 0) setMainImageIndex(mainImageIndex - 1);
  };

  const handleThumbScroll = direction => {
    if (direction === "left" && thumbStart > 0) setThumbStart(thumbStart - 1);
    if (direction === "right" && thumbStart + visibleThumbs < images.length)
      setThumbStart(thumbStart + 1);
  };

  const [showFullText, setShowFullText] = useState(false);
  const [materialStart, setMaterialStart] = useState(0);

  return (
    <div className="h-[90%] flex">
      {/* Left Half */}
      <div className="w-[60%] bg-white pt-8 pb-12 px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            PROJECT TITLE
          </h1>

          {/* Paragraph + Show More */}
          <div className="mb-8">
            <div
              className={`text-gray-600 text-sm transition-max-height duration-500 ease-in-out overflow-hidden ${
                showFullText ? "max-h-[1000px]" : "max-h-[140px]"
              }`}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos. Lorem
                ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos. Lorem
                ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            </div>
            <div className="text-left">
              <span
                onClick={() => setShowFullText(!showFullText)}
                className="text-black-600 text-sm cursor-pointer mt-1 inline-block">
                {showFullText ? "Show Less" : "Show More"}
              </span>
            </div>
          </div>

          {/* Other Content: Show only if not expanding text */}
          {!showFullText && (
            <>
              <div className="flex justify-between space-x-4 mb-8">
                <button
                  onClick={() => setShowVideoTour(true)}
                  className="bg-[#FFF3E4] text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm flex items-center gap-2 hover:shadow-md transition">
                  <span>↲</span>
                  <span>360 TOUR</span>
                </button>
                <button
                  onClick={() => setShowHomeProgram(true)}
                  className="bg-[#FFF3E4] text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm hover:shadow-md transition">
                  HOME PROGRAM
                </button>
              </div>

              <button className="w-full uppercase text-white hover:text-black bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full text-xl sm:text-base relative z-[1] group overflow-hidden transition-all duration-300 before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 group mb-8">
                <span className="font-normal">View</span>{" "}
                <span className="font-bold"> Materials</span>
              </button>

              {/* Materials Grid */}
              <div className="flex gap-4 items-center mb-8">
                <div className="grid grid-cols-3 gap-x-6 gap-y-6 flex-grow">
                  {[1, 2, 3].map((item, index) => (
                    <div
                      key={index}
                      className="w-[145px] h-[150px] rounded-[10px] relative border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col bg-white">
                      <div className="w-full h-[85px] rounded-[5px] overflow-hidden relative">
                        <Image
                          src={industrialImage}
                          layout="fill"
                          objectFit="cover"
                          alt="Material"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="mt-1 flex-grow flex flex-col px-1">
                        <h4 className="font-bold text-[15px] uppercase truncate font-[FONTSPRING DEMO - Proxima Nova] text-[#1f1f1f]">
                          NAME
                        </h4>
                        <p className="text-[14px] truncate font-[FONTSPRING DEMO - Proxima Nova] text-[#2f2f2f]">
                          VENDOR
                        </p>
                        <p className="text-[14px] mt-auto rounded-full px-2 py-0.5 truncate font-[Milliard] bg-gray-100 border border-black opacity-80">
                          1500 PKR/CFT
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setMaterialStart(materialStart + 1)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                  <ChevronRight size={20} />
                </button>
              </div>

              <button className="w-full uppercase flex-row flex justify-center font-semibold text-white py-2 hover:text-black bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full text-2xl sm:text-base relative z-[1] group overflow-hidden transition-all duration-300 before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 group">
                <Image
                  src={circleCheckIcon}
                  width={24}
                  height={22}
                  className="w-6 h-auto"
                  alt="circle check"
                />
                <span>Get Designed</span>
              </button>
            </>
          )}
          {showHomeProgram && (
            <HomeProgramPopup onClose={() => setShowHomeProgram(false)} />
          )}
          {showVideoTour && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-black bg-opacity-90 p-4 relative w-full h-full overflow-hidden shadow-lg pt-[20vh]">
                {/* Close Button */}
                <button
                  onClick={() => setShowVideoTour(false)}
                  className="absolute top-4 right-4 bg-gray-100 rounded-full p-1 hover:bg-gray-200 z-50">
                  <X size={18} />
                </button>

                {/* Video Material Component */}
                <VideoCarousel />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Half - Image Gallery */}
      <div className="w-[40%] bg-white pt-8 mr-[150px] flex flex-col items-center justify-start">
        {/* Main Image Viewer with controls */}
        <div className="relative w-full h-[70%] rounded-xl overflow-hidden mb-4 flex items-center justify-center">
          <button
            onClick={handlePrevImage}
            className="absolute left-2 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100">
            <ChevronLeft size={24} />
          </button>

          <Image
            src={images[mainImageIndex]}
            alt="Main House View"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />

          <button
            onClick={handleNextImage}
            className="absolute right-2 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Thumbnails with scroll arrows */}
        <div className="flex items-center w-full gap-2">
          <button
            onClick={() => handleThumbScroll("left")}
            disabled={thumbStart === 0}
            className="p-1 bg-white rounded-full shadow hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>

          <div className="grid grid-cols-4 gap-2 flex-1">
            {images
              .slice(thumbStart, thumbStart + visibleThumbs)
              .map((img, index) => (
                <div
                  key={index + thumbStart}
                  onClick={() => setMainImageIndex(index + thumbStart)}
                  className="relative h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer">
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
          </div>

          <button
            onClick={() => handleThumbScroll("right")}
            disabled={thumbStart + visibleThumbs >= images.length}
            className="p-1 bg-white rounded-full shadow hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
