"use client";
import {
  DesSelStep1Screen1InputBox,
  ULinkButton2,
  DesSelSelect,
  DesSelFloorsSelect,
} from "@/components";
import useRPS from "@/hooks/useRPS";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaChevronLeft } from "react-icons/fa6";
import Claim from "../claim/Claim";
import Image from "next/image";
import { blackNextIcon } from "@/assets";
const defaultStep1Screen2FormData = {
  area: "",
  floors: "",
  familyUnits: "",
  requirements: "",
};

const DesSelStep2Screen1 = ({ areas, floors, familyUnits }) => {
  const { router, pathname, searchParams } = useRPS();
  const categoryParam = searchParams.get("category");

  const [step2Screen2FormData, setStep2Screen2FormData] = useState(
    defaultStep1Screen2FormData,
  );
  const [isClaimed, setIsClaimed] = useState(false);
  const [error, setError] = useState({
    area: false,
    floors: false,
    familyUnits: false,
    requirements: false,
  });
  const step2Screen2FormDataInputHandler = (key, value) => {
    setStep2Screen2FormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
    setError(prevState => ({ ...prevState, [key]: false }));
  };

  const nextStepHandler = () => {
    const newError = {
      area: !step2Screen2FormData.area,
      floors: !step2Screen2FormData.floors,
      familyUnits: !step2Screen2FormData.familyUnits,
      requirements: !step2Screen2FormData.requirements,
    };
    setError(newError);

    if (Object.values(newError).some(error => error)) {
      return;
    }
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "2");
    newSearchParams.set("area", step2Screen2FormData.area);
    newSearchParams.set("floors", step2Screen2FormData.floors);
    newSearchParams.set("familyUnits", step2Screen2FormData.familyUnits);
    newSearchParams.set("requirements", step2Screen2FormData.requirements);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const skipAndNextStepHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "2");
    newSearchParams.set("area", "");
    newSearchParams.set("floors", "");
    newSearchParams.set("familyUnits", "");
    newSearchParams.set("requirements", "");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const moveToStep1Screen2Handler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", "1");
    newSearchParams.set("screen", "2");
    newSearchParams.delete("project");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const claimHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (isClaimed === false) {
      newSearchParams.set("claim", "calim");
    } else {
      newSearchParams.delete("claim");
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
    setIsClaimed(prev => !prev);
  };
  useEffect(() => {
    if (searchParams.get("claim")) {
      setIsClaimed(true);
    } else {
      setIsClaimed(false);
    }
  }, [searchParams]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full">
        {isClaimed ? (
          <>
            <Claim />
          </>
        ) : (
          <div className="relative min-h-full container lg:max-w-xl  p-8 sm:p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6 lg:gap-2">
                <button
                  onClick={moveToStep1Screen2Handler}
                  className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
                  <FaChevronLeft
                    size={28}
                    className="w-7 h-auto lg:w-5 sm:w-4"
                  />
                </button>
                <div>
                  <h2 className="text-[#6A6A6A] text-3xl xl:text-2xl">
                    STEP 2/3
                  </h2>
                  <h1 className="text-[#242424] text-3xl xl:text-2xl lg:hidden">
                    <b>FINAL</b> HOME SELECTION
                  </h1>
                </div>
              </div>
              <div>
                <div className="lg:hidden text-[#6A6A6A] flex flex-col items-end mb-1">
                  <h3 className="text-xl xl:text-lg font-semibold">
                    Make Right Home Decisions
                  </h3>
                  <h4 className="xl:text-sm">
                    Know About Home Design Options & More?
                  </h4>
                </div>
                <div className="hidden lg:flex text-[#6A6A6A] flex-col items-end mb-1">
                  <h3 className="text-base xs:text-sm font-semibold">
                    Make Right Decisions
                  </h3>
                  <h4 className="text-xs xs:text-xxs">
                    Know Style Options & More?
                  </h4>
                </div>
                <ULinkButton2
                  text="all"
                  href="/"
                  className="ml-auto lg:text-xs text-white bg-[#323232] border border-[#323232] shadow-btn px-12 py-1 transition-colors duration-300 hover:bg-white hover:text-[#323232] hover:shadow-none"
                />
              </div>
            </div>
            <hr className="border-t-0 border-b border-b-black/30 mt-2 w-11/12 mx-auto" />
            <h3 className="text-[#2F2F2F] text-xl xl:text-base lg:text-sm xs:text-xs text-center mt-4 uppercase">
              Tell us how your home should be <b>planned</b> <br /> so we find
              perfect fit for you ...
            </h3>
            <div className="bg-transparent relative flex lg:flex-col items-center justify-evenly lg:gap-4 px-8 py-6 sm:p-4 mr-6 lg:mr-2 mt-4 sm:mt-2 before:absolute before:z-[-2] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#E5CD86] before:shadow-btn before:rounded-full lg:before:rounded-3xl before:border before:border-black before:border-opacity-30 after:absolute after:z-[-1] after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-[#efefef1a] after:translate-x-6 lg:after:translate-x-2 after:translate-y-3 lg:after:translate-y-2 after:shadow-btn after:rounded-full lg:after:rounded-3xl after:border after:border-black after:border-opacity-30">
              <div className="flex gap-0 lg:gap-10 flex-row py-0 lg:py-6 lg:flex-col justify-evenly  items-stretch w-full">
                <div className="flex flex-col gap-2 items-center w-full">
                  <DesSelStep1Screen1InputBox label={"area"}>
                    <DesSelSelect
                      options={
                        areas
                          ? [
                              {
                                label: "CHOOSE",
                                value: "",
                              },
                              ...areas
                                ?.filter(
                                  area =>
                                    area.category.toUpperCase() ===
                                    categoryParam.toUpperCase(),
                                )
                                ?.map(({ id, area, unit }) => ({
                                  label: `${area} ${unit.name}`,
                                  value: id,
                                })),
                            ]
                          : []
                      }
                      selectedOption={step2Screen2FormData.area}
                      selectHandler={value =>
                        step2Screen2FormDataInputHandler("area", value)
                      }
                    />
                  </DesSelStep1Screen1InputBox>
                  {error.area && (
                    <span className="text-[#FF0000] text-xs xs:text-xxs font-semibold">
                      Please select an area
                    </span>
                  )}
                </div>
                <div className="translate-y-1/2">
                  <FaArrowRightLong
                    size={40}
                    className="design-selection-right-arrow"
                  />
                </div>
                <div className="flex flex-col gap-2 items-center w-full">
                  <DesSelStep1Screen1InputBox label={"floors"}>
                    <DesSelFloorsSelect
                      options={
                        floors
                          ? [
                              { label: "CHOOSE", value: "" },
                              ...floors.map(({ id, name }) => ({
                                label: name,
                                value: id,
                              })),
                            ]
                          : []
                      }
                      selectedOption={step2Screen2FormData.floors}
                      selectHandler={value =>
                        step2Screen2FormDataInputHandler("floors", value)
                      }
                    />
                  </DesSelStep1Screen1InputBox>
                  {error.floors && (
                    <span className="text-[#FF0000] text-xs xs:text-xxs font-semibold">
                      how many floors?
                    </span>
                  )}
                </div>
                <div className="translate-y-1/2">
                  <FaArrowRightLong
                    size={40}
                    className="design-selection-right-arrow"
                  />
                </div>
                <div className="flex flex-col gap-2 items-center w-full ">
                  <DesSelStep1Screen1InputBox
                    label={"family units"}
                    isShowInfo={true}>
                    <DesSelSelect
                      options={
                        familyUnits
                          ? [
                              { label: "CHOOSE", value: "" },
                              ...familyUnits.map(({ id, name }) => ({
                                label: name,
                                value: id,
                              })),
                            ]
                          : []
                      }
                      selectedOption={step2Screen2FormData.familyUnits}
                      selectHandler={value =>
                        step2Screen2FormDataInputHandler("familyUnits", value)
                      }
                    />
                  </DesSelStep1Screen1InputBox>
                  {error.familyUnits && (
                    <span className="text-[#FF0000] text-xs xs:text-xxs font-semibold">
                      how many family units?
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-full gap-2 mt-[53px] sm:mt-6">
              <div className="max-w-[831px] h-[80px] w-full relative">
                <span className="absolute top-0.5 right-0.5 text-xs font-medium">
                  {step2Screen2FormData.requirements.length}/200
                </span>
                <textarea
                  id="requirements"
                  value={step2Screen2FormData.requirements}
                  onChange={e =>
                    step2Screen2FormDataInputHandler(
                      "requirements",
                      e.target.value,
                    )
                  }
                  rows={2}
                  maxLength={200}
                  className="w-full h-full border border-[#282828] border-opacity-60 resize-none rounded-md py-2 pl-3 pr-8  text-[#2F2F2F] placeholder:text-center placeholder:opacity-60 inherit-focus base-text-0 "
                  placeholder={`TELL US YOUR NEED\n4 Beds, 2 Floors, 1 Garage.....`}></textarea>
              </div>
              {error.requirements && (
                <span className="text-[#FF0000] text-xs xs:text-xxs font-semibold">
                  Please tell us your requirements
                </span>
              )}
            </div>
            <p className="text-black/60 text-center mt-2 sm:mt-0">
              Specific Words Give The Best Result
            </p>
            <div className="grid grid-cols-4 gap-4 mt-[35px] lg:mt-7 md:mt-5 ">
              {/* <button
                onClick={nextStepHandler}
                className="col-start-2 col-span-2 uppercase font-bold text-white bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full text-2xl xl:text-xl sm:text-base py-3 w-full text-nowrap relative z-[1] before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 duration-300">
                set budget
              </button> */}

              <button
                className="max-w-[380px] w-full h-[70px] lg:h-[60px] md:h-[50px] relative rounded-[10px] bg-gradient-to-b from-[#fedcb1] to-[#c9a84f] shadow-btn-shadow uppercase text-accent-black text-large bold col-start-2 col-span-2 mx-auto group z-[1] before:bg-white before:rounded-[10px] before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5  hover:before:opacity-100 before:transition-opacity before:duration-300 duration-300 "
                onClick={nextStepHandler}>
                <span className="relative -left-[2%]">SET BUDGET</span>
                <Image
                  src={blackNextIcon}
                  alt="next"
                  className="w-[55px] lg:w-[55px] md:w-[45px] sm:w-10  h-7 lg:h-7 md:h-6 sm:h-5 absolute right-0 mr-5 lg:mr-4 md:mr-2  top-1/2 -translate-y-1/2 block lg:hidden"
                />
              </button>
              <button
                onClick={skipAndNextStepHandler}
                className="uppercase text-[#3F3F3F] text-2xl xl:text-xl py-2  transition-transform duration-300  text-left">
                skip?
              </button>
              <button
                onClick={claimHandler}
                className="col-start-2 col-span-2 lg:col-start-1 lg:col-span-4 text-[#6A6A6A] text-center text-lg xl:text-base sm:text-sm xs:text-xs uppercase">
                <b>Confused Whats Best For You?</b> &#x2018;Chat With Us&#x2019;
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default DesSelStep2Screen1;
