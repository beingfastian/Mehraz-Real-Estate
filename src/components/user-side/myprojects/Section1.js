"use client";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import Options from "./Options";
import { MdPhone } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import UButton from "../UButton";
import Backbutton from "@/components/Backbutton";
import Link from "next/link";

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
  return (
    <div className="min-h-[50%] h-auto">
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
      <hr className="my-4 w-1/2 mx-auto sm:w-full sm:my-2" />
      {/* constainer 2 start  */}
      <div className="container-2 flex justify-around items-center">
        <div>
          <div className="sm:text-xs">MEET THE TEAM</div>
          <UButton
            className="w-full flex flex-col items-center justify-center text-[#2F2F2F] py-0.5 px-4"
            color="solid-gold"
            text={
              <>
                <span className="flex items-center justify-center mt-2 gap-1 text-lg xl:text-xs font-bold">
                  <IoChatboxOutline />
                  <span>CHAT</span>
                </span>
                {/* <span className="uppercase text-xs italic">
                  purchase service, pkr 10,000
                </span> */}
              </>
            }></UButton>
          {/* <button className="flex justify-center items-center">
            <IoChatboxOutline /> CHAT
          </button> */}
        </div>
        <div>
          <div className="sm:text-xs">SELECT. ESTIMATE START</div>
          <Link href={`/designs/payment`}>
            <UButton
              className="w-full flex flex-col items-center justify-center text-[#2F2F2F] py-0.5 px-4"
              color="solid-gold"
              text={
                <>
                  <span className="flex items-center justify-center mt-2 gap-1 text-lg xl:text-xs font-bold">
                    <MdOutlinePayment />
                    <span>SELECT & PAY</span>
                  </span>
                  {/* <span className="uppercase text-xs italic">
                  purchase service, pkr 10,000
                  </span> */}
                </>
              }></UButton>
          </Link>
          {/* <button className="flex justify-center items-center"> */}
          {/* <MdOutlinePayment /> SELECT & PAY */}
          {/* </button> */}
        </div>
      </div>
      {/* constainer 2 start  */}
    </div>
  );
};

export default Section1;
