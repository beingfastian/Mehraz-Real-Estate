import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

const Nextbutton = () => {
  return (
    <div className="bg-[#EFEFEF] p-2 xl:p-1 mx-0 w-[40px] h-[40px] sm:h-[30px] sm:w-[30px] flex justify-center items-center rounded-full shadow-btn sm:top-14 sm:left-1 sm:z-10 md:left-1 md:z-10 cursor-pointer">
      <FaChevronLeft size={24} className="w-6 h-auto sm:w-4 rotate-180  " />
    </div>
  );
};

export default Nextbutton;
