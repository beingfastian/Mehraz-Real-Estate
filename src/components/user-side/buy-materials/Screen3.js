"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  buildingicon,
  buyMaterialDarkIcon,
  buyMaterialLightIcon,
} from "@/assets";
import { landpic } from "@/assets";
import MaterialCarousel from "./MaterialCarousel";
const Screen3 = ({ setStep }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-grow h-full absolute top-0 left-0 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3] flex-grow h-full">
        <div className="h-full w-full flex justify-center items-center flex-col">
          <div
            className={`
          ${pathname == "/buy-materials" ? "h-[100%]" : "h-[50vh]"}
           w-[70%] md:w-[80%] sm:w-[100%] flex justify-center items-center  flex-col`}>
            <div className="w-full">
              <div className=" flex justify-around items-center">
                <Image
                  src={buyMaterialLightIcon}
                  priority={true}
                  height={70}
                  width={70}
                  alt="building"
                />
                <span className=" text-white text-xl">
                  <b>TELL US WHAT YOU NEED </b>SO WE FIND THE PERFECT FIT FOR
                  YOU
                </span>
              </div>
              <div className="flex justify-center items-center flex-col">
                <label htmlFor="" className="font-bold text-white text-xl">
                  ENTER
                </label>
                <input
                  type="text"
                  placeholder="I NEED A-CLASS BRICKS, AN ECO-FRIENDLY PAINT, A CONVERTABLE SOFA"
                  className=" bg-transparent border border-white rounded-full text-white w-[70%]"
                />
              </div>
              <div className="w-[50%] flex justify-center items-center mx-auto">
                <div className="w-[40%] h-[1px] bg-white"></div>
                <span className=" text-white text-xl mx-4 my-2">OR</span>

                <div className="w-[40%] h-[1px] bg-white"></div>
              </div>
              {/* carousel of screen */}
              <div className="w-full  min-h-36 h-auto border border-white rounded-3xl flex justify-center  items-center">
                <MaterialCarousel />
                {/* <Image src={landpic} width={100} height={100} alt="land pic" /> */}
              </div>
              <div className="w-full text-center">
                <button
                  type="button"
                  className={`py-2.5 px-8 sm:px-5  mb-2 text-sm text-black  focus:outline-none bg-[white]
                  border border-white hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800 dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-transparent hover:border-white font-bold mx-auto mt-4`}
                  onClick={() => setStep(prev => prev + 1)}>
                  GO
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Screen3;
