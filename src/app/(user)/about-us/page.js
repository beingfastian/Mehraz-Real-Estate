'use client'

import { useState } from "react";
import Image from "next/image";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { Backbutton } from "@/components";

export default function AboutMehraz() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/user-side/aboutUs.png",
    "/images/user-side/industrial.png",
    "/images/user-side/commercial.png",
    "/images/user-side/renovative.png",
    "/images/user-side/commercial.png",
    
  ];

  const affiliations = Array(4).fill("CLIMATE FINANCE PK"); // Mock affiliations
  const services = ["ARCHITECTURE & PLANNING", "INTERIOR DESIGN", "CONSTRUCTION SERVICES"];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="relative mflg:px-5 mfxl:container mx-auto py-8">
       
      {/* <Link href="/" className="absolute left-4  ">
        <AiOutlineLeft className="text-2xl font-bold text-gray-500 cursor-pointer bg-white rounded-full h-14 w-14 flex items-center justify-center p-2 border-2 border-gray-300 hover:border-dashed" onClick={nextImage} />
      </Link> */}
      {/* <Link href="/" className="absolute left-4 -top-[5px]">
      <Backbutton />
      </Link> */}

      <h1 className="text-4xl text-gray-800 mb-4 text-center">ABOUT <strong>MEHRAZ</strong></h1>
      
      <div className="border-b-2 w-full border-gray-300 pb-4">
        <div className="flex mfxs:flex-col-reverse gap-y-8 mflg:flex-row mflg:gap-x-8 mfxs:items-start mflg:justify-between w-full pt-10 px-3 sm:px-5">
          {/* Image Section */}
          <div className="mfxs:w-full mflg:w-[45%]">
            <Image
              src={images[currentImageIndex]}
              alt="Building"
              width={100}
              height={100}
              className="w-full h-[500px] object-cover rounded-lg"
            />

            {/* Thumbnails */}
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide space-x-4 mt-6 relative">
              <div className="flex space-x-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg cursor-pointer border-2 overflow-hidden ${
                      index === currentImageIndex ? "border-red-500" : "border-gray-300"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={img}
                      alt="Thumbnail"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-shrink-0 flex items-center ml-4">
                <AiOutlineRight 
                  className="text-2xl font-bold text-gray-500 cursor-pointer bg-white rounded-full h-14 w-14 flex items-center justify-center p-2 border-2 border-gray-300 hover:border-dashed" 
                  onClick={nextImage}
                />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="mfxs:w-full mflg:w-[45%] mt-8 mfxs:mt-0 mflg:mt-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              LEADING PAKISTAN TOWARDS A BETTER FUTURE
            </h1>
            <p className="text-gray-600 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      {/* Affiliations and Services Container */}
      <div className="flex mfxs:flex-col-reverse mflg:flex-row mflg:gap-x-8 mfxs:items-start mflg:justify-between w-full pt-10 px-3 sm:px-5 gap-y-8">
        {/* Affiliations */}
        <div className="w-full mflg:w-[45%] relative">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 uppercase">Affiliations ({affiliations.length})</h3>
          <div className="flex justify-start items-center gap-4 relative">
            {affiliations.map((affiliation, index) => (
              <div
                key={index}
                className="flex flex-col cursor-pointer items-center justify- px-3"
              >
                <Image
                  src="/images/climate.png"
                  alt={affiliation}
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <p className="text-sm font-medium text-gray-700 text-center mt-2">Climate <br /> Finance PK</p>
              </div>
            ))}
            <div className="relative">
              <AiOutlineRight className="text-2xl font-bold text-gray-500 cursor-pointer bg-white rounded-full h-14 w-14 flex items-center justify-center p-2 border-2 border-gray-300 hover:border-dashed" onClick={nextImage} />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="w-full mflg:w-[45%] relative">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 uppercase">Services</h3>
          <div className="flex justify-between items-center gap-4 relative">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative h-[150px] w-[30%] rounded-lg overflow-hidden group"
              >
                <Image
                  src="/images/user-side/renovative.png"
                  alt={service}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300">
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-sm sm:text-base font-semibold text-white text-center px-2">{service}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="relative ">
              <AiOutlineRight className="text-2xl font-bold text-gray-500 cursor-pointer bg-white rounded-full h-14 w-14 flex items-center justify-center p-2 border-2 border-gray-300 hover:border-dashed" onClick={nextImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

