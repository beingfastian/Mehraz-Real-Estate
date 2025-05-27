"use client";
import Nextbutton from "@/components/Nextbutton";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiCodesandboxLogoBold } from "react-icons/pi";

const Advancepayment = () => {
  const [services, setServices] = useState([
    {
      service: "Design Files",
      includes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      rate: "15 PKR/Yard",
      cost: "15 PKR/SQM",
      seeHow: "500 PKR",
    },
    {
      service: "Site Survey",
      includes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      rate: "Rate",
      cost: "Cost",
      seeHow: "",
    },
    {
      service: "Lifetime Assistance",
      includes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      rate: "Rate",
      cost: "Cost",
      seeHow: "",
    },
    {
      service: "Construction Assistance",
      includes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      rate: "Rate",
      cost: "Cost",
      seeHow: "",
    },
  ]);
  return (
    <div className=" text-center">
      <h1 className=" text-center">Total Amount= Amount in PKR</h1>
      <br />
      <p>SELECT ANY OPTION THAT SUITS YOU</p>
      <hr className="w-[50%] mx-auto" />

      <div className="relative overflow-x-auto sm:rounded-lg">
        {services.length > 0 &&
          services.map((value, index) => {
            return (
              <div
                className="flex items-center w-[100%] bg-[#EDD286] px-2 py-1 rounded-full mt-1"
                key={index}>
                <span className="flex items-center">
                  <span className="border border-black flex h-[25px] w-[25px] rounded-full  justify-center items-center bg-white cursor-pointer">
                    <FaCheck className=" text-black text-xl m-1" />
                  </span>
                </span>
                50% or 0.5% 1200000 PKR
              </div>
            );
          })}
        <hr className="my-2" />
        Advance Payment = 120,000 PKR
        <hr className="my-2" />
      </div>
    </div>
  );
};

export default Advancepayment;
