'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { industrialImage } from '@/assets'; // Replace with your image import
import { ChevronRight, ChevronLeft } from 'lucide-react';

const FinalHomeSelection = () => {
  const [area, setArea] = useState('1 KANAL');
  const [floors, setFloors] = useState('ONE');
  const [units, setUnits] = useState('ONE');

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
      <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex items-center justify-center">
        <div className="w-full max-w-5xl px-4 py-8 flex flex-col items-center text-center rounded-lg">
          <p className="text-gray-800 text-sm font-semibold">STEP 2/3</p>
          <h2 className="text-xl font-bold mb-6">FINAL HOME SELECTION</h2>

          <p className="text-gray-700 text-sm mb-4 font-medium">
            TELL US HOW YOUR HOME SHOULD BE <span className="font-bold">PLANNED</span><br />
            SO WE FIND PERFECT FIT FOR YOU..
          </p>

          {/* Selection Row */}
          <div className="bg-yellow-100 rounded-full px-6 py-4 flex items-center justify-between w-[70%] shadow-inner mb-6">
            {/* Area */}
            <div className="flex flex-col items-center">
              <label className="text-xs font-bold text-gray-700 mb-1">AREA</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="rounded-full px-4 py-1 text-sm font-semibold bg-white shadow"
              >
                <option>1 KANAL</option>
                <option>10 MARLA</option>
              </select>
            </div>

            <ChevronRight size={20} />

            {/* Floors */}
            <div className="flex flex-col items-center">
              <label className="text-xs font-bold text-gray-700 mb-1">FLOORS</label>
              <select
                value={floors}
                onChange={(e) => setFloors(e.target.value)}
                className="rounded-full px-4 py-1 text-sm font-semibold bg-white shadow"
              >
                <option>ONE</option>
                <option>TWO</option>
              </select>
            </div>

            <ChevronRight size={20} />

            {/* Family Units */}
            <div className="flex flex-col items-center">
              <label className="text-xs font-bold text-gray-700 mb-1">FAMILY UNITS</label>
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="rounded-full px-4 py-1 text-sm font-semibold bg-white shadow"
              >
                <option>ONE</option>
                <option>TWO</option>
                <option>THREE</option>
                <option>FOUR</option>
              </select>
            </div>
          </div>

          {/* Needs Input */}
          <div className="mb-6 w-full max-w-md">
            <input
              type="text"
              placeholder="4 Beds, 2 Floors, 1 Garage ....."
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <p className="text-xs text-gray-500 mt-1">Specific Words Give The Best Results</p>
          </div>

          {/* Set Budget Button */}
          <button className="bg-yellow-400 text-white font-bold px-8 py-2 rounded-md shadow hover:bg-yellow-500 transition-all">
            SET BUDGET
          </button>

          {/* Skip Link */}
          <p className="text-sm text-gray-500 mt-4">
            SKIP?
          </p>

          {/* Chat Hint */}
          <p className="text-xs text-gray-500 mt-1">
            CONFUSED WHAT’S BEST FOR YOU? <span className="font-semibold">‘CHAT WITH US’</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalHomeSelection;
