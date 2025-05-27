import React from "react";
import { card, tiles } from "@/assets";
import Image from "next/image";

const LevelCardDesign = ({
  designLevel,
  handleDesignLevel,
  title,
  containerPadding,
  cardBodyPaddingTop,
  radioBtnPosition,
  lable_1,
  subLable_1,
  lable_2,
  level,
  imgSize,
  imgRounded,
  isPersonalized,
}) => {
  return (
    <div
      className={`w-[298px] md:w-full ${containerPadding} rounded-[15px] bg-white border border-black/10 shadow-btn-shadow f-col md:flex-row md:gap-3 md:justify-between justify-normal items-baseline  md:items-center`}>
      <div
        className={`${imgSize} relative ${imgRounded} cursor-pointer group overflow-hidden`}>
        <div className={`h-full w-full `}>
          <Image
            src={card}
            alt="card"
            className={`h-full w-full ${
              !isPersonalized && "object-cover"
            } group-hover:scale-105 transition-all duration-300`}
          />
        </div>
        {isPersonalized ? (
          <>
            <div className="absolute bottom-0 left-0 w-full h-full bg-black/50 flex-center !rounded-lg flex-col">
              <p class="text-large max-w-[150px] w-full  bold text-center text-[#fff3e4] uppercase">
                {title}
              </p>
            </div>
          </>
        ) : (
          <div className="absolute bottom-0 left-0 w-full h-full bg-black/50 flex-center !rounded-lg flex-col">
            <Image src={tiles} alt="tiles" />

            <p class="text-large font-bold md:font-semibold text-center text-[#fff3e4] -mt-1 uppercase">
              {title}
            </p>
          </div>
        )}
      </div>
      <div className={`f-col w-full ${cardBodyPaddingTop} gap-2 relative`}>
        {/* checkbox start */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-50 ${radioBtnPosition}`}>
          <label className="w-[3.25rem] md:w-[2.5rem] sm:w-[2.25rem] xs:w-[2rem] h-[3.25rem] md:h-[2.5rem] sm:h-[2.25rem] xs:h-[2rem] cursor-pointer rounded-full bg-white border-2 border-black shadow-btn-shadow flex-center">
            <input
              type="radio"
              className="hidden peer"
              value={level}
              checked={designLevel === level}
              name="design-level"
              onChange={handleDesignLevel}
            />
            <div className="tick opacity-0 peer-checked:opacity-100 transition-all duration-300"></div>
          </label>
        </div>
        {/* checkbox end */}

        <div
          className={`unique-home-card-body-label-container ${
            isPersonalized ? "h-10 sm:h-auto" : "label-container-height"
          }`}>
          <p class="text-center leading-none f-col flex-center h-full capitalize">
            <span
              class={`${
                isPersonalized ? "base-text-0" : "normal-text"
              } leading-none text-center text-accent-black`}>
              {lable_1}
            </span>
            {subLable_1 && (
              <span class="text-base md:text-sm leading-none text-center text-[#616161]/80">
                {subLable_1}
              </span>
            )}
          </p>
        </div>
        <div
          className={`unique-home-card-body-label-container ${
            isPersonalized ? "h-10" : "label-container-height"
          }`}>
          {true ? (
            <div className=" text-left">
              <span className=" text-base font-semibold text-left text-black text-line-through">
                RS 10000
              </span>
              <span className=" text-xs font-bold text-left text-black">
                {" "}
              </span>
              <span className=" text-2xl font-medium text-left text-danger-light">
                125,000
              </span>
              <span className=" text-2xl text-left text-black"> PKR</span>
            </div>
          ) : (
            <p class="opacity-80 normal-text leading-none text-center text-[#2f2f2f] capitalize">
              {lable_2}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelCardDesign;
