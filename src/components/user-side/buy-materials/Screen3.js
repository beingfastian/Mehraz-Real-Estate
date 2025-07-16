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
import { UserHeader } from "@/components";
import { landpic } from "@/assets";
import MaterialCarousel from "./MaterialCarousel";
import searchIcon from "@/assets/icons/searchIcon.svg";
import localBackgroundImage from "@/assets/images/bg.jpg";
import { toast } from "react-toastify";

const Screen3 = ({ setStep }) => {
  const pathname = usePathname();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-grow h-full absolute top-0 left-0 w-full">
      <div className="w-full fixed top-0 left-0 z-20">
        <UserHeader />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: `url(${localBackgroundImage.src})`,
        }}
        className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3] flex-grow h-full">
        <div className="h-full w-full flex justify-center items-center flex-col py-8 md:py-12 lg:py-20 px-4">
          <div
            className={`${
              pathname == "/buy-materials" ? "min-h-[80vh]" : "h-[50vh]"
            } w-full max-w-[1200px] flex justify-center items-center flex-col`}>
            <div className="w-full">
              <div className="relative w-full flex justify-center items-center flex-col mt-[-40px] sm:mt-[-60px] md:mt-[-100px]">
                {/* Icon and Heading - Always in single row with larger text */}
                <div className="flex w-full items-center justify-center gap-2 sm:gap-4 ml-[-40px] sm:ml-[-60px] lg:ml-[-120px] overflow-x-visible px-4 sm:px-0">
                  <div className="w-[80px] sm:w-[100px] lg:w-[120px] flex-shrink-0">
                    <Image
                      src={buyMaterialLightIcon}
                      alt="icon"
                      width={120}
                      height={60}
                      layout="responsive"
                    />
                  </div>
                  <h2 className="text-white text-[22px] sm:text-[27px] lg:text-[32px] font-bold uppercase text-center whitespace-nowrap opacity-90 font-[Proxima Nova] pl-[15px] sm:pl-[25px]">
                    TELL US WHAT YOU NEED{" "}
                    <span className="font-normal">
                      SO WE FIND THE PERFECT FIT FOR YOU
                    </span>
                  </h2>
                </div>

                {/* Search Bar with Icon - Made responsive */}
                <div className="relative flex items-center justify-center mt-6 sm:mt-8 md:mt-[40px] w-full max-w-[800px] lg:max-w-[1024px] h-[50px] sm:h-[60px]">
                  <div className="absolute left-[-30px] sm:left-[-40px] lg:left-[-55px] w-[40px] sm:w-[50px] lg:w-[60px]">
                    <Image
                      src={searchIcon}
                      alt="Search"
                      width={60}
                      height={30}
                      layout="responsive"
                      style={{
                        filter:
                          "brightness(50%) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg)",
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="I NEED A-CLASS BRICKS, AN ECO-FRIENDLY PAINT, A CONVERTABLE SOFA"
                    onChange={e => setSearchText(e.target.value)}
                    className="w-[90%] sm:w-[90%] h-full px-2 sm:px-[6px] bg-transparent border-[1.5px] border-white text-white placeholder-white/60 rounded-full text-center text-[15px] sm:text-[20px] lg:text-[25px]"
                    style={{
                      fontWeight: 400,
                      lineHeight: "100%",
                    }}
                  />
                </div>

                {/* Divider - Made responsive */}
                <div className="w-full sm:w-[80%] lg:w-[50%] flex justify-center items-center mx-auto my-6 sm:my-8 md:my-[50px]">
                  <div className="w-[30%] sm:w-[35%] lg:w-[40%] h-[1px] bg-white/30"></div>
                  <span className="text-white/60 text-[20px] sm:text-[26px] lg:text-[32px] mx-2 sm:mx-4 my-2">
                    OR
                  </span>
                  <div className="w-[30%] sm:w-[35%] lg:w-[40%] h-[1px] bg-white/30"></div>
                </div>

                {/* SELECT Label - Made responsive */}
                <div className="w-full flex justify-center items-center relative mb-4 sm:mb-6">
                  <div className="px-4 bg-[#d9d9d9] px-[40px] sm:px-[60px] lg:px-[80px] py-[3px] sm:py-[4px] lg:py-[5px] rounded-[8px] sm:rounded-[10px]">
                    <span className="text-[#2f2f2f]/90 text-[18px] sm:text-[20px] lg:text-[24px] font-semibold uppercase opacity-65">
                      SELECT
                    </span>
                  </div>
                </div>

                {/* Carousel Box - Made responsive */}
                <div className="w-full max-w-[1200px] min-h-[150px] sm:min-h-36 h-auto border border-white rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] flex justify-center items-center px-4 sm:px-6 py-3 sm:py-4">
                  <MaterialCarousel
                    selectedMaterial={selectedMaterial}
                    setSelectedMaterial={setSelectedMaterial}
                  />
                </div>

                {/* GO Button - Made responsive */}
                <div className="flex justify-center mt-6 sm:mt-8 w-full">
                  <button
                    type="button"
                    className="text-black hover:text-white hover:bg-transparent font-bold border border-white transition-colors duration-300"
                    style={{
                      width: "160px",
                      height: "48px",
                      borderRadius: "4px",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.4)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "28px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (!selectedMaterial && !searchText.trim()) {
                        toast.error(
                          "Please select a material or enter your requirement",
                        );
                        return;
                      }
                      setStep(prev => prev + 1);
                    }}>
                    GO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Screen3;
