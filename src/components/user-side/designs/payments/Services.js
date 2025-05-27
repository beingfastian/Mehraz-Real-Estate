"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiCodesandboxLogoBold } from "react-icons/pi";
import { GiBrickWall } from "react-icons/gi";
import DesignIcon from "./DesignIcon";
import ConstructionIcon from "./ConstructionIcon";
import MeterialsIcon from "./MeterialsIcon";
import FurnitureIcon from "./FurnitureIcon";

const Services = ({ service1, setService1 }) => {
  return (
    <div className="block px-4 py-3 bg-white border border-gray-200 rounded-lg shado dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-[100%]  h-[30vh] min-h-[300px] md:h-[auto]  md:min-h-[auto]">
      <div className="flex md:justify-center">
        <span>AVAILED SERVICES </span>
        <span className="border border-black flex h-[20px] w-[20px] rounded-full  justify-center items-center ">
          <FaCheck className=" text-black" />
        </span>
      </div>
      <div className="flex flex-col w-[100%] md:flex-row">
        {service1.length > 0 &&
          service1.map((value, index) => {
            return (
              <React.Fragment key={index}>
                <div className="flex items-center w-[100%] bg-[#FFEBD2] px-1 py-1 rounded-full text-xs md:justify-center">
                  <span className="flex items-center">
                    <span className="border border-black flex h-[25px] w-[25px] rounded-full  justify-center items-center bg-white cursor-pointer">
                      <FaCheck className=" text-black text-xl m-1" />
                    </span>
                    <span className="mx-1">{value?.icon}</span>
                    {/* <PiCodesandboxLogoBold className=" mx-2 text-2xl" /> */}
                  </span>
                  <span className=" md:hidden">{value?.text}</span>
                </div>
                <hr className="my-2" />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default Services;
