"use client";
import Nextbutton from "@/components/Nextbutton";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiCodesandboxLogoBold } from "react-icons/pi";

const CalculatePayment = () => {
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
      <h1 className=" text-center">
        <span className=" font-bold">DESIGN</span> CHARGES
      </h1>
      <hr className="w-[50%] mx-auto" />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase text-black">
            <tr>
              <th scope="col" className="px-1 py-1 text-center">
                Service
              </th>
              <th scope="col" className="px-1 py-1 text-center">
                INCLUDES
              </th>
              <th scope="col" className="px-1 py-1 text-center">
                CHARGES
              </th>
              {/* <th scope="col" className="px-1 py-1">
              </th> */}
              <span className="sr-only">Edit</span>
            </tr>
          </thead>
          <tbody>
            {services?.length > 0 &&
              services.map((value, index) => {
                return (
                  <tr
                    className="border bg-gray-100 border-gray-200 rounded-full shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-xs p-1"
                    key={index}>
                    {/* td 1 start  */}
                    <td
                      scope="row"
                      className="px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                      <div className="flex items-center w-[100%] px-2 py-1 rounded-full justify-evenly">
                        <span className="flex items-center">
                          <span className="border border-black flex h-[25px] w-[25px] rounded-full  justify-center items-center bg-white cursor-pointer">
                            <FaCheck className=" text-black text-xl m-1" />
                          </span>
                        </span>
                        <span className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-xs p-1 text-center">
                          MEHRAZ <br />
                          SUPERVISION
                        </span>
                      </div>
                    </td>
                    {/* td 1 end  */}
                    {/* td 2 start  */}

                    <td className="px-1 py-1">
                      <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-xs p-1">
                        something something
                      </div>
                    </td>
                    {/* td 2 end  */}

                    <td className="px-1 py-1">
                      <div className="flex justify-center items-center w-[100%] h-[100%]">
                        <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-xs p-1 min-w-[45%] text-center">
                          {value.rate}
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-xs p-1 min-w-[45%] text-center">
                          {value.cost}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* table end  */}
      </div>
      <div>
        <div className=" flex justify-end items-center my-1">
          Total Cost
          <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-xs px-3 py-2 text-center w-fit ml-1">
            PKR
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatePayment;
