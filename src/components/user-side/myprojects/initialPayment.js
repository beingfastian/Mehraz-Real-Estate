"use client";

import Image from "next/image";
import dummyImage from "@/assets/images/bg.jpg";
import { UButton } from "@/components";
import useRPS from "@/hooks/useRPS";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { fastHomeIcon } from "@/assets";

const InitialPayment = ({ setSteps }) => {
  const { router, pathname, searchParams } = useRPS();

  const submitHandler = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 4);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const plans = [
    {
      title: "CORE MEP PLANS",
      subtitle: "ESSENTIAL",
      rate: "15 PKR/SFT",
      items: [
        { name: "Lighting Plan", desc: "Lights, fixtures, switches layout" },
        { name: "Switch Sockets", desc: "Power sockets, control, SW" },
        { name: "Water Supply Plan", desc: "Piping for fresh water to taps" },
        { name: "Sewerage Plan", desc: "Drain pipes plan, casking waste" },
        {
          name: "Stormwater Drainage",
          desc: "Outdoor water flow, gutters etc",
        },
        { name: "Gas Piping Plan", desc: "For kitchen, geysers" },
      ],
    },
    {
      title: "SAFETY/COMM.",
      subtitle: "RECOMMENDED",
      rate: "15 PKR/SFT",
      items: [
        { name: "A.C. Planning", desc: "Unit placements, ducts, drainage" },
        { name: "Fire Detection", desc: "Detectors, alarms for warnings" },
        { name: "Fire Fighting", desc: "Extinguishers, sprinklers etc." },
        { name: "CCTV", desc: "Surveillance, cameras, wiring, DVR/NVRs" },
        {
          name: "Intercom, Phone Plan",
          desc: "Communication b/w gate & rooms",
        },
      ],
    },
    {
      title: "SMART HOME",
      subtitle: "MODERN",
      rate: "15 PKR/SFT",
      items: [
        { name: "Smart Home", desc: "Automation wiring of appliances" },
        { name: "Air Flow System", desc: "Kitchen hoods, exhausts, vents" },
        { name: "Solar Power System", desc: "Panel layout, inverter, wiring" },
        { name: "Earthing, Lightning Protect.", desc: "For home safety" },
        {
          name: "Internet, LAN Layout",
          desc: "Network points, router locations",
        },
        { name: "TV Cable Layout", desc: "TV ports, signal wiring" },
      ],
    },
  ];

  return (
    <div className="min-h-[100%] bg-white flex flex-col justify-between">
      {/* Main Content */}
      <div className="max-w-[85%] mx-auto w-full py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-black text-[36px] font-bold">SELECT & PAY</h2>
          <div className="flex justify-between max-w-[200px] mx-auto text-gray-500/50 text-lg">
            <span>SERVICES</span>
            <span>ADVANCE</span>
          </div>
          <p className="mt-4 bg-accent-gold-2 text-white font-medium text-xl max-w-[40%] mx-auto rounded-2xl px-4 py-1">
            Select <b className="font-bold">Home Services</b> Plans
          </p>
        </div>

        {/* Plans */}
        <div className="flex justify-center gap-6 flex-row">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="w-full md:w-[33%] border border-gray-300 shadow-lg rounded-b-2xl rounded-t-[35px] bg-white">
              {/* Plan Header */}
              <div className="bg-gray-100 rounded-[35px] px-4 py-2 flex items-start gap-4 relative shadow-md">
                <input
                  type="radio"
                  name="plan"
                  className="w-8 h-8 rounded-full accent-gray-700 mt-2"
                />
                <div className="flex flex-col">
                  <div className="font-bold text-xl">
                    {plan.title || "Plan"}
                  </div>
                  <div className="text-lg text-gray-500">
                    {plan.subtitle || "Subtitle"}
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-lg text-gray-600 rounded-3xl bg-white px-4 py-1">
                  {plan.rate || "Rate"}
                </div>
              </div>

              {/* Plan Items */}
              <div className="grid grid-cols-2 gap-2 p-4">
                {plan.items.map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="max-w-14 max-h-14 rounded-[40%] overflow-hidden">
                      <Image
                        src={dummyImage}
                        alt={item.name}
                        className="min-w-14 min-h-14 object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-md font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total & Next */}
        <div className="relative mt-8">
          <div className="text-[20px] w-[40%] mx-auto flex justify-between items-center text-center h-[46px] rounded-[10px] px-6 shadow-md border border-gray-200 bg-white">
            <strong>TOTAL COST</strong>
            <span>100,000 PKR</span>
          </div>
          <UButton
            onClick={submitHandler}
            text="NEXT"
            color="gray-white"
            className="text-base px-10 py-2 absolute right-0 top-0"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-accent-gray py-3 mt-10">
        <div className="max-w-[80%] mx-auto grid grid-cols-3 text-white text-sm font-semibold">
          {/* PROJECT */}
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

          {/* CHAT */}
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <IoChatboxOutline />
              <button>CHAT</button>
            </span>
          </div>

          {/* PAYMENT */}
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
    </div>
  );
};

export default InitialPayment;
