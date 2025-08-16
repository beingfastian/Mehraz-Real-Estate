"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const Card = ({ data, setStep, hightcustomdetail, setHighCustomDetail }) => {
  const router = useRouter();

  function categoryselected(category) {
    router.push(`?category=${category}`);
    setStep(prev => prev + 1);
    setHighCustomDetail(prev => {
      return { ...prev, category: category };
    });
  }
  return (
    <div className=" w-[270px] h-[320px] sm:w-[150px] sm:h-[175px] flex justify-center items-center">
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => categoryselected(data?.URL)}>
        <Image
          src={data?.imagesrc}
          alt="Background"
          fill
          className="w-full h-full object-cover !relative rounded-[20px]"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 rounded-[20px]"></div>

        {/* Content on Top of Image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-xl  sm:text-base mb-4">{data?.text}</h1>
          <p className="text-lg md:text-2xl text-center"></p>
        </div>
      </div>
      {/* card content ends  */}
    </div>
  );
};

export default Card;
