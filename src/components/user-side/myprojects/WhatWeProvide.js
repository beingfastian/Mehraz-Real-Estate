"use client";

import Image from "next/image";
import localBackgroundImage from "@/assets/images/bg.jpg";
import dummyImage from "@/assets/images/bg.jpg";
import useRPS from "@/hooks/useRPS";

const WhatWeProvide = ({ setSteps }) => {
  const designItems = [
    { title: "ARCHITECTURE DESIGN" },
    { title: "INTERIOR DESIGN" },
    { title: "LANDSCAPE DESIGN" },
    { title: "STRUCTURAL DESIGN" },
    { title: "MEP DESIGN" },
  ];

  const realizationItems = [
    { title: "CONSTRUCTION" },
    { title: "REAL ESTATE" },
    { title: "MATERIALS SUPPLY" },
  ];

  const { router, pathname, searchParams } = useRPS();
  const submitHandler = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 3);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center px-4 py-10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/70 before:to-black/40 before:z-0"
      style={{ backgroundImage: `url(${localBackgroundImage.src})` }}>
      <div className="relative z-10">
        <header className="max-w-[30%] mx-auto text-center text-white text-xl md:text-2xl font-semibold mb-10 py-1 px-4 uppercase bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full">
          PROVIDING ALL YOU NEED & MORE
        </header>

        {/* DESIGN Block */}
        <h2 className="text-white text-lg md:text-xl font-medium mb-[-15px] text-center">
          DESIGN
        </h2>
        <div className="rounded-2xl border border-gray-400 bg-white/10 p-4 flex flex-wrap justify-center gap-8 mb-10 max-w-[80%] mx-auto">
          {designItems.map((item, index) => (
            <div key={index} onClick={submitHandler} className="w-[30%]">
              <div className="relative cursor-pointer overflow-hidden rounded-xl border border-white">
                <Image
                  src={dummyImage}
                  alt={item.title}
                  width={200}
                  height={120}
                  className="w-full h-28 object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-1/3 z-10 text-white text-center font-semibold text-sm py-2">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* REALIZATION Block */}
        <h2 className="text-white text-lg md:text-xl font-medium mb-[-15px] text-center">
          REALIZATION
        </h2>
        <div className="rounded-2xl border border-gray-400 bg-white/10 p-4 flex flex-wrap justify-center gap-8 max-w-[80%] mx-auto">
          {realizationItems.map((item, index) => (
            <div key={index} onClick={submitHandler} className="w-[30%]">
              <div className="relative cursor-pointer overflow-hidden rounded-xl border border-white">
                <Image
                  src={dummyImage}
                  alt={item.title}
                  width={200}
                  height={100}
                  className="w-full h-24 object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-1/3 z-10 text-white text-center font-semibold text-sm py-2">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeProvide;
