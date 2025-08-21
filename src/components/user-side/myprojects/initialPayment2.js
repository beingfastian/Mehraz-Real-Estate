"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dummyImage from "@/assets/images/bg.jpg";
import { UButton } from "@/components";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { fastHomeIcon } from "@/assets";
import { DesignIcon } from "@/components";
import { whitewall, buyMaterialLightIcon, couch } from "@/assets";

const InitialPayment2 = ({ setSteps }) => {
  const initialCards = [
    {
      title: "DESIGN",
      icon: <DesignIcon fill="white" stroke="white" width={50} height={50} />,
      selected: false,
    },
    {
      title: "CONSTRUCTION",
      icon: (
        <Image
          src={whitewall}
          alt="CONSTRUCTION"
          width={50}
          height={50}
          className="object-contain"
        />
      ),
      selected: false,
    },
    {
      title: "MATERIALS",
      icon: (
        <Image
          src={buyMaterialLightIcon}
          alt="Materials"
          width={50}
          height={50}
          className="object-contain"
        />
      ),
      selected: false,
    },
    {
      title: "FURNITURE & LANDSCAPE",
      icon: (
        <Image
          src={couch}
          alt="Furniture"
          width={40}
          height={40}
          className="object-contain"
        />
      ),
      selected: false,
    },
  ];

  const [serviceCards, setServiceCards] = useState(initialCards);

  const toggleSelection = index => {
    const updatedCards = [...serviceCards];
    updatedCards[index].selected = !updatedCards[index].selected;
    setServiceCards(updatedCards);
  };

  return (
    <div className="min-h-[100%] bg-white flex flex-col justify-between">
      <div className="max-w-[70%] mx-auto">
        {/* Heading */}
        <div className="text-center mt-10">
          <h2 className="text-black text-[32px] font-bold">SELECT & PAY</h2>
          <div className="flex justify-center gap-8 text-gray-500/50 text-base font-regular">
            <span>SERVICES</span>
            <span>ADVANCE</span>
          </div>
          <p className="mt-4 bg-accent-gold-2 text-white px-6 py-1 rounded-2xl inline-block font-semibold text-sm tracking-wide">
            FREE DESIGN CHARGES IF YOU GET CONSTRUCTION TOO
          </p>
        </div>

        {/* Service Selection */}
        <div className="flex lg:flex-row sm:flex-col justify-center mt-10 gap-6 sm:mt-6 sm:gap-4 relative flex-wrap">
          {/* Left Card - DESIGN */}
          <div
            onClick={() => toggleSelection(0)}
            className="shadow-xl w-[25%] sm:w-full sm:p-2 sm:mt-0 flex items-center justify-center p-4 mt-6 rounded-2xl cursor-pointer">
            <div className="flex flex-col items-center p-4 mx-auto">
              <div
                className="w-full"
                style={{
                  boxShadow: "10px 15px 20px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "16px",
                }}>
                <div className="relative border border-gray-200 w-[180px] h-[200px]">
                  <Image
                    src={dummyImage}
                    alt="DESIGN"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                    <div className="mb-2">{serviceCards[0].icon}</div>
                    <h3 className="text-white font-bold text-xl">DESIGN</h3>
                  </div>
                  {/* Checkbox */}
                  <div className="absolute z-10 bottom-[-10px] left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-300">
                    {serviceCards[0].selected && (
                      <div className="w-3 h-3 z-10 bg-black rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="w-[70%] border-black border-[1px] rounded-xl flex flex-col pb-6 sm:w-full sm:pb-4">
            <p className="text-gray-500/80 font-medium text-[22px] text-black mx-auto sm:text-[18px] py-4">
              GET COMPLETE COMFORT
            </p>
            <div className="w-full flex justify-between items-center flex-nowrap gap-8 md:gap-6 sm:gap-4 px-6 sm:flex-col sm:gap-4 sm:px-4">
              {serviceCards.slice(1).map((service, i) => {
                const actualIndex = i + 1;
                return (
                  <div
                    key={i}
                    onClick={() => toggleSelection(actualIndex)}
                    className="relative border border-gray-300 w-[180px] h-[200px] cursor-pointer"
                    style={{
                      boxShadow: "10px 15px 20px 0px rgba(0, 0, 0, 0.25)",
                      borderRadius: "16px",
                    }}>
                    <Image
                      src={dummyImage}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                      <div className="mb-2">{service.icon}</div>
                      <h3 className="text-white font-bold text-xl text-center">
                        {service.title}
                      </h3>
                      <p className="text-white/80 font-medium text-md mt-4">
                        {service.selected ? "ADDED" : "ADD SERVICE"}
                      </p>
                    </div>
                    {/* Checkbox */}
                    <div className="absolute z-10 bottom-[-10px] left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-300">
                      {service.selected && (
                        <div className="w-3 h-3 z-10 bg-black rounded-full" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-10">
          <Link href="/designs/payment">
            <UButton
              text="NEXT"
              color="gray-white"
              className="text-base px-10 py-3"
            />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-accent-gray py-3 mt-10">
        <div className="max-w-[80%] mx-auto grid grid-cols-3 gap-0 text-white text-sm font-semibold">
          {/* PROJECT */}
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-1 text-[24px] px-6">
              <Image src={fastHomeIcon} alt="Project" width={24} height={24} />
              <button className="text-[24px]">PROJECT</button>
            </span>
          </div>
          {/* CHAT */}
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-1 text-[24px] px-6">
              <IoChatboxOutline />
              <button className="text-[24px]">CHAT</button>
            </span>
          </div>
          {/* PAYMENT */}
          <div className="flex justify-center items-center">
            <UButton
              onClick={null}
              className="flex flex-col items-center justify-center text-[#2F2F2F] py-4 px-2"
              color="gold-gray"
              text={
                <span className="flex items-center gap-1 text-[24px] px-6">
                  <MdOutlinePayment />
                  <span>Payment</span>
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialPayment2;
