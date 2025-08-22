"use client";

import React from "react";
import { card, tiles } from "@/assets";
import Image from "next/image";

const LevelCardDesign2 = ({
  title,
  lable_1,
  subLable_1,
  containerPadding = "p-2",
  cardBodyPaddingTop = "pt-2",
  imgSize = "w-full h-[180px]",
  imgRounded = "rounded-[15px]",
  isPersonalized = false,
  selected = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-[298px] md:w-full rounded-[15px] ${containerPadding} 
        ${selected ? "bg-blue-100" : "bg-white"} 
        border border-black/10 shadow-btn-shadow f-col md:flex-row md:gap-3 md:justify-between 
        justify-normal items-baseline md:items-center transition-all duration-300`}>
      {/* Image section */}
      <div className={`${imgSize} relative ${imgRounded} overflow-hidden`}>
        <Image
          src={card}
          alt="card"
          className={`h-full w-full ${
            !isPersonalized && "object-cover"
          } group-hover:scale-105 transition-all duration-300`}
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-black/50 flex-center flex-col !rounded-lg">
          {isPersonalized ? (
            <p className="text-large max-w-[150px] w-full font-bold text-center text-[#fff3e4] uppercase">
              {title}
            </p>
          ) : (
            <>
              <Image src={tiles} alt="tiles" />
              <p className="text-large font-bold md:font-semibold text-center text-[#fff3e4] -mt-1 uppercase">
                {title}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Card body */}
      <div
        className={`f-col w-full ${cardBodyPaddingTop} gap-2 mt-2 md:mt-0 relative`}>
        <div className={`unique-home-card-body-label-container h-10 sm:h-auto`}>
          <p className="text-center leading-none f-col flex-center h-full capitalize">
            <span
              className={`leading-none text-center ${
                selected ? "text-accent-black font-bold" : "text-accent-black"
              }`}>
              {lable_1}
            </span>
            {subLable_1 && (
              <span className="text-base md:text-sm leading-none text-center text-[#616161]/80">
                {subLable_1}
              </span>
            )}
          </p>
        </div>

        <div className="unique-home-card-body-label-container h-10">
          <div className="text-left">
            <span className="text-base font-semibold text-left text-black line-through">
              RS 10000
            </span>
            <span className="text-2xl font-medium text-left text-danger-light ml-1">
              125,000
            </span>
            <span className="text-2xl text-left text-black ml-1">PKR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelCardDesign2;
