"use client";

import { fastHomesIcon } from "@/assets";

import {
  FastHomesBoxesElem,
  FastHomesBoxesElemMob,
  FastHomesLink,
} from "@/components";
import Image from "next/image";

const HomeStyle = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-6xl mx-auto mt-8 p-4">
  {/* Card */}
  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
    <div className="text-gray-800 uppercase text-sm font-semibold">
      <span className="block">Minimalistic</span>
      <span className="text-xs text-gray-400">Medium Cost</span>
    </div>

    <p className="text-gray-600 text-sm mt-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>

    <div className="mt-6">
      <h4 className="text-sm font-bold text-gray-700 mb-2">Rates</h4>
      <div className="flex justify-between items-center border p-2 rounded-md text-sm">
        <span className="text-gray-600">Design</span>
        <span className="font-bold">Rs 10 / SQ FT</span>
      </div>
      <div className="flex justify-between items-center border p-2 rounded-md text-sm mt-2">
        <span className="text-gray-600">Construction</span>
        <span className="font-bold">Rs 20000 / SQ FT</span>
      </div>
    </div>

    <button className="bg-yellow-700 text-white font-semibold uppercase text-sm mt-6 py-2 px-4 rounded-md w-full hover:bg-yellow-800 transition-all">
      ✓ Select Style
    </button>
    <p className="text-xs text-gray-500 text-center mt-2">
      Let's take this style for my home
    </p>
  </div>

  {/* Image */}
  <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-lg">
    <Image
                  src={fastHomesIcon}
                  width={96}
                  height={96}
                  alt="Fast Homes Icon"
                  className="w-24 h-auto xl:w-20 sm:w-14"
                />
  </div>
</div>

  );
};

export default HomeStyle;
