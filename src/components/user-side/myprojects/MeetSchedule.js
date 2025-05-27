"use client";
import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { FaChevronLeft } from "react-icons/fa6";
import ScheduleCarousel from "./ScheduleCarousel";
import { RxCross1 } from "react-icons/rx";
import Backbutton from "@/components/Backbutton";
import Link from "next/link";
const Schedule = ({ setStep }) => {
  const [calender, setCalender] = useState([]);
  const [selectedslot, setSelectedslot] = useState(1);
  const [numberslot, setNumberslot] = useState([
    { time: "11-12 AM" },
    { time: "12-1 PM" },
    { time: "1-2 PM" },
    { time: "2-3 PM" },
  ]);
  const [office, setOffice] = useState([
    { name: "office1", location: "/" },
    { name: "office2", location: "/" },
    { name: "office3", location: "/" },
  ]);
  let index = 0;
  useEffect(() => {
    if (index == 0) {
      let daysArray = [];
      const today = new Date();
      let updatedCalender = [];

      for (let i = 0; i < 30; i++) {
        const nextDay = addDays(today, i);
        daysArray.push({
          day: format(nextDay, "EEEE"),
          date: format(nextDay, "dd-MM-yyyy"),
          month: format(nextDay, "MMM"),
          date: nextDay,
        });

        if ((i + 1) % 7 === 0) {
          // console.log("if condition of 7 days run!", daysArray);
          updatedCalender.push(daysArray);
          daysArray = [];
        }
      }

      // Add remaining daysArray if not empty
      if (daysArray.length > 0) {
        updatedCalender.push(daysArray);
      }
      console.log("update celender complete arrsy is: ", updatedCalender);
      setCalender(updatedCalender);
      index = 1;
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="flex relative">
      <RxCross1
        className=" text-2xl absolute right-1 top-1 h-[30px] w-[30px] md:h-[25px] md:w-[25px] sm:h-[15px] sm:w-[15px] sm:top-[-9px] sm:right-0 cursor-pointer"
        onClick={() => setStep(1)}
      />
      <span onClick={() => setStep(1)}>
        <Backbutton />
      </span>
      {/* <div className="bg-[#EFEFEF] p-4 xl:p-3 w-[55px] h-[55px] sm:h-[40px] flex justify-center items-center rounded-full shadow-btn sm:top-14 sm:left-1 sm:z-10 mx-0 my-5 md:left-1 md:z-10">
        <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
      </div> */}
      <div className=" flex-grow-1 flex items-center flex-col w-[95%] sm:w-[90%]">
        <h1 className=" font-bold text-2xl sm:text-xl">SCHEDULE A MEET UP</h1>
        <div className="location-selection-container w-[100%]">
          <div class="flex items-center mb-4 justify-evenly flex-wrap w-[50%] sm:w-[100%] md:w-[100%] mx-auto">
            {office?.length > 0 &&
              office?.map((value, index) => (
                <div className="flex" key={index}>
                  <input
                    id={`default-radio-${index}`}
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 relative top-1"
                  />
                  <div className="ms-2">
                    <label
                      for={`default-radio-${index}`}
                      class=" text-gray-900 dark:text-gray-300 text-xl font-bold sm:text-base">
                      OFFICE 1
                    </label>
                    <span className=" block text-sm sm:text-xs">LOCATION</span>
                    <Link
                      href="/"
                      className="text-xs relative top-[-6px] underline font-bold sm:text-xs">
                      VIEW IN MAPS
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <hr className=" w-[50%] sm:w-[100%] my-3 sm:my-2"></hr>
        <h1 className=" font-bold text-xl sm:text-base">SELECT PREFFERD DAY</h1>
        <div className="carousel-parent w-full ">
          {calender.length > 0 && <ScheduleCarousel calender={calender} />}
        </div>
        <hr className=" w-[50%] sm:w-[100%] my-3"></hr>
        <h1 className=" font-bold text-xl sm:text-xl">SELECT PREFFERED TIME</h1>
        <p className="sm:text-xs">
          30 MINUTE MEETING. ASIA/KARACHI TIME ( 7:30 AM ){" "}
        </p>
        <div className="flex flex-wrap justify-evenly items-center">
          {numberslot?.map((val, index) => (
            <button
              type="button"
              className={`text-gray-900 bg-white border border-gray-300 font-bold focus:outline-none focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5 me-2 mb-2${
                selectedslot == index + 1 ? " !bg-[#21254A] text-white" : ""
              }`}
              onClick={() => setSelectedslot(index + 1)}>
              {val?.time}
            </button>
          ))}
        </div>
        <hr className=" w-[50%] sm:w-[100%] my-3"></hr>
        <div className=" flex flex-col items-end  w-full">
          <div>
            <button
              type="button"
              className="py-2.5 px-8 sm:px-5 me-2 mb-2 text-sm text-white  focus:outline-none bg-gray-800  border border-white hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800 dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-white hover:border-gray-800 font-bold">
              SCHEDULE
            </button>
          </div>
          <div>
            <button
              type="button"
              className="py-2.5 px-8 sm:px-5 me-2 mb-2 text-sm text-white  focus:outline-none bg-gray-800  border border-white hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800 dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-white hover:border-gray-800 font-bold">
              CHANGE
            </button>
            <button
              type="button"
              className="py-2.5 px-8 sm:px-5 me-2 mb-2 text-sm text-white  focus:outline-none bg-gray-800  border border-white hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800 dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-white hover:border-gray-800 font-bold">
              CANCEL
            </button>
            {/* <Backbutton /> */}
          </div>
        </div>
      </div>
      {/* <ul>
        {daysArray.map((dayItem, index) => (
          <li key={index}>
            <span>{dayItem.day}: </span>
            <span>{dayItem.date}</span>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Schedule;
