"use client";
import React, { useCallback } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { useRouter } from "next/navigation";
const BackBtn = () => {
  const router = useRouter();
  const onBack = useCallback(() => {
    router.back();
  }, []);
  return (
    <button
      onClick={onBack}
      className="w-auto bg-[#EFEFEF] p-4 xl:p-3  rounded-full shadow-btn hover:bg-gray-200 transition-all extra-large font-black">
      <IoIosArrowBack />
    </button>
  );
};

export default BackBtn;
