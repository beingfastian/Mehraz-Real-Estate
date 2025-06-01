'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { industrialImage } from '@/assets';
import { ChevronLeft } from 'lucide-react';

const FinalHomeSelection = () => {
  const [budget, setBudget] = useState(400);
  const formatBudget = (value) => `PKR ${value / 100} Crore`;

  return (
    <div className="relative w-full h-screen overflow-auto sm:overflow-hidden font-sans">
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
      <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex items-center justify-center px-2 sm:px-4">
        <div className="w-full max-w-5xl py-8 flex flex-col items-center text-center rounded-lg relative">
          
          {/* Back Button */}
          <button className="absolute top-4 left-4 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shadow bg-white">
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>

          {/* Heading */}
          <h2 className="text-lg sm:text-2xl font-bold tracking-wide mt-10 sm:mt-6 mb-1">SET YOUR BUDGET</h2>
          <p className="text-gray-600 text-xs sm:text-sm mb-6 uppercase tracking-wider">
            SEE HOMES OF UTMOST COMFORT & EXPERIENCE PER YOUR BUDGET
          </p>

          {/* Budget Input Field */}
          <div className="flex items-center gap-2 mb-3 border rounded-full px-3 py-1 shadow bg-white w-10/12 max-w-xs sm:max-w-sm">
            <input
              type="number"
              placeholder="Enter.."
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full text-center outline-none text-sm sm:text-base"
            />
            <select className="text-sm font-semibold outline-none bg-transparent">
              <option>PKR</option>
            </select>
          </div>

          {/* OR Separator */}
          <div className="flex items-center w-full justify-center gap-4 mb-4">
            <div className="h-px bg-gray-300 w-1/4"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-px bg-gray-300 w-1/4"></div>
          </div>

          {/* Slider Section */}
          <div className="w-full max-w-2xl px-2 sm:px-4 mb-6">
            <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 px-1 sm:px-2">
              <span>PKR 100 Lakh</span>
              <span>PKR 1000 Lakh</span>
            </div>

            {/* Slider */}
            <div className="relative mt-3">
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-yellow-500"
              />

              {/* Tooltip above slider */}
              <div
                className="absolute -top-7 bg-black text-white text-xs px-2 py-1 rounded-full shadow whitespace-nowrap"
                style={{ left: `calc(${((budget - 100) / 900) * 100}% - 40px)` }}
              >
                PKR {budget} LAKH
              </div>

              {/* Custom Thumb */}
              <div
                className="absolute top-[6px]"
                style={{
                  left: `calc(${((budget - 100) / 900) * 100}% - 10px)`,
                }}
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rotate-45 transform origin-center rounded-sm"></div>
              </div>
            </div>

            {/* Slider values */}
            <div className="flex justify-between text-[10px] sm:text-xs text-gray-600 px-2 mt-1">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((val) => (
                <span key={val}>{val}</span>
              ))}
            </div>

            <p className="text-[10px] sm:text-xs text-center text-gray-400 mt-2">
              ALL FIGURES ARE IN LAKHS , 1 LAKH = 100,000
            </p>
          </div>

          {/* Budget Summary */}
          <div className="bg-white text-black font-semibold text-sm sm:text-base px-6 py-2 rounded-full border shadow mb-4">
            MY BUDGET &nbsp; {formatBudget(budget)}
          </div>

          {/* Next Button */}
          <button className="bg-black text-white font-bold text-sm sm:text-base px-8 py-2 rounded-md shadow hover:bg-gray-800 transition-all">
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalHomeSelection;
