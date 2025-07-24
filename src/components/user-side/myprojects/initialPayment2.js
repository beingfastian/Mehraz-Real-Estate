"use client";

import Image from "next/image";
import Link from "next/link";
import dummyImage from "@/assets/images/bg.jpg";
import { UButton } from "@/components";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { fastHomeIcon } from "@/assets";

const InitialPayment2 = ({ setSteps }) => {
  const serviceCards = [
    { title: "CONSTRUCTION", selected: true },
    { title: "MATERIALS", selected: false },
    { title: "FURNITURE & LANDSCAPE", selected: false },
  ];

  return (
    <div className="min-h-[100%] bg-white flex flex-col justify-between">
      <div className="max-w-[70%] mx-auto">
        {/* Heading Section */}
        <div className="text-center mt-10">
          <h2 className="text-black text-[32px] font-bold">SELECT & PAY</h2>
          <div className="flex justify-center gap-8 text-gray-500/50 text-base font-regular">
            <span>SERVICES</span>
            <span>ADVANCE</span>
          </div>
          <p className="mt-4 bg-accent-gold-2 text-white px-6 py-2 rounded-xl inline-block font-semibold text-sm tracking-wide">
            FREE DESIGN CHARGES IF YOU GET CONSTRUCTION TOO
          </p>
        </div>

        {/* Service Selection */}
        <div className="flex flex-row justify-center mt-10 gap-6 relative">
          {/* Left Card */}
          <div className="w-[20%] flex flex-col items-center p-4 shadow-lg rounded-xl border border-gray-200 mt-6">
            <div className="relative rounded-xl border border-gray-200 overflow-hidden w-full h-[200px]">
              <Image
                src={dummyImage}
                alt="DESIGN"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <h3 className="text-white font-bold text-xl">DESIGN</h3>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="w-[70%] border-black border-[1px] rounded-xl flex flex-col h-[25%] pb-4">
            <p className="text-gray-500/80 font-medium text-[22px] text-black mx-auto py-4">
              GET COMPLETE COMFORT
            </p>
            <div className="w-full grid grid-cols-3 gap-6 px-4">
              {serviceCards.map((service, i) => (
                <div
                  key={i}
                  className="relative rounded-xl border border-gray-300 shadow-lg">
                  <Image
                    src={dummyImage}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="flex flex-col">
                      <h3 className="text-white font-bold text-xl mt-14">
                        {service.title}
                      </h3>

                      <p className="text-white/80 font-medium text-md mx-auto mt-12">
                        ADD SERVICE
                      </p>
                    </div>
                    {/* Checkbox Style Selection */}
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-300">
                      {service.selected && (
                        <div className="w-3 h-3 bg-black rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
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

      {/* Footer Section */}
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
