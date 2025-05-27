"use client";
import {
  DesSelStep1Screen1InputBox,
  DesSelStep1StylesModal,
  ULinkButton2,
  DesSelSelect,
} from "@/components";
import useRPS from "@/hooks/useRPS";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaChevronLeft } from "react-icons/fa6";
import Claim from "../claim/Claim";
import Image from "next/image";
import { gradientNextIcon, nextIcon } from "@/assets";

const defaultStep1Screen2FormData = {
  city: "",
  styleCost: "",
  style: "",
};
const DesSelStep1Screen1 = ({ cities, styles }) => {
  const { router, pathname, searchParams } = useRPS();

  const [isClaimed, setIsClaimed] = useState(false);

  const [step1Screen2FormData, setStep1Screen2FormData] = useState(
    defaultStep1Screen2FormData,
  );
  const [error, setError] = useState({
    city: false,
    styleCost: false,
    style: false,
  });
  const step1Screen2FormDataInputHandler = (key, value) => {
    setStep1Screen2FormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
    setError(prevState => ({
      ...prevState,
      [key]: false,
    }));
  };

  useEffect(() => {
    setStep1Screen2FormData(prevState => ({
      ...prevState,
      style: "",
    }));
  }, [step1Screen2FormData.styleCost]);

  useEffect(() => {
    if (searchParams.get("claim")) {
      setIsClaimed(true);
    } else {
      setIsClaimed(false);
    }
  }, [searchParams]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  const nextStepHandler = () => {
    const newErrorState = {
      city: !step1Screen2FormData.city,
      styleCost: !step1Screen2FormData.styleCost,
      style: !step1Screen2FormData.style,
    };

    console.log("newErrorState", newErrorState);
    // Update the error state for all fields
    setError(newErrorState);

    // If there are any errors, stop further execution
    if (Object.values(newErrorState).some(error => error)) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "2");
    newSearchParams.set("city", step1Screen2FormData.city);
    newSearchParams.set("styleCost", step1Screen2FormData.styleCost);
    newSearchParams.set("style", step1Screen2FormData.style);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const skipAndNextStepHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "2");
    newSearchParams.set("city", "");
    newSearchParams.set("styleCost", "");
    newSearchParams.set("style", "");
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
          <>
            <div className="relative min-h-full w-full container lg:max-w-xl  p-8 sm:p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6 lg:gap-2">
                  <Link
                    href={"/fast-homes"}
                    className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
                    <FaChevronLeft
                      size={28}
                      className="w-7 h-auto lg:w-5 sm:w-4"
                    />
                  </Link>
                  <div>
                    <h2 className="text-[#6A6A6A] text-3xl xl:text-2xl">
                      STEP 1/3
                    </h2>
                    <h1 className="text-[#242424] text-3xl xl:text-2xl block lg:hidden">
                      <b>HOME STYLE</b> SELECTION
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
              <h3 className="text-[#2F2F2F] text-xl xl:text-base lg:text-sm xs:text-xs text-center mt-8 lg:mt-4 sm:mt-8 uppercase">
                Tell us how your home should <b>look</b> <br /> so we find
                perfect fit for you ...
              </h3>
              <div className="bg-transparent relative flex lg:flex-col items-center justify-evenly lg:gap-4 px-8 py-6 sm:p-4 mr-6 lg:mr-2 mt-12 xl:mt-8 lg:mt-4 sm:mt-8 before:absolute before:z-[-2] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#E5CD86] before:shadow-btn before:rounded-full lg:before:rounded-3xl before:border before:border-black before:border-opacity-30 after:absolute after:z-[-1] after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-[#efefef1a] after:translate-x-6 lg:after:translate-x-2 after:translate-y-3 lg:after:translate-y-2 after:shadow-btn after:rounded-full lg:after:rounded-3xl after:border after:border-black after:border-opacity-30">
                <div className="flex gap-0 lg:gap-12 flex-row py-0 lg:py-6 lg:flex-col justify-evenly  items-stretch w-full">
                  <div className="flex flex-col gap-2 items-center w-full">
                    <DesSelStep1Screen1InputBox label={"city"}>
                      <DesSelSelect
                        options={
                          cities
                            ? [
                                {
                                  label: "CHOOSE",
                                  value: "",
                                },
                                ...cities?.map(city => ({
                                  label: city.name,
                                  value: city.id,
                                })),
                              ]
                            : []
                        }
                        selectedOption={step1Screen2FormData.city}
                        selectHandler={value =>
                          step1Screen2FormDataInputHandler("city", value)
                        }
                      />
                    </DesSelStep1Screen1InputBox>
                    {error.city && (
                      <span className="text-[#FF0000] text-xs xs:text-xxs font-semibold">
                        Please select a city
                      </span>
                    )}
                  </div>

                  {/* arrow icon */}
                  <div className="translate-y-1/2 block lg:hidden">
                    <FaArrowRightLong
                      size={40}
                      className="design-selection-right-arrow"
                    />
                  </div>

                  <div className="flex flex-col gap-2 items-center w-full">
                    <DesSelStep1Screen1InputBox label={"home style"}>
                      <DesSelSelect
                        options={[
                          { label: "CHOOSE", value: "" },
                          { label: "LOW", value: "LOW" },
                          { label: "MEDIUM", value: "MEDIUM" },
                          { label: "HIGH", value: "HIGH" },
                        ]}
                        selectedOption={step1Screen2FormData.styleCost}
                        selectHandler={value =>
                          step1Screen2FormDataInputHandler("styleCost", value)
                        }
                      />
                    </DesSelStep1Screen1InputBox>
                    {error.styleCost && (
                      <span className="text-[#FF0000] text-xs xs:text-xxs font-semibold">
                        Please select a style cost
                      </span>
                    )}
                  </div>

                  {/* arrow icon */}
                  <div className="translate-y-1/2 block lg:hidden">
                    <FaArrowRightLong
                      size={40}
                      className="design-selection-right-arrow"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2 items-center">
                    <DesSelStep1Screen1InputBox label={"choose"}>
                      <button
                        onClick={toggleModal}
                        className="text-large   max-w-[312px] lg:max-w-[252px] sm:max-w-[185px] xs:max-w-[150px] w-full h-[80px] lg:h-[70px] md:h-[50px] sm:h-[48px] bg-[#8D8E97] rounded-full uppercase text-white shadow-[4px_4px_10px_1px_rgba(0,0,0,0.35)] font-bold border-[3px] md:border-[2px] sm:border-[1px] border-white border-opacity-60 transition-colors duration-300 hover:bg-white hover:text-[#000000a6] hover:border-[#000000a6]">
                        {step1Screen2FormData.style === ""
                          ? "styles"
                          : styles.find(
                              style => style.id === step1Screen2FormData.style,
                            ).name}
                      </button>
                    </DesSelStep1Screen1InputBox>
                    {error.style && (
                      <span className="text-[#FF0000] text-xs xs:text-xxs font-semibold">
                        Please select a style
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-center mt-[122px] lg:mt-[100px] md:mt-[80px] sm:mt-14 gap-0 sm:gap-2">
                <button
                  onClick={nextStepHandler}
                  className="uppercase  text-white bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full text-large bold  w-full max-w-[550px] lg:max-w-[350px] md:max-w-[250px] sm:max-w-[200px] text-nowrap relative z-[1] duration-300 h-[75px] lg:h-[65px] md:h-[50px] sm:h-[40px]  before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 group">
                  <span className="relative -left-[02%] md:-left-[08%]">
                    select style
                  </span>
                  <Image
                    src={nextIcon}
                    alt="next"
                    className="next-icon-size hover-opacity-0"
                  />
                  <Image
                    src={gradientNextIcon}
                    alt="next"
                    className="next-icon-size hover-opacity-100"
                  />
                </button>

                <button
                  onClick={skipAndNextStepHandler}
                  className="uppercase text-[#3F3F3F] text-large-1  transition-transform duration-300 hover:scale-105 absolute right-[15%] lg:right-[05%] cursor-pointer ">
                  skip?
                </button>
              </div>
              <div className="mt-[49px] lg:mt-[40px] md:mt-[30px] sm:mt-7">
                <p
                  onClick={claimHandler}
                  className="text-[#3F3F3F] w-full opacity-90 text-center ase-text-0  uppercase font-bold transition-font-weight cursor-pointer">
                  don&apos;t see your preffered options?
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
      {isModalOpen && (
        <DesSelStep1StylesModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          styles={styles}
          styleCost={step1Screen2FormData.styleCost}
          style={step1Screen2FormData.style}
          step1Screen2FormDataInputHandler={step1Screen2FormDataInputHandler}
        />
      )}
    </>
  );
};

export default DesSelStep1Screen1;

// before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300
