"use client";
import React from "react";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import Options from "./Options";
import { MdPhone } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import UButton from "../UButton";
import Backbutton from "@/components/Backbutton";
import { FastHomesLink } from "@/components";
import Link from "next/link";
import { landingImage } from "@/assets";
import useRPS from "@/hooks/useRPS";

const Section1 = ({ setSteps }) => {
  const meetoptions = {
    name: "MEET",
    icon: <MdPhone className="text-xl" />,
    options: [
      {
        icon: <MdPhone className="text-xl" />,
        heading: "SCHEDULE A CALL",
        link: "/",
      },
      {
        icon: <GiTeamIdea className="text-xl" />,
        heading: "SCHEDULE A MEET",
        link: "/",
      },
    ],
  };
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
    <div className="min-h-[50%] h-auto m-[30px] pt-[40px] max-w-[80%] mx-auto">
      {/* constainer 1 start  */}
      <div className=" flex justify-between flex-wrap">
        <div className="child-container1 flex min-w-[50%] sm:w-[100%] md:w-[100%] md:justify-center md:items-center sm:justify-center sm:items-center justify-between">
          <Backbutton />
          {/* <div className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn sm:top-14 sm:left-1 sm:z-10 mx-1 my-5 md:left-1 md:z-10">
            <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
          </div> */}
          <div>
            <p className=" text-blue-950 text-base">STEP 3/3 OR 2/2</p>
            <h1 className="text-blue-950 text-3xl font-bold sm:text-xl">
              START YOUR PROJECT
            </h1>
            <p className="px-5 sm:text-xs py-1 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-800 w-64 sm:w-fit  text-center text-white">
              SEE WHAT WE'LL PROVIDE
            </p>
          </div>
          <div className="flex items-center"></div>
        </div>
        <div className="child-container2 flex  sm:w-[100%] md:w-[100%] md:justify-center md:items-center sm:justify-center sm:items-center">
          <Options data={meetoptions} setSteps={setSteps} />
          <Options data={teamoptions} setSteps={setSteps} />
        </div>
      </div>
      {/* constainer 1 end  */}
      <hr className="my-4 w-[70%] mx-auto sm:w-full sm:my-2" />
      {/* constainer 2 start  */}
      <div className="container-2 flex justify-around items-center text-[#2F2F2F]">
        <div>
          <div className="sm:text-xs text-center py-2 text-[#2F2F2F]/60 text-[18px] font-medium">
            MEET THE TEAM
          </div>
          <UButton
            className="w-full flex flex-col items-center justify-center py-4 px-12"
            color="gold-gray"
            text={
              <>
                <span className="flex items-center justify-center mt-2 gap-1 text-xl xl:text-xs text-[#2F2F2F] text-[26px] px-6">
                  <IoChatboxOutline />
                  <span>CHAT</span>
                </span>
              </>
            }></UButton>
        </div>
        <div>
          <div className="sm:text-xs text-[#2F2F2F]/60 text-center text-[18px] font-medium py-2">
            SELECT . ESTIMATE . START
          </div>
          <UButton
            onClick={submitHandler}
            className="w-full flex flex-col items-center justify-center text-[#2F2F2F] py-4 px-2 "
            color="gold-gray"
            text={
              <>
                <span className="flex items-center justify-center mt-2 gap-1 text-xl xl:text-xs text-[#2F2F2F] text-[26px] px-6">
                  <MdOutlinePayment />
                  <span>SELECT & PAY</span>
                </span>
              </>
            }></UButton>
        </div>
      </div>
      <hr className="my-4 w-[70%] mx-auto sm:w-full sm:my-2" />
      {/* constainer 2 start  */}
      <div>
        <div className="max-w-[50%] my-6 mx-auto rounded-2xl shadow-lg bg-white flex justify-between items-center p-3 gap-4 border-grey-500 border-[1px]">
          {/* Left side text */}
          <div>
            <p className="text-gray-800/80 font-[16px] font-bold p-1">
              PERSONALIZE YOUR DESIGN
            </p>
          </div>

          <button className="py-1 px-4 uppercase text-white hover:text-black bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full sm:text-base relative z-[1] group overflow-hidden transition-all duration-300 before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 group">
            <span>TELL US </span>
            <span className="font-bold">ANY CHANGES YOU NEED</span>
          </button>
        </div>
        <div className="w-full h-[200px] block mx-auto">
          <Image
            src={landingImage}
            alt="landing image"
            className="w-full h-full"
            width={800}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Section1;
