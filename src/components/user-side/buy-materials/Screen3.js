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
import searchIcon from "@/assets/icons/searchIcon.svg"; // your actual path
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
                  backgroundImage: `url(${localBackgroundImage.src})`
                }}
        className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3] flex-grow h-full">
        <div className="h-full w-full flex justify-center items-center flex-col">
          <div
            className={`
              ${pathname == "/buy-materials" ? "h-[100%]" : "h-[50vh]"}
              w-[70%] md:w-[80%] sm:w-[100%] flex justify-center items-center flex-col`}>
            <div className="w-full">
<div className="relative w-full flex justify-center items-center flex-col mt-[-100px]">
  {/* Icon and Heading */}
  <div className="flex w-full items-center justify-center gap-4 ml-[-120px]">
    <Image src={buyMaterialLightIcon} alt="icon" width={120} height={60} />
    <h2 className="text-white text-[32px] font-bold uppercase text-center leading-none opacity-90 font-[Proxima Nova] pl-[25px]">
      TELL US WHAT YOU NEED{" "}
      <span className="font-normal">
        SO WE FIND THE PERFECT FIT FOR YOU
      </span>
    </h2>
  </div>

  {/* Search Bar with Icon */}
              <div
                className="relative flex items-center justify-center mt-[40px]"
                style={{ width: "1024px", height: "60px" }}
              >
                {/* Icon OUTSIDE the input box */}
                <div className="absolute left-[-55px]">
                  <Image
                    src={searchIcon}
                    alt="Search"
                    width={60}
                    height={30}
                    style={{
                      filter:
                        "brightness(50%) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg)",
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="I NEED A-CLASS BRICKS, AN ECO-FRIENDLY PAINT, A CONVERTABLE SOFA"
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-[95%] h-full px-[6px] bg-transparent border-[1.5px] border-white text-white placeholder-white/60 rounded-full text-center"
                  style={{
                    fontWeight: 400,
                    fontSize: "25px",
                    lineHeight: "100%",
                    textAlign: "center",
                  }}
                />
              </div>
  {/* Divider */}
  <div className="w-[50%] flex justify-center items-center mx-auto my-[50px]">
    <div className="w-[40%] h-[1px] bg-white/30"></div>
    <span className="text-white/60 text-[32px] mx-4 my-2">OR</span>
    <div className="w-[40%] h-[1px] bg-white/30"></div>
  </div>

  {/* SELECT Label */}
              <div className="w-full flex justify-center items-center relative">
                <div className="absolute px-4  bg-[#d9d9d9] px-[80px] py-[5px] rounded-[10px]">
                  <span className="text-[#2f2f2f]/90 text-[24px] font-semibold uppercase opacity-65">
                    SELECT
                  </span>
                </div>
              </div>

  {/* Carousel Box */}
  <div className="w-full min-h-36 h-auto border border-white rounded-[50px] flex justify-center items-center px-6 py-4">
    <MaterialCarousel
      selectedMaterial={selectedMaterial}
      setSelectedMaterial={setSelectedMaterial}
    />
  </div>

  {/* GO + SKIP Buttons */}
  <div className="flex justify-center mt-6">
                <button
                  type="button"
                  className="text-black hover:text-white hover:bg-transparent mt-[50px] font-bold border border-white transition-colors duration-300"
                  style={{
                    width: "200px",
                    height: "56px",
                    borderRadius: "4px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 700,
                    fontSize: "26px",
                    lineHeight: "32px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                        position: 'absolute',
                  }}
onClick={() => {
  if (!selectedMaterial && !searchText.trim()) {
    toast.error("Please select a material or enter your requirement");
    return;
  }
  setStep((prev) => prev + 1);
}}
                >
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