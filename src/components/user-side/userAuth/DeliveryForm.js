"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DesSelSelect from "../fast-homes/design-selection/DesSelSelect";
import { useRouter } from "next/navigation";
import { UserHeader } from "@/components";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];

const DeliveryForm = ({ setStep }) => {
  const [dropLocation, setDropLocation] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [preferredTime, setPreferredTime] = useState(timeSlots[0]);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  //   const validate = () => {
  //     const newErrors = {};
  //     if (!dropLocation) newErrors.dropLocation = "Drop location is required";
  //     if (!day) newErrors.day = "Day is required";
  //     if (!month) newErrors.month = "Month is required";
  //     if (!year) newErrors.year = "Year is required";

  //     if (day && (parseInt(day) < 1 || parseInt(day) > 31)) {
  //       newErrors.day = "Invalid day";
  //     }

  //     if (year && parseInt(year) < new Date().getFullYear()) {
  //       newErrors.year = "Year cannot be in the past";
  //     }

  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     if (validate()) {
  //       onSubmit({
  //         dropLocation,
  //         deliveryDate: `${day}/${month}/${year}`,
  //         preferredTime,
  //       });
  //     }
  //   };

  const handleTimeSelect = value => {
    setPreferredTime(value);
  };

  return (
    <div className="flex flex-grow h-full absolute top-0 left-0 w-full">
      {/* ✅ Header */}
      <div className="w-full fixed top-0 left-0 z-20">
        <UserHeader />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen z-[1] w-full flex items-center justify-center bg-login bg-no-repeat bg-center bg-cover">
        <div className="h-full w-full flex justify-center items-center flex-col">
          <div className="p-0 md:p-2 max-w-[950px] m-auto flex gap-6 w-full flex-col">
            <p className="text-4xl lg:text-3xl md:text-2xl leading-none text-center text-white">
              <span className="font-bold md:font-semibold">DELIVERY</span>
              <span> DETAILS</span>
            </p>

            <div className="login-form-container f-col items-center justify-center">
              <form className="max-w-2xl m-auto w-full flex gap-12 md:gap-9 sm:gap-7 flex-col relative mb-[4rem] md:mb-[3rem] sm:mb-[2rem]">
                {/* Drop Location */}
                <div className="w-full f-col gap-3 md:gap-2 mt-[70px]">
                  <label htmlFor="dropLocation" className="login-label">
                    DROP LOCATION
                  </label>
                  <input
                    id="dropLocation"
                    className="login-input login-input-height"
                    type="text"
                    value={dropLocation}
                    placeholder="ENTER DELIVERY ADDRESS"
                    onChange={e => setDropLocation(e.target.value)}
                    required
                  />
                  {errors.dropLocation && (
                    <p className="text-[#ff0000]">{errors.dropLocation}</p>
                  )}
                </div>

                {/* Delivery Date */}
                <div className="w-full f-col gap-3 md:gap-2">
                  <label className="login-label">DELIVERY DAY</label>
                  <div className="flex items-center w-full gap-2">
                    {/* Day */}
                    <div className="w-[25%] relative">
                      <select
                        className="w-full login-input login-input-height rounded-[8px] text-center appearance-none"
                        value={day}
                        onChange={e => setDay(e.target.value)}>
                        <option value="" disabled hidden>
                          DD
                        </option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                          <option key={d} value={d}>
                            {d.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <p className="absolute left-1/2 -translate-x-1/2 bottom-[-22px] login-label opacity-50 text-center">
                        Day
                      </p>
                      {errors.day && (
                        <p className="text-[#ff0000] text-sm mt-1">
                          {errors.day}
                        </p>
                      )}
                    </div>

                    {/* Month */}
                    <div className="w-[50%] relative">
                      <select
                        className="w-full login-input login-input-height rounded-[8px] text-center appearance-none"
                        value={month}
                        onChange={e => setMonth(e.target.value)}>
                        <option value="" disabled hidden>
                          MM
                        </option>
                        {months.map((m, index) => (
                          <option key={index} value={index + 1}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <p className="absolute left-1/2 -translate-x-1/2 bottom-[-22px] login-label opacity-50 text-center">
                        Month
                      </p>
                      {errors.month && (
                        <p className="text-[#ff0000] text-sm mt-1">
                          {errors.month}
                        </p>
                      )}
                    </div>

                    {/* Year */}
                    <div className="w-[25%] relative">
                      <select
                        className="w-full login-input login-input-height rounded-[8px] text-center appearance-none"
                        value={year}
                        onChange={e => setYear(e.target.value)}>
                        <option value="" disabled hidden>
                          YYYY
                        </option>
                        {Array.from(
                          { length: 5 },
                          (_, i) => new Date().getFullYear() + i,
                        ).map(y => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                      <p className="absolute left-1/2 -translate-x-1/2 bottom-[-22px] login-label opacity-50 text-center">
                        Year
                      </p>
                      {errors.year && (
                        <p className="text-[#ff0000] text-sm mt-1">
                          {errors.year}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preferred Time */}
                <div className="w-full f-col gap-3 md:gap-2">
                  <div className="flex justify-between items-center w-full gap-4">
                    <label
                      htmlFor="preferredTime"
                      className="login-label whitespace-nowrap">
                      PREFERRED TIME
                    </label>
                    <div className="flex-1 flex justify-end">
                      <DesSelSelect
                        id="preferredTime"
                        className="flex-1 max-w-[350px]"
                        customStyle={{
                          container: {
                            height: "65px",
                            width: "350px",
                            border: "1px solid rgba(40,40,40,0.6)",
                          },
                          text: { fontWeight: 300 },
                          chevronContainer: { width: "50px", height: "65px" },
                          chevronIcon: { fontSize: "18px" },
                        }}
                        value={preferredTime}
                        selectHandler={handleTimeSelect}
                        selectedOption={preferredTime}
                        options={timeSlots.map(time => ({
                          value: time,
                          label: time,
                        }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="max-w-3xl m-auto w-full h-[1px] bg-white mb-[1.1rem]"></div>
                <button
                  type="button"
                  onClick={() => router.push("/payment")}
                  className="flex justify-center items-center w-[214px] md:w-[180px] h-14 md:h-12 m-auto relative rounded bg-white shadow-btn-shadow hover:bg-transparent hover:border-white hover:border-2 group">
                  <p className="text-[22px] md:text-xl sm-text-base text-nowrap text-left uppercase text-[#3f3f3f] group-hover:text-white">
                    CONFIRM
                  </p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeliveryForm;
