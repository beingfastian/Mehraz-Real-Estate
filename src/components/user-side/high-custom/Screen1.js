"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  buildingicon,
  buyMaterialLightIcon,
} from "@/assets";
import Image from "next/image";
import { UserHeader } from "@/components";

import localBackgroundImage from "@/assets/images/bg.jpg";

const Screen1 = ({ setStep, heading, subheading }) => {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setStep]);

  return (
    <div className="flex flex-grow h-full absolute top-0 left-0 w-full">
      {/* ✅ Header */}
      <div className="w-full fixed top-0 left-0 z-20">
        <UserHeader />
      </div>

      {/* ✅ Background + Gradient like Screen2 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
                style={{
                  backgroundImage: `url(${localBackgroundImage.src})`
                }}
        className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3] flex-grow h-full"
      >
        <div className="h-full w-full flex justify-center items-center flex-col">
          <div className="w-[50%] md:w-[80%] sm:w-[100%] flex justify-center items-center flex-col">
            {/* Icon/Image */}
            <div>
              {pathname === "/high-custom" && (
                <svg
                  width="154"
                  height="158"
                  className="relative left-6"
                  viewBox="0 0 154 158"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* your SVG goes here */}
                </svg>
              )}
              {pathname === "/buy-property" && (
                <Image src={buildingicon} alt="building" priority />
              )}
              {pathname === "/buy-materials" && (
                <Image
                  src={buyMaterialLightIcon}
                  alt="building"
                  priority
                  height={100}
                  width={100}
                />
              )}
            </div>

            {/* Heading */}
            <div className="text-white mt-4 text-5xl sm:text-2xl border-b border-white text-center">
              {heading.normaltext} <b>{heading.boldtext}</b>
            </div>

            {/* Subheading */}
            <div
              className={`text-white mt-4 ${
                pathname === "/buy-materials" ? "" : "mt-12"
              }`}
            >
              {subheading.normaltext} <b>{subheading.boldtext}</b>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Screen1;
