"use client";
import Link from "next/link";
import React from "react";
import { MdPhone } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
const Options = ({ data, setSteps }) => {
  return (
    <div>
      <div className="mx-auto flex w-full items-center justify-center bg-gray-200">
        <div className="group relative cursor-pointer">
          <div className="flex items-center justify-between space-x-5 bg-white px-6 sm:px-0">
            <div className="menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4 flex items-center justify-center sm:mx-1">
              {data?.icon}
              {/* <MdPhone /> */}
              <span>&nbsp; {data.name}</span>
            </div>
            <span className="!sm:ml-[0px]" style={{ marginLeft: "0px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>

          <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-2 text-gray-800 shadow-xl group-hover:visible">
            {data?.options?.map((value, index) => {
              return (
                <div
                  key={index}
                  className="my-2 b border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2 flex justify-center items-center text-sm"
                  onClick={() => setSteps(prev => prev + index + 1)}>
                  {value.icon}
                  {value?.heading}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
