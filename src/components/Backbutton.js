import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

const Backbutton = () => {
  return (
    <div className="bg-[#EFEFEF] p-3 xl:p-3 mx-0 w-[55px] h-[55px] sm:h-[40px] sm:w-[40px] flex justify-center items-center rounded-full shadow-btn sm:top-14 sm:left-1 sm:z-10 my-5 md:left-1 md:z-10 cursor-pointer">
      <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
    </div>
  );
};

export default Backbutton;
