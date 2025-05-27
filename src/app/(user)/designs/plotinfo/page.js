"use client";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Loadingbar } from "@/components";
import { motion } from "framer-motion";

const page = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  function handledone() {
    const intervalId = setInterval(() => {
      setStep(prev => prev + 1);
    }, 2000);

    setTimeout(() => {
      router.push("/designs/myprojects");
      clearInterval(intervalId);
      // const newUrl = `${window.location.pathname}/paymentpage`;
      // router.push(newUrl);
      // router.push("/paymentpage");
    }, 4000);
  }
  return (
    // <>
    <div className="flex flex-grow h-full">
      {step == 1 ? (
        <>
          {/* back button  */}
          <button
            className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn sm:absolute sm:top-14 sm:left-1 sm:z-10 md:absolute md:top-20 md:left-1 md:z-10 absolute"
            onClick={e => {
              router.back();
            }}>
            <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
          </button>
          {/* back button end  */}
          <div className="h-full w-full flex flex-col items-center">
            <h1 className=" px-5 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-800 w-64 sm:w-fit text-center text-white text-2xl my-4">
              <span className=" font-bold">Plot</span> Info
            </h1>
            <div className="container1 w-[70%] sm:w-full flex flex-col items-center">
              <div className="flex items-center px-5 py-1 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-800 w-64 sm:w-fit text-center">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  value=""
                  name="bordered-radio"
                  required={true}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full ms-2 font-medium dark:text-gray-300  text-white text-xl sm:text-base">
                  <span className="font-bold">Already</span> have an Plot
                </label>
              </div>
              {/* card start */}

              <div className="block p-6 sm:px-[2px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-[100%]">
                <div>
                  <div className=" flex justify-around items-center">
                    <label
                      htmlFor="location"
                      className="block mb-2  text-gray-900 dark:text-white w-fit font-bold text-xl sm:text-base">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[70%] sm:w-[80%]"
                      placeholder="DHA"
                      required
                    />
                  </div>
                  <div className=" flex justify-around items-center mt-2">
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm  text-gray-900 dark:text-white w-fit ">
                      <span className=" font-bold text-xl sm:text-base">
                        Dimensions
                      </span>
                      <br></br>
                      Unit{" "}
                      <span className=" border-2 border-gray-400 rounded">
                        Feet v
                      </span>
                    </label>
                    <div className="flex w-[70%] flex-wrap justify-between sm:w-[80%]">
                      <div className="w-[20%] flex flex-col">
                        <label
                          htmlFor="width"
                          className="block font-medium text-gray-900 dark:text-white w-full text-center text-xl md:text-base sm:text-sm">
                          WIDTH
                        </label>
                        <input
                          type="number"
                          id="width"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          // placeholder="John"
                          required
                        />
                      </div>
                      <div className="w-[20%] flex flex-col">
                        <label
                          htmlFor="length"
                          className="block font-medium text-gray-900 dark:text-white w-full text-center text-xl md:text-base sm:text-sm">
                          LENGTH
                        </label>
                        <input
                          type="number"
                          id="length"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="w-[20%] flex flex-col">
                        <label
                          htmlFor="width2"
                          className="block font-medium text-gray-900 dark:text-white w-full text-center text-xl md:text-base sm:text-sm">
                          WIDTH2
                        </label>
                        <input
                          type="number"
                          id="width2"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="AUTO"
                          required
                        />
                      </div>
                      <div className="w-[20%] flex flex-col">
                        <label
                          htmlFor="length2"
                          className="block font-medium text-gray-900 dark:text-white w-full text-center text-xl md:text-base sm:text-sm">
                          LENGTH2
                        </label>
                        <input
                          type="number"
                          id="length2"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="AUTO"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* card end  */}
            </div>
            <div className="or w-[50%] mx-auto flex items-center my-5">
              <span className="border-b border-gray-500 border-solid w-[50%]"></span>
              OR
              <span className="border-b border-gray-500 border-solid w-[50%]"></span>
            </div>
            <div className="container2 w-[70%] sm:w-full flex flex-col items-center">
              <div className="flex items-center px-5 py-1 border border-gray-200 dark:border-gray-700 rounded-full bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green w-64 sm:w-fit text-center">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  value=""
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full ms-2 font-medium dark:text-gray-300  text-white text-xl sm:text-base">
                  <span className="font-bold">Buy</span> Plot
                </label>
              </div>{" "}
            </div>
            <button
              type="button"
              className="py-2.5 px-8 me-2 mb-2 text-sm text-white  focus:outline-none bg-gray-800  border border-white hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800 dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-white hover:border-gray-800 font-bold my-7"
              onClick={handledone}>
              Done
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      {step == 2 ? <Loadingbar /> : ""}
      {step == 3 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3] flex-grow h-full">
          <div className="h-full w-full flex justify-center items-center">
            <div className="sm:w-fit">
              <h2 className="text-white text-3xl sm:text-2xl">
                Start 3/3 OR 2/2
              </h2>
              <h1 className="text-white text-6xl sm:text-3xl font-bold border-b-2 border-white w-fit">
                Start Your Design
              </h1>
              <p className="text-white text-base mt-2">
                WILL BE WITH YOU REACH YOUR DREAM
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </div>
    // </>
  );
};

export default page;
