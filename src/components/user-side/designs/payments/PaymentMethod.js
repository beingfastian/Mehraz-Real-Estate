"use client";
import Nextbutton from "@/components/Nextbutton";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiCodesandboxLogoBold } from "react-icons/pi";
import BlackButton from "../../BlackButton";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
const PaymentMethod = ({ step, setStep }) => {
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
    <div>
      <div className="flex">
        <h1 className=" text-3xl sm:text-xl w-[30%] border flex justify-center items-center bold">
          PAY
        </h1>
        <div className=" flex-grow border-2">
          <div className="flex items-center w-[100%] bg-[#FFEBD2] px-2 py-1 rounded-full mt-1 sm:text-xs">
            <span className="flex items-center">
              <span className="border border-black flex h-[25px] w-[25px] rounded-full  justify-center items-center bg-white cursor-pointer">
                <FaCheck className=" text-black text-xl m-1" />
              </span>
            </span>
            50% or 0.5% 1200000 PKR
          </div>
          <div className="flex items-center w-[100%] bg-[#FFEBD2] px-2 py-1 rounded-full mt-1 sm:text-xs">
            <span className="flex items-center">
              <span className="border border-black flex h-[25px] w-[25px] rounded-full  justify-center items-center bg-white cursor-pointer">
                <FaCheck className=" text-black text-xl m-1" />
              </span>
            </span>
            50% or 0.5% 1200000 PKR
          </div>
        </div>
      </div>
      <hr />
      <p className=" sm:text-center">
        pay through any service to this account, upload payment receipt here
      </p>
      <div className="flex justify-between items-end">
        <div className="flex justify-center flex-col items-center bg-white border md:p-2 xl:p-2 p-6 border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 w-[70%] md:w-[100%]">
          <div className="w-[60%] sm:w-[90%]">
            <span className=" text-xl block text-start">Account No</span>
            <input
              type="number"
              className="border rounded-full xl:w-[100%] md:w-[100%] md:ml-1 h-[19px] p-4 w-[100%]"
              placeholder="Account No"
            />
          </div>
          <div className="flex justify-center items-center bg-[#EFEFEF] rounded-full  p-2 w-[60%] sm:w-[90%] my-2">
            <MdOutlineContentCopy />
            <span>COPY DETAILS</span>
          </div>
          <div className="w-[60%] sm:w-[90%]">
            <p>UPLOAD RECIEPT</p>
            <div className="flex justify-center items-center bg-[#EFEFEF] rounded-full  p-2 w-[100%]">
              <IoAddCircle /> <span className=" underline">ADD</span>
            </div>
          </div>
        </div>
        <span
          className="sm:ml-[10px]"
          onClick={() => setStep(prev => prev + 1)}>
          <BlackButton />
        </span>
      </div>
    </div>
  );
};

export default PaymentMethod;
