"use client";

import CustomRadioBtn from "@/components/user-side/designs/custom-radio-btn";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { radioOption } from "@/components/user-side/team-lead/data/data";
import BackBtn from "@/components/backBtn";
const ApplyAtMehraz = () => {
  const [selectedOption, setSelectedOption] = useState(radioOption.architect);

  const handleOptionChange = useCallback(value => {
    setSelectedOption(value);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative page-height bg-white page-top-padding px-8 sm:px-4">
      <div className="max-w-5xl w-auto m-auto  h-full flex  page-flex-gap flex-col">
        <div className="relative">
          <h1 class="text-[40px] md:text-[32px] sm:text-[24px] text-center uppercase text-accent-black">
            <span class="font-bold">apply</span>
            <span> at mehraz</span>
          </h1>

          <div className="absolute top-0 left-0">
            <BackBtn />
          </div>
        </div>
        <div className="max-w-[59rem] w-full mx-auto mt-[4.6rem] flex flex-col items-center justify-center lg:justify-start md:mt-12 sm:mt-8">
          {/* check box */}
          <div className="flex gap-[96px] items-center lg:gap-[48px] md:gap-[24px] sm:gap-[16px]">
            <p class="text-2xl font-bold text-center uppercase text-grey md:text-xl sm:text-lg sm:text-left block sm:hidden">
              apply for
            </p>
            <div className="flex gap-[2.875rem] items-center lg:gap-[2rem] md:gap-[1.5rem] sm:gap-[1rem]">
              <CustomRadioBtn
                text={radioOption.architect}
                selected={selectedOption}
                onChange={handleOptionChange}
              />
              <CustomRadioBtn
                text={radioOption.labour}
                selected={selectedOption}
                onChange={handleOptionChange}
              />
              <CustomRadioBtn
                text={radioOption.other}
                selected={selectedOption}
                onChange={handleOptionChange}
              />
            </div>
          </div>
          {/* check box */}

          {/* input field */}
          <div className="f-col gap-3 mt-[3.6rem] w-auto lg:w-full">
            {(selectedOption === radioOption.architect ||
              selectedOption === radioOption.labour ||
              selectedOption === radioOption.other) && (
              <div className="apply-form-input-container">
                <label className="apply-form-input-label">
                  Name <span className="text-red-500">*</span>
                </label>
                <input className="apply-form-input" />
              </div>
            )}

            {(selectedOption === radioOption.architect ||
              selectedOption === radioOption.labour ||
              selectedOption === radioOption.other) && (
              <div className="apply-form-input-container">
                <label className="inp-label text-nowrap flex items-start gap-1 ">
                  Location <span className="text-red-500">*</span>
                </label>
                <input className="apply-form-input" />
              </div>
            )}
            {(selectedOption === radioOption.architect ||
              selectedOption === radioOption.labour ||
              selectedOption === radioOption.other) && (
              <div className="apply-form-input-container">
                <label className="inp-label text-nowrap flex items-start gap-1 ">
                  mobile number <span className="text-red-500">*</span>
                </label>
                <input className="apply-form-input" />
              </div>
            )}

            {(selectedOption === radioOption.architect ||
              selectedOption === radioOption.other) && (
              <div className="apply-form-input-container">
                <label className="apply-form-input-label">
                  email <span className="text-red-500">*</span>
                </label>
                <input className="apply-form-input" />
              </div>
            )}
            {selectedOption === radioOption.other && (
              <div className="apply-form-input-container">
                <label className="apply-form-input-label">
                  profession<span className="text-red-500">*</span>
                </label>

                <input
                  className="apply-form-input"
                  placeholder="marketing / assistant / manager etc"
                />
              </div>
            )}
            {(selectedOption === radioOption.architect ||
              selectedOption === radioOption.other) && (
              <div className="apply-form-input-container">
                <label className="apply-form-input-label">
                  portfolio/cv<span className="text-red-500">*</span>
                </label>

                <div className="f-col gap-2 w-auto sm:w-full">
                  <input className="apply-form-input" placeholder="link here" />

                  {/* <label
                    htmlFor="file-upload"
                    // className="flex items-center justify-between w-full px-4 py-3 border border-gray-400 rounded-lg cursor-pointer text-gray-500 hover:border-gray-600 transition sm:text-sm xl:text-base"
                    className="apply-form-input">
                    <span className="opacity-60 text-2xl md:text-xl sm:text-lg text-center uppercase text-accent-black">
                      ATTACH LINK
                    </span>
                    <input type="file" id="file-upload" className="hidden" />
                  </label> */}
                  {/* <input className="apply-form-input" /> */}
                  <p className="text-base sm:text-sm text-left uppercase text-grey">
                    upload your cv or portfolio to any public site and attach
                    link here
                  </p>
                </div>
              </div>
            )}
            {selectedOption === radioOption.labour && (
              <div className="apply-form-input-container">
                <label className="apply-form-input-label">
                  expert in<span className="text-red-500">*</span>
                </label>

                <input
                  className="apply-form-input"
                  placeholder="brick work / plaster work / wood work etc"
                />
              </div>
            )}
          </div>
          {/* input field */}

          <Link
            href={"/success-apply"}
            className="flex justify-center items-center relative gap-2.5 px-[66px] py-[19px] rounded bg-[#323232] shadow-btn-shadow mt-[36px] lg:px-[50px] lg:py-[16px]   md:py-[14px] sm:px-[30px] sm:py-[12px]">
            <p className="text-[22px] lg:text-xl md:text-base font-medium text-center uppercase text-white">
              apply
            </p>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ApplyAtMehraz;
