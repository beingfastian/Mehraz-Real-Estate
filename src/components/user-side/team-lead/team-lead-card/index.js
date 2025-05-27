import Image from "next/image";
import React from "react";

const TeamLeadCard = ({ item, key }) => {
  return (
    <div
      key={key}
      className="border-2 rounded-lg border-white flex flex-col  p-3 md:p-2 gap-6 lg:gap-5 md:gap-4 sm:gap-3">
      <div className="flex justify-start items-center  relative gap-5 lg:gap-4 md:gap-3 sm:gap-2">
        <div className="flex-1">
          <Image
            src={item.image}
            alt="team-lead"
            className="max-w-[130px] h-[130px] lg:max-w-[120px] lg:h-[120px] md:max-w-[100px] md:h-[100px] sm:max-w-[80px] sm:h-[80px] z-50 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-start items-start relative gap-1">
          <p className="text-[22px] lg:text-[20px] md:text-[18px] font-bold text-left text-white">
            {item?.name}
          </p>
          <p className="text-lg lg:text-base md:text-sm text-left text-white">
            {item?.type}
          </p>
          <p className="opacity-70 text-sm lg:text-xs md:text-xs text-left text-white">
            {item?.description}
          </p>
        </div>
      </div>
      <div className="flex w-full sm:w-10/12 m-0 sm:m-auto items-center gap-4 lg:gap-3 md:gap-2 sm:gap-1">
        <div className="w-full h-[70px] lg:h-[60px] md:h-[50px] sm:h-[40px] rounded-[5px] bg-white"></div>
        <div className="w-full h-[70px] lg:h-[60px] md:h-[50px] sm:h-[40px] rounded-[5px] bg-white"></div>
        <div className="w-full h-[70px] lg:h-[60px] md:h-[50px] sm:h-[40px] rounded-[5px] bg-white"></div>
      </div>
    </div>
  );
};

export default TeamLeadCard;
