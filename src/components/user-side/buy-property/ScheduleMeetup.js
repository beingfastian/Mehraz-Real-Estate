"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Backbutton from "../../Backbutton";
import UserHeader from "../header/UserHeader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const days = [
  { day: "Sun", date: "31", month: "DEC" },
  { day: "Mon", date: "1", month: "JAN" },
  { day: "Tue", date: "2", month: "JAN" },
  { day: "Wed", date: "3", month: "JAN" },
  { day: "Thu", date: "4", month: "JAN" },
  { day: "Fri", date: "5", month: "JAN" },
  { day: "Sat", date: "6", month: "JAN" },
];

const timeSlots = ["11-12 AM", "1-2 PM", "3-4 PM", "5-6 PM"];

const offices = [
  {
    title: "OFFICE 1",
    description: "Main branch near Mall Road, Lahore.",
  },
  {
    title: "OFFICE 2",
    description: "DHA branch, near Phase 6.",
  },
  {
    title: "OFFICE 3",
    description: "Bahria Town office, close to Grand Mosque.",
  },
];

const ScheduleMeetup = ({ setStep }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedTime, setSelectedTime] = useState(0);
  const [selectedOffice, setSelectedOffice] = useState(0);

  return (
    <div className="bg-[#f8f8f8] flex flex-grow h-full absolute top-0 left-0 w-full overflow-y-hidden">
      <div className="w-full fixed top-0 left-0 z-20">
        <UserHeader />
      </div>

      <div className="min-h-full min-w-full px-4 py-10 mt-20">
        {/* Header with back button and title */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span
            onClick={() => setStep(prev => prev - 1)}
            className="absolute left-6">
            <Backbutton />
          </span>
          <h1 className="text-3xl font-bold text-center">SCHEDULE A MEETUP</h1>
        </div>

        <hr
          className="border-gray-300 mx-auto mb-4"
          style={{ width: "500px" }}
        />

        {/* Office Selection */}
        <div className="flex justify-center gap-8 mb-5">
          {offices.map((office, index) => (
            <label
              key={index}
              className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="office"
                checked={selectedOffice === index}
                onChange={() => setSelectedOffice(index)}
                className="accent-black w-4 h-4 mt-1"
              />
              <div>
                <div className="font-bold text-lg">{office.title}</div>
                <div className="text-gray-500 text-sm mt-1">
                  {office.description}
                </div>
              </div>
            </label>
          ))}
        </div>

        <hr
          className="border-gray-300 mx-auto mb-8"
          style={{ width: "500px" }}
        />

        {/* Preferred Day */}
        <h2 className="text-center text-2xl font-semibold mb-6">
          SELECT PREFFERED DAY
        </h2>

        {/* Calendar Style Bar */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="bg-[#EFEFEF] p-3 xl:p-3 mx-0 w-[55px] h-[55px] sm:h-[40px] sm:w-[40px] flex justify-center items-center rounded-full shadow-btn sm:top-14 sm:left-1 sm:z-10 my-5 md:left-1 md:z-10 cursor-pointer">
            <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
          </div>

          <div className="bg-black/90 text-gray-200 bold rounded-t-2xl">
            <div className="flex justify-between">
              {days.map((d, i) => (
                <div
                  key={i}
                  className="w-[125px] py-4 text-center text-md font-medium">
                  {d.day}
                </div>
              ))}
            </div>
            <div className="flex justify-between rounded-2xl">
              {days.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={`w-[125px] p-8 text-md bold transition-all duration-200
                    ${
                      selectedDay === i
                        ? "bg-gray-500 text-white"
                        : "bg-[#efefef] text-black"
                    }`}>
                  <div>{d.date}</div>
                  <div className="text-xs">{d.month}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#EFEFEF] p-3 xl:p-3 mx-0 w-[55px] h-[55px] sm:h-[40px] sm:w-[40px] flex justify-center items-center rounded-full shadow-btn sm:top-14 sm:left-1 sm:z-10 my-5 md:left-1 md:z-10 cursor-pointer">
            <FaChevronRight size={24} className="w-6 h-auto sm:w-4" />
          </div>
        </div>

        <hr
          className="border-gray-300 mx-auto my-8"
          style={{ width: "500px" }}
        />

        {/* Preferred Time Section */}
        <div className="text-center font-semibold text-2xl">
          SELECT PREFFERED TIME
        </div>
        <div className="text-center text-base mb-6 text-black/50 font-[400] font-medium">
          30 MINUTE MEETING. ASIA/KARACHI TIME (7:30 AM)
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {timeSlots.map((time, i) => (
            <button
              key={i}
              onClick={() => setSelectedTime(i)}
              className={`w-[130px] px-4 py-3 rounded-xl text-md bold transition-all duration-200
                ${
                  selectedTime === i
                    ? "bg-[#21254A] text-white"
                    : "bg-white border-[#21254A] border border-[2px] text-black"
                }`}>
              {time}
            </button>
          ))}
        </div>

        <hr
          className="border-gray-300 mx-auto my-8"
          style={{ width: "500px" }}
        />

        {/* Schedule Button */}
        <div className="flex justify-end pr-20">
          <button
            type="button" // ← important! prevents page reload
            onClick={() => setStep(prev => prev + 1)}
            className="px-[60px] py-[15px] bg-[#323232] text-white text-[22px] rounded shadow text-sm">
            SCHEDULE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeetup;
