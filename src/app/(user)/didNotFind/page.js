'use client';

import React from 'react';
import Image from 'next/image';
import { industrialImage } from "@/assets";
export default function CustomDesignForm() {
  return (
    <div className="h-screen w-full relative">
      {/* Background Image */}
      <Image
        src={industrialImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Overlay with content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-10">
        <div className="w-full max-w-2xl bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-6">DIDN’T FIND WHAT YOU NEED?</h2>

          {/* Go Custom Button */}
          <button className="w-full border border-white text-white text-lg py-3 rounded mb-4 hover:bg-white hover:text-black transition">
            GO CUSTOM
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 text-sm text-gray-300">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          {/* Request New Design */}
          <p className="text-lg font-medium mb-4">Request New Design</p>

          {/* Textarea */}
          <textarea
            className="w-full h-24 p-3 rounded bg-white bg-opacity-80 text-black placeholder-gray-600 mb-4 resize-none"
            placeholder="GIVE YOUR PLOT SIZE, TOTAL FLOORS, FAMILY UNITS REQUIRED OR ANY OTHER REQUIREMENTS..."
          />

          {/* File Upload */}
          <div className="flex items-center justify-between text-sm text-white mb-4">
            <span className="opacity-70">ADD REFERENCE IMAGE (if any)</span>
            <label className="relative cursor-pointer text-blue-200 hover:text-blue-400">
              <span className="underline">attach</span>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </label>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
