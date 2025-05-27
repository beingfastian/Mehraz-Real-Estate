import { rightArrowIcon } from "@/assets";
import Image from "next/image";
import React from "react";


const TermTab = ({ label, onClick }) => {
  return (
    <div class="w-full h-24 md:h-20 sm:h-16 xs:h-12 rounded-full bg-[#f3f3f3] hover:bg-[#f3f3f3]/70 border-[0.5px] border-[#282828]/50 flex justify-between items-center gap-0 sm:gap-2 px-[81px] md:px-10 sm:px-6 xs:px-4 cursor-pointer" onClick={onClick}>
      <p class="text-large-1 bold text-left text-accent-black">{label}</p>
      <div >
        <Image
          src={rightArrowIcon}
          alt="right arrow"
          className="w-[22px] md:w-[18px] sm:w-[14px] xs:w-[10px] h-11 md:h-[36px] sm:h-[28px] xs:h-5 "
        />
      </div>
    </div>
  );
};

export default TermTab;
