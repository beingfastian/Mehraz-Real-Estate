"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { buildingicon, buyMaterialLightIcon } from "@/assets";
import Image from "next/image";
import { UserHeader } from "@/components";

import localBackgroundImage from "@/assets/images/bg.jpg";

const Screen1 = ({ setStep, heading, subheading }) => {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(prev => prev + 1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setStep]);

  return (
    <div className="flex flex-grow h-full absolute top-0 left-0 w-full">
      {/* ✅ Header */}
      <div className="w-full fixed top-0 left-0 z-20">
        <UserHeader />
      </div>

      {/* ✅ Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: `url(${localBackgroundImage.src})`,
        }}
        className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3] flex-grow h-full">
        <div className="flex flex-col md:flex-row items-center justify-center w-full mt-6 px-4 md:px-0 text-center md:text-left">
          {/* Icon */}
          <div className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] mb-6 md:mb-0 md:mr-8">
            {pathname === "/high-custom" && (
              <svg
                width="200"
                height="200"
                viewBox="0 0 154 158"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                {/* your SVG here */}
              </svg>
            )}
            {pathname === "/buy-property" && (
              <Image
                src={buildingicon}
                alt="building"
                width={200}
                height={200}
                priority
              />
            )}
            {pathname === "/buy-materials" && (
              <Image
                src={buyMaterialLightIcon}
                alt="building"
                width={200}
                height={200}
                priority
              />
            )}
          </div>

          {/* Heading + Subheading */}
          <div className="flex flex-col items-center md:items-start max-w-[90%] md:max-w-[60%]">
            {/* Heading */}
            <div className="flex flex-wrap items-center justify-center md:justify-start uppercase text-[40px] sm:text-[56px] md:text-[72px] lg:text-[96px] leading-[1] tracking-[0] font-proxima space-x-2 text-white">
              <span className="font-[400]">{heading.normaltext}</span>
              <span className="font-[700]">{heading.boldtext}</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/50 mt-4 md:mt-6 mb-2 md:mb-4" />

            {/* Subheading */}
            <div className="text-white/70 text-[18px] sm:text-[24px] md:text-[32px] leading-[1.2] tracking-[0.02em] font-[400] uppercase font-proxima">
              <span className="font-[400]">{subheading.normaltext}</span>
              &nbsp;
              <span className="font-[700]">{subheading.boldtext}</span>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/10 text-[18px] sm:text-[24px] md:text-[28px] lg:text-[36px] leading-[1] tracking-[0] text-center uppercase font-proxima px-4 md:px-0">
          <span className="font-[700]">CUSTOM DESIGNED STORE </span>
          <span className="font-[400]">ONLY THE BEST FOR YOU</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Screen1;
