"use client";

import { fastHomesIcon } from "@/assets";
import { industrialImage } from "@/assets";
import {
  FastHomesBoxesElem,
  FastHomesBoxesElemMob,
  FastHomesLink,
} from "@/components";
import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HomeStyle = () => {
  const containerRef = useRef(null); // ✅ Moved before return

  const cards = [1, 2, 3];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="relative w-full max-w-5xl flex items-center">
        {/* Left Arrow */}
        <button
          className="absolute left-0 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
          onClick={() => {
            containerRef.current?.scrollBy({ left: -350, behavior: "smooth" });
          }}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>

        {/* Cards Container */}
        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-auto scroll-smooth px-12 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {cards.map((_, idx) => (
            <div
                key={idx}
                className="max-w-sm min-w-[320px] h-[500px] bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 scroll-snap-align-start"
            >

              {/* Image */}
         <Image
            src={industrialImage}
            width={0}
            height={0}
            sizes="100vw"
            alt="Fast Homes Icon"
            className="w-full h-1/4 object-cover"
            />



              {/* Content */}
              <div className="p-4">
                {/* Header Row */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase">
                    Project Details
                  </h3>
                  <a href="#" className="text-xs text-gray-500 underline">
                    See More
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-snug line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam.
                </p>

                {/* Badges */}
                <div className="flex gap-2 mt-3">
                  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                    AREA
                  </span>
                  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                    FAMILY UNIT
                  </span>
                </div>

                {/* Pricing Rows */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between border rounded-md p-2">
                    <span className="text-gray-600 font-medium">
                      GET DESIGN<sup className="text-[10px] ml-0.5">ONLY</sup>
                    </span>
                    <span className="font-bold text-gray-800">PKR 10,000</span>
                  </div>
                  <div className="flex justify-between border rounded-md p-2">
                    <span className="text-gray-600 font-medium">BUILD DESIGN</span>
                    <span className="font-bold text-gray-800">PKR 20,000,000</span>
                  </div>
                </div>

                {/* Bookmark and Details */}
                <div className="flex justify-between items-center mt-4">
                  <button className="bg-yellow-600 text-white w-full py-2 text-sm font-semibold rounded-md hover:bg-yellow-700 transition">
                    SEE DETAILS
                  </button>
                </div>

                {/* Select Button */}
                <div className="mt-2 text-center">
                  <button className="flex items-center justify-center w-full text-white bg-yellow-600 py-2 rounded-md font-semibold text-sm hover:bg-yellow-700 transition">
                    ✓ GET DESIGNED
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1">
                    LET'S REALIZE THIS FOR MY HOME
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
          onClick={() => {
            containerRef.current?.scrollBy({ left: 350, behavior: "smooth" });
          }}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default HomeStyle;
