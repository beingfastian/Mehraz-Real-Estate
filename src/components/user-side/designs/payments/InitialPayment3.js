"use client";

import {
  Backbutton,
  SecondCard,
  Services,
  ThirdCard,
  UButton,
} from "@/components";
import {
  DesignIcon,
  ConstructionIcon,
  MeterialsIcon,
  FurnitureIcon,
} from "@/components";
import { fastHomeIcon } from "@/assets";
import { FaCheck } from "react-icons/fa6";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import useRPS from "@/hooks/useRPS";

const InitialPayment3 = ({ setStep }) => {
  const { router, pathname, searchParams } = useRPS();

  const submitHandler = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 6);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const [service1, setService1] = useState([
    { checked: true, icon: <DesignIcon />, text: "DESIGN" },
    { checked: false, icon: <ConstructionIcon />, text: "CONSTRUCTION" },
    { checked: false, icon: <MeterialsIcon />, text: "MATERIALS" },
    { checked: false, icon: <FurnitureIcon />, text: "FURNITURE" },
  ]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full min-h-screen relative">
      <div className="flex-grow">
        <div className="max-w-[90%] w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-start gap-3">
            <Backbutton />
            <div>
              <h1 className="font-bold text-xl">SELECT & PAY</h1>
              <div className="flex items-center">
                <span className="bg-[#0CD350] flex h-[20px] w-[20px] rounded-full justify-center items-center">
                  <FaCheck className="text-white text-xs" />
                </span>
                <span className="text-xs ml-2">Satisfaction Guarantee</span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* Left: Services */}
            <div className="col-span-3 md:col-span-12 flex flex-col mt-14">
              <div className="h-full bg-white p-1 rounded-lg shadow">
                <Services service1={service1} setService1={setService1} />
              </div>
            </div>

            {/* Center: Inputs + Card */}
            <div className="col-span-6 md:col-span-12 flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-4 mb-2">
                <div className="flex items-center text-gray-700">
                  <p>Area</p>
                  <input
                    type="number"
                    className="border border-gray-700 rounded-full w-[80px] ml-2 h-[24px] py-0 px-2"
                  />
                </div>
                <div className="flex items-center text-gray-700">
                  <p>Floors</p>
                  <input
                    type="number"
                    className="border border-gray-700 rounded-full w-[80px] ml-2 h-[24px] py-0 px-2"
                  />
                </div>
              </div>
              <p className="text-xs text-center mb-2 text-gray-700">
                50% Off Ground Floor COST ADDED For Every Floor Above Ground
                Floor
              </p>

              <div className="w-full h-full bg-white border p-3 rounded-lg shadow flex-grow">
                <SecondCard service1={service1} />
              </div>
            </div>

            {/* Right: ThirdCard */}
            <div className="col-span-3 md:col-span-12 flex flex-col mt-14">
              <div className="h-full bg-white p-3">
                <ThirdCard step={1} setStep={setStep} />
              </div>
            </div>
          </div>

          {/* Footer Info & Button */}
          <div className="mt-6 text-center text-gray-500 text-base font-medium">
            SELECT ANY FURTHER SERVICES YOU REQUIRE
          </div>
          <div className="flex justify-end mr-6">
            <UButton
              onClick={submitHandler}
              text="DONE"
              color="gray-white"
              className="text-base px-10 py-2"
            />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="w-full absolute bottom-0 bg-accent-gray py-3 mt-10">
        <div className="max-w-[80%] mx-auto grid grid-cols-3 text-white text-sm font-semibold">
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <Image
                src={fastHomeIcon}
                alt="Project Icon"
                width={24}
                height={24}
              />
              <button>PROJECT</button>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <IoChatboxOutline />
              <button>CHAT</button>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <UButton
              onClick={null}
              className="flex items-center gap-2 text-[#2F2F2F] py-4 px-2"
              color="gold-gray"
              text={
                <span className="flex items-center gap-2 text-[24px] px-6">
                  <MdOutlinePayment />
                  <span>Payment</span>
                </span>
              }
            />
          </div>
        </div>
      </footer>
    </motion.section>
  );
};

export default InitialPayment3;
