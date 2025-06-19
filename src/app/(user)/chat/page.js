"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMessageSquare, FiCalendar, FiSend } from "react-icons/fi";

export default function LandingSection() {
  return (
    <div className="flex min-h-screen h-screen max-h-screen font-sans overflow-hidden">
      {/* Left Side */}
      <div className="flex-1 bg-white flex flex-col justify-start items-start px-6 sm:px-12 py-12 text-gray-800 w-full h-full">
        <p className="uppercase text-sm tracking-wide text-gray-500 mb-4 w-full">
          Explore . Meet Your Needs . Live Better
        </p>

        <h1 className="text-5xl sm:text-6xl font-medium text-left leading-tight mb-6 w-full">
          Building the <br />
          <span className="text-blue-900 font-black">NEW PAKISTAN</span>
        </h1>

        <div className="bg-[#caa64d] px-8 py-4 rounded-sm text-white text-xl font-semibold shadow-sm mb-6 w-full">
          <span className="text-white font-bold">SAVE</span>
          <span className="text-white"> TIME . EFFORT . MONEY</span>
        </div>

        <p className="uppercase text-xs tracking-[0.25em] text-gray-600 mb-2 w-full">
          Land . Design . Materials . Construction
        </p>

        <p className="text-xs text-gray-400 mb-8 w-full">
          FOR ALL LAND AUTHORITIES DHA, LDA, FDA, CDA, KDA & MORE
        </p>

        <div className="flex items-center gap-6 mb-2 w-full">
          <button className="bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-gray-900 font-semibold px-8 py-3 text-base rounded shadow w-full sm:w-auto">
            WHY MEHRAZ ?
          </button>

          <p className="text-sm sm:text-base text-green-800 font-medium w-full sm:w-auto">
            BUILD <span className="font-bold">BETTER</span> .
            <br className="sm:hidden" /> BUILD{" "}
            <span className="font-bold">SUSTAINABLE</span> .
          </p>
        </div>

        <div className="w-full h-[180px] rounded overflow-hidden mt-0">
          <Image
            src="/images/user-side/renovative.png"
            alt="Design Preview"
            width={360}
            height={180}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-gray-50 h-full flex flex-col border-l border-gray-200 max-h-screen">
        {/* Chat header with icon */}
        <div className="bg-white p-4 border-b border-gray-200 flex items-center">
          <FiMessageSquare className="text-gray-600 mr-2" size={20} />
          <h2 className="text-lg font-medium text-gray-800">CHAT</h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-2 overflow-y-auto min-h-[580px] max-h-[580px]">
          <p className="text-gray-400 text-sm font-medium">END CHAT</p>
        </div>

        {/* Action buttons and input */}
        <div className="bg-white p-4 border-t border-gray-200">
          {/* Schedule call button with calendar icon */}
          <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md mb-4 transition-colors">
            <FiCalendar size={18} />
            <span>SCHEDULE A CALL</span>
          </button>

          {/* Message input with send icon */}
          <div className="relative">
            <input
              type="text"
              placeholder="TYPE HERE..."
              className="w-full border border-gray-300 rounded-md py-2.5 px-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
