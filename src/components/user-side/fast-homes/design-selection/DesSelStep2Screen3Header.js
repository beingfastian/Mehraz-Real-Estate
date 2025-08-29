"use client";
import { FaChevronLeft } from "react-icons/fa6";
import Image from "next/image";
import { jumpToIcon, maximizedViewIcon, minimizedViewIcon } from "@/assets";
import { DesSelStep2Screen3JumpToModal, ULinkButton2 } from "@/components";
import { useState } from "react";
import useRPS from "@/hooks/useRPS";

const DesSelStep2Screen3Header = ({
  designView,
  changeView,
  areas,
  floors,
  familyUnits,
}) => {
  const { router, pathname, searchParams } = useRPS();
  const [searchQuery, setSearchQuery] = useState("");

  const changeViewHandler = () => {
    changeView(designView === "max" ? "min" : "max");
  };

  const moveToScreen2Handler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "2");
    newSearchParams.delete("area");
    newSearchParams.delete("floor");
    newSearchParams.delete("familyUnit");
    newSearchParams.delete("designView");

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  // Modal states and functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Search query:", searchQuery);
  };

  return (
    <>
      <div className="relative flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-10 lg:gap-2">
          <button
            onClick={moveToScreen2Handler}
            className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
            <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
          </button>
          <button
            onClick={toggleModal}
            className="border lg:border-none border-black rounded flex items-center gap-2 py-1 px-8 lg:px-1 lg:py-0.5 xl:px-4 uppercase hover:shadow-btn transition-shadow duration-300 text-lg xl:text-base">
            <Image
              src={jumpToIcon}
              width={32}
              height={32}
              alt="Jump to icon"
              className="w-8 h-auto xl:w-7 lg:w-12"
            />
            <span>jump to</span>
          </button>
        </div>

        {/* Center Section - Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md lg:max-w-xs">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="4 Beds, 2 Floors, 1 Garage..."
                className="w-full px-4 py-2 pr-12 text-sm border border-black rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="text-center text-xs text-gray-400 mt-1">
          SPECIFIC WORDS GIVES THE BEST RESULTS
        </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <button
            onClick={changeViewHandler}
            className="flex items-center gap-2 p-1 text-lg xl:text-base uppercase">
            <Image
              src={designView === "max" ? minimizedViewIcon : maximizedViewIcon}
              width={48}
              height={48}
              alt="Minimized designView icon"
              className="w-12 h-auto xl:w-10"
            />
            <span className="text-[#323232] font-medium">
              {designView === "max" ? "Minimized View" : "Maximized View"}
            </span>
          </button>
          <div className="lg:hidden flex flex-col items-center gap-0.5">
            <span className="text-[#6A6A6A]">Learn More</span>
            <ULinkButton2
              text="all"
              href="/"
              className="ml-auto xl:text-sm text-white bg-[#323232] border border-[#323232] shadow-btn px-12 py-1 transition-colors duration-300 hover:bg-white hover:text-[#323232] hover:shadow-none"
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DesSelStep2Screen3JumpToModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          areas={areas}
          floors={floors}
          familyUnits={familyUnits}
        />
      )}
    </>
  );
};

export default DesSelStep2Screen3Header;