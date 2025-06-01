'use client';

import React from 'react';
import Image from 'next/image';
import { industrialImage } from '@/assets'; // Replace with your image import

const FinalHomeSelection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={industrialImage}
        alt="Final Home"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
        <div className="relative text-center px-4">
          {/* Step Text */}
          <p className="text-white text-sm sm:text-base md:text-lg font-light mb-1">
            STEP 2/3
          </p>

          {/* Main Heading */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            FINAL HOME SELECTION
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FinalHomeSelection;
