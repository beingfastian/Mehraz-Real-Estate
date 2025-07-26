"use client";
import Nextbutton from "@/components/Nextbutton";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiCodesandboxLogoBold } from "react-icons/pi";

const SecondCard = () => {
  const [services, setServices] = useState([
    {
      service: "DESIGN FILES",
      includes:
        "Complete architecture layout, elevations & 3D views in editable formats.",
      rate: "15 PKR/Yard",
      cost: "15 PKR/SQM",
      seeHow: "500 PKR",
    },
    {
      service: "HOME SERVICE PLANS",
      includes: "Detailed layout of utilities and home infrastructure plans.",
      rate: "12 PKR/Yard",
      cost: "14 PKR/SQM",
      seeHow: "",
    },
    {
      service: "LIFETIME ASSURANCE",
      includes:
        "Free revision support and updates for your home design forever.",
      rate: "10 PKR/Yard",
      cost: "12 PKR/SQM",
      seeHow: "",
    },
    {
      service: "CONSTRUCTION ASSISTANCE",
      includes: "Expert help during construction to ensure accurate execution.",
      rate: "18 PKR/Yard",
      cost: "20 PKR/SQM",
      seeHow: "",
    },
  ]);

  return (
    <div className="w-full px-4 py-4 bg-white rounded-md shadow-sm text-center">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-1">
        <span className="font-bold">DESIGN</span> CHARGES
      </h1>
      <hr className="w-[50%] mx-auto mb-4" />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left text-gray-700">
          <thead className="uppercase text-black border-b">
            <tr>
              <th className="px-2 py-2">Service</th>
              <th className="px-2 py-2">Includes</th>
              <th className="px-2 py-2">Charges</th>
              <th className="px-2 py-2">See How</th>
            </tr>
          </thead>
          <tbody>
            {services.map((value, index) => (
              <tr
                key={index}
                className="bg-gray-100 hover:bg-gray-200 transition-all border-b">
                {/* Service */}
                <td className="px-2 py-2 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-2 bg-[#FFEBD2] px-2 py-1 rounded-full">
                    <span className="border border-black h-[24px] w-[24px] flex justify-center items-center rounded-full bg-white">
                      <FaCheck className="text-black text-sm" />
                    </span>
                    <PiCodesandboxLogoBold className="text-lg" />
                    <span className="text-sm font-semibold">
                      {value.service}
                    </span>
                  </div>
                </td>

                {/* Includes */}
                <td className="px-2 py-2">
                  <div className="bg-white border border-gray-200 rounded-lg px-2 py-1">
                    {value.includes}
                  </div>
                </td>

                {/* Charges */}
                <td className="px-2 py-2">
                  <div className="flex justify-between gap-2">
                    <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-center min-w-[48%]">
                      {value.rate}
                    </div>
                    <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-center min-w-[48%]">
                      {value.cost}
                    </div>
                  </div>
                </td>

                {/* See How */}
                <td className="px-2 py-2 text-right">
                  <Nextbutton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Changes Section */}
      <div className="grid grid-cols-3 items-center bg-[#ffebd2c7] text-sm px-3 py-2 mt-4 rounded-full w-full">
        <div className="font-medium">CHANGES</div>
        <div className="text-center">
          LEVEL <span className="font-bold">LOW</span>
        </div>
        <div className="flex justify-end gap-2">
          <button className="bg-white border border-gray-300 rounded-sm px-2 py-1 shadow-sm hover:bg-gray-100">
            RATE
          </button>
          <button className="bg-white border border-gray-300 rounded-sm px-2 py-1 shadow-sm hover:bg-gray-100">
            COST
          </button>
        </div>
      </div>

      {/* Offer Section */}
      <div className="flex items-center gap-2 bg-[#FFEBD2] text-sm px-3 py-2 mt-3 rounded-full w-full">
        <span className="border border-black h-[24px] w-[24px] flex justify-center items-center rounded-full bg-white" />
        <PiCodesandboxLogoBold className="text-lg" />
        <span>OFFER</span>
        <input
          type="text"
          placeholder="Label"
          className="w-[50px] border border-gray-300 rounded px-1"
        />
        <input
          type="number"
          placeholder="%"
          className="w-[50px] border border-gray-300 rounded px-1"
        />
        <span>% OFF</span>
      </div>
    </div>
  );
};

export default SecondCard;
