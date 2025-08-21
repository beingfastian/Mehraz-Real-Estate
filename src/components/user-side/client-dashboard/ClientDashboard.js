"use client";
import React from "react";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { MdPhone } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { FaCube } from "react-icons/fa";
import Backbutton from "@/components/Backbutton";
import { FastHomesLink, Options, UButton } from "@/components";
import Link from "next/link";
import { landingImage } from "@/assets";
import useRPS from "@/hooks/useRPS";
import { useSearchParams } from "next/navigation";

const ClientDashboard = ({ setSteps }) => {
  const teamoptions = {
    name: "Your TEAM",
    icon: <GiTeamIdea className="text-xl" />,
    options: [],
  };

  const { router, pathname, searchParams } = useRPS();
  const submitHandler = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 2);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="min-h-[50%] h-auto m-[30px] sm:m-[25px] max-w-[90%] mx-auto">
      {/* Header Section */}
      <div className="mb-8 sm:mb-2">
        {/* Desktop: All three in a row, Mobile: First two in a row */}
        <div className="flex justify-between items-start mb-4 sm:mb-2">
          {/* Left - My Project Heading */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-black sm:hidden block text-5xl font-regular sm:text-xl mb-2">
                MY PROJECT
              </h1>
              <h1 className="text-black hidden sm:block text-5xl font-regular sm:text-xl mb-2 max-w-[70%]">
                MY PROJECT
              </h1>
              <p className="sm:hidden block py-2 px-2 text-white text-lg font-bold text-center font-bold bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full text-sm font-medium relative z-[1] group overflow-hidden transition-all duration-300 before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300">
                SEE WHAT WE'LL PROVIDE
              </p>
            </div>
          </div>

          {/* Center - Timer */}
          <div className="text-center">
            <div className="text-6xl sm:text-4xl font-bold sm:text-right text-gray-600 mb-2">
              01:03
            </div>
            <div className="flex gap-10 sm:gap-4 pl-4 sm:pl-px text-sm text-gray-600">
              <div>
                <span className="font-medium">DAYS</span>
              </div>
              <div>
                <span className="font-medium">HOURS</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1 tracking-wider">
              L E F T
            </div>
          </div>

          {/* Right - Meet and Your Team (Hidden on mobile) */}
          <div className="sm:hidden flex items-center gap-4">
            <Link
              href="/meet"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#2F2F2F] font-medium hover:bg-gray-300">
              <MdPhone className="text-xl" />
              <span>MEET</span>
            </Link>
            <Options data={teamoptions} setSteps={setSteps} />
          </div>
        </div>

        {/* Mobile: Meet section below */}
        <hr className="w-full hidden sm:flex" />
        <div className="hidden sm:flex justify-center w-full">
          <div className="flex items-center justify-between w-full">
            <Link
              href="/meet"
              className="flex items-center gap-2 px-4 rounded-lg text-[#2F2F2F] font-medium hover:bg-gray-300">
              <MdPhone className="text-xl" />
              <span>MEET</span>
            </Link>
            <Options data={teamoptions} setSteps={setSteps} />
          </div>
        </div>
      </div>

      <hr className="my-4 sm:my-2 h-2 w-full" />

      {/* Three Main Buttons */}
      <div className="flex w-[95%] mx-auto justify-between gap-8 mb-8 sm:mb-2 sm:flex-col sm:gap-4">
        {/* Project Button */}
        <div className="text-center">
          <UButton
            className="w-48 sm:w-full flex flex-col items-center justify-center py-6 px-8"
            color="gold-gray"
            text={
              <>
                <span className="flex items-center justify-center mt-2 gap-1 text-xl xl:text-xs text-[#2F2F2F] text-[26px] px-6">
                  <FaCube />
                  <span>PROJECT</span>
                </span>
              </>
            }
          />
          <div className="text-sm text-gray-500 mt-2">REVIEW YOUR PROJECT</div>
        </div>

        {/* Chat Button */}
        <div className="text-center">
          <UButton
            className="w-48 sm:w-full flex flex-col items-center justify-center py-6 px-8"
            color="gold-gray"
            text={
              <>
                <span className="flex items-center justify-center mt-2 gap-1 text-xl xl:text-xs text-[#2F2F2F] text-[26px] px-6">
                  <IoChatboxOutline />
                  <span>CHAT</span>
                </span>
              </>
            }
          />
          <div className="text-sm text-gray-500 mt-2">
            DISCUSS WITH YOUR TEAM
          </div>
        </div>

        {/* Select & Pay Button */}
        <div className="text-center">
          <UButton
            onClick={submitHandler}
            className="w-48 sm:w-full flex flex-col items-center justify-center py-6 px-8"
            color="gold-gray"
            text={
              <>
                <span className="flex items-center justify-center mt-2 gap-1 text-xl xl:text-xs text-[#2F2F2F] text-[26px] px-6">
                  <MdOutlinePayment />
                  <span>SELECT & PAY</span>
                </span>
              </>
            }
          />
          <div className="text-sm text-gray-500 mt-2">
            ADD SERVICES, REVIEW COSTS, PAY
          </div>
        </div>
      </div>

      <hr className="mt-4 sm:mt-2 h-2 w-full" />

      {/* Project Details and Personalize Section */}
      <div className="flex max-w-[95%] sm:max-w-full sm:mx-px sm:gap-4 sm:mb-4 mx-auto gap-12 mb-8 sm:mb-2 sm:flex-col">
        {/* Left - Project Stages */}
        <div className="flex-1">
          <div className="max-w-full my-6 sm:my-2 mr-8 sm:mr-px rounded-2xl shadow-lg bg-white p-3 gap-4 border-grey-500 border-[1px]">
            <div className="grid grid-cols-3 text-center">
              {/* Stage 1 */}
              <div>
                <div className="text-yellow-400 text-sm sm:text-xs text-left font-bold">
                  STAGE 1
                </div>
                <div className="text-yellow-400 sm:text-xs font-medium text-left">
                  STRUCTURAL DESIGN
                </div>
                <div className="mt-2 border-t sm:text-sm border-gray-200 pt-2 text-left text-yellow-400 font-bold">
                  COMPLETED
                </div>
              </div>

              {/* Stage 2 */}
              <div>
                <div className="text-black font-bold sm:text-xs text-sm text-left">
                  STAGE 2
                </div>
                <div className="text-black font-medium sm:text-xs text-left">
                  STRUCTURAL DESIGN
                </div>
                <div className="mt-2 border-t border-gray-200 sm:text-sm text-left pt-2 text-black font-bold">
                  IN PROGRESS
                </div>
              </div>

              {/* Stage 3 */}
              <div>
                <div className="text-gray-500 text-sm text-left sm:text-xs font-bold">
                  STAGE 3
                </div>
                <div className="text-gray-500 text-left sm:text-xs font-medium">
                  STRUCTURAL DESIGN
                </div>
                <div className="mt-2 border-t border-gray-200 text-left  sm:text-sm pt-2 text-gray-500 font-bold">
                  LEFT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Personalize Your Design */}
        <div className="flex-1">
          <div className="max-w-full py-6 my-6 sm:my-2 ml-8 sm:ml-px rounded-2xl shadow-lg bg-white flex justify-between items-center p-3 gap-4 border-grey-500 border-[1px]">
            {/* Left side text */}
            <div className="max-w-[25%] line-spacing-2">
              <p className="text-gray-800/80 font-[16px] font-bold p-1 sm:text-xs">
                PERSONALIZE YOUR DESIGN
              </p>
            </div>

            <button className="py-2 px-4 uppercase text-lg text-white hover:text-black bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full sm:text-xs relative z-[1] group overflow-hidden transition-all duration-300 before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 group">
              <span>TELL US </span>
              <span className="font-bold">ANY CHANGES YOU NEED</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Image */}
      <div className="w-full h-[200px] sm:h-[150px] rounded-2xl overflow-hidden">
        <Image
          src={landingImage}
          alt="landing image"
          className="w-full h-full object-cover"
          width={800}
          height={300}
        />
      </div>
    </div>
  );
};

export default ClientDashboard;
