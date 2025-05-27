"use client";
import {
  Advancepayment,
  Backbutton,
  PaymentMethod,
  SecondCard,
  Services,
  ThirdCard,
  UserScreenSpinner,
} from "@/components";
import { DesignIcon } from "@/components";
import { ConstructionIcon } from "@/components";
import { MeterialsIcon } from "@/components";
import { FurnitureIcon } from "@/components";
import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import React, { lazy, Suspense, useState } from "react";
import BlackButton from "@/components/user-side/BlackButton";
import { CalculatePayment } from "@/components";
const page = () => {
  const [step, setStep] = useState(1);
  // const [service1, setService1] = [
  //   {
  //     checked: true,
  //     icon: <DesignIcon />,
  //     text: "Design",
  //   },
  //   {
  //     checked: false,
  //     icon: <ConstructionIcon />,
  //     text: "CONSTRUCTION",
  //   },
  //   {
  //     checked: true,
  //     icon: <MeterialsIcon />,
  //     text: "METERIALS",
  //   },
  //   {
  //     checked: false,
  //     icon: <FurnitureIcon />,
  //     text: "FURNITURE",
  //   },
  // ];
  const [service1, setService1] = useState([
    {
      checked: true,
      icon: <DesignIcon />,
      text: "Design",
    },
    {
      checked: false,
      icon: <ConstructionIcon />,
      text: "CONSTRUCTION",
    },
    {
      checked: true,
      icon: <MeterialsIcon />,
      text: "METERIALS",
    },
    {
      checked: false,
      icon: <FurnitureIcon />,
      text: "FURNITURE",
    },
  ]);

  return (
    <Suspense fallback={UserScreenSpinner}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] sm:p-0">
        <div className="max-w-8xl w-auto min-h-[500px] max-h-page-user-inner mx-auto px-4 pt-8 h-[80vh]">
          {step == 1 && (
            <>
              <div className="flex  h-auto">
                <span className="relative z-20">
                  <Backbutton />
                </span>
                <div className="ml-2">
                  <h1 className=" font-bold text-xl">SELECT & PAY</h1>
                  <div className=" flex items-center">
                    <span className="bg-[#0CD350] flex h-[20px] w-[20px] rounded-full  justify-center items-center ">
                      <FaCheck className=" text-white" />
                    </span>
                    <span className="text-xs inline mx-1">
                      Satisfaction Garanty
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly md:flex-col items-start">
                <div className="container1 w-[20%] md:flex md:w-[100%]">
                  <Services service1={service1} setService1={setService1} />
                </div>
                <div className="container2 flex flex-col items-center w-[50%] relative -top-[38px] md:top-0 md:w-[100%]">
                  <div className="flex flex-wrap justify-evenly items-center w-[100%] flex-col">
                    <div className="flex">
                      <div className="flex items-center">
                        <p>Area</p>
                        <input
                          type="number"
                          className="border rounded-full w-[80px] xl:w-[80px] md:w-[40px] ml-2 md:ml-1 h-[19px] py-0 px-2"
                        />
                      </div>
                      <div className="flex items-center">
                        <p>Floors</p>
                        <input
                          type="number"
                          className="border rounded-full w-[80px] xl:w-[80px] md:w-[40px] ml-2 md:ml-1 h-[19px] py-0 px-2"
                        />
                      </div>
                    </div>

                    <p className=" text-xs xl:text-xxs">
                      50% Off Ground Floor COST ADDED For Every Floor Above
                      Ground Floor
                    </p>
                  </div>
                  {/* center card start */}
                  <div className="block bg-white border p-2 border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  w-[100%]">
                    <SecondCard />
                  </div>
                  {/* center card end */}
                </div>
                <div className="container3 w-[20%] md:w-[100%]">
                  <div className="block bg-white border p-2 border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  w-[100%]">
                    <ThirdCard step={step} setStep={setStep} />
                  </div>
                </div>
              </div>
            </>
          )}
          {step == 2 && (
            <>
              <div className="flex  h-auto">
                <span
                  onClick={() => setStep(prev => prev - 1)}
                  className="relative z-20">
                  <Backbutton />
                </span>
              </div>
              <div className=" w-[100%] border border-black flex justify-center flex-wrap items-end relative sm:-top-12 -top-12">
                <div className="container2 flex flex-col items-center w-[50%] relative md:w-[100%] xl:w-[60%]">
                  <div className="flex flex-wrap justify-evenly items-center w-[100%] flex-col">
                    <div>
                      <h1 className=" font-bold text-2xl">CALCULATE PAYMENT</h1>
                      <div className=" flex justify-center items-center">
                        <div className="flex items-center w-[100%] bg-[#FFEBD2] px-1 py-1 rounded-full text-xs md:justify-center">
                          <span className="flex items-center">
                            <span className="border border-black flex h-[25px] w-[25px] rounded-full  justify-center items-center bg-white cursor-pointer">
                              <FaCheck className=" text-black text-xl m-1" />
                            </span>
                          </span>
                          <span>Some Text Here</span>
                        </div>
                        <div className="flex items-center w-[100%] bg-[#FFEBD2] px-1 py-1 rounded-full text-xs md:justify-center">
                          <span className="flex items-center">
                            <span className="border border-black flex h-[25px] w-[25px] rounded-full  justify-center items-center bg-white cursor-pointer">
                              <FaCheck className=" text-black text-xl m-1" />
                            </span>
                          </span>
                          <span>Some Text Here</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex my-2">
                      <div className="flex items-center">
                        <p>Area</p>
                        <input
                          type="number"
                          className="border w-[80px] xl:w-[80px] md:w-[40px] ml-2 md:ml-1 h-[19px] py-0 px-2"
                        />
                      </div>
                      <div className="flex items-center">
                        <p>Floors</p>
                        <input
                          type="number"
                          className="border w-[80px] xl:w-[80px] md:w-[40px] ml-2 md:ml-1 h-[19px] py-0 px-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="block bg-white border p-2 border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  w-[100%]">
                    {/* <SecondCard /> */}
                    <CalculatePayment />
                  </div>
                </div>
                <span
                  className=" relative left-[35px] md:left-[0px]"
                  onClick={() => setStep(prev => prev + 1)}>
                  <BlackButton text="NEXT" />
                </span>
              </div>
            </>
          )}
          {step == 3 && (
            <>
              <div className="flex  h-auto">
                <span
                  onClick={() => setStep(prev => prev - 1)}
                  className="relative z-20">
                  <Backbutton />
                </span>
              </div>
              <div className=" w-[100%] border border-black flex justify-center flex-wrap items-end relative sm:-top-12 -top-12 h-[80%] md:h-[auto] flex-col">
                {/* <h1 className=" font-bold absolute top-0">ADAVANCE PAYMENT</h1> */}
                <div className="w-[50%] md:w-[100%] flex justify-center items-center h-[100%]">
                  <div className="block bg-white border p-2 border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 w-[80%] sm:w-[95%]">
                    <Advancepayment />
                  </div>
                </div>
                <div className="w-[50%] md:w-[100%] flex justify-center items-center h-[100%]">
                  <div className="block  p-2  rounded-lg w-[100%]">
                    <PaymentMethod step={step} setStep={setStep} />
                  </div>
                </div>
              </div>
            </>
          )}
          {step == 4 && (
            <div className="flex flex-grow h-full absolute top-0 left-0 w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3] flex-grow h-full">
                <div className="h-full w-full flex justify-center items-center">
                  <RxCross1 className=" text-2xl absolute right-1 top-1 h-[30px] w-[30px] md:h-[25px] md:w-[25px] sm:h-[15px] sm:w-[15px] sm:top-[15px] sm:right-[15px] cursor-pointer text-white" />
                  <div className="h-[50vh] w-[50%] md:w-[80%] sm:w-[100%] flex justify-center items-center flex-col">
                    <div className="h-[100px] w-[100px] rounded-full bg-gradient-to-r from-[#21254A] to-[#154556]">
                      <svg
                        width="80%"
                        height="80%"
                        className="relative -top-3 left-3"
                        viewBox="0 0 120 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.17027 63.3797C2.17027 63.3797 35.2365 64.1088 46.2124 62.4871C57.1883 60.8653 80.8606 49.5755 96.2545 32.7738C102.671 25.7703 106.597 19.9534 109.737 15.3006C109.97 14.9549 110.199 14.6156 110.425 14.2828C112.643 11.0059 114.743 7.85482 116.484 5.24272C117.965 3.02012 119.186 1.18772 119.999 0C118.941 1.33897 117.857 2.74718 116.719 4.22542C111.678 10.7721 105.58 18.6924 95.9992 28.0554C84.7715 37.78 66.7253 45.5342 52.4677 45.3988C24.9075 45.137 22.3972 45.8506 20.0599 46.5151C19.915 46.5563 19.7707 46.5974 19.6212 46.6379C15.1089 48.1439 5.09718 54.4832 2.17027 63.3797ZM0 119.746V102.275C0 102.275 36.4324 102.403 43.3747 102.036C50.3169 101.668 59.8718 98.577 66.893 93.0935C74.8487 87.4324 79.5085 79.38 82.5203 74.1754C83.0365 73.2835 83.5042 72.4752 83.9319 71.7769C86.0586 68.3043 91.3978 59.1583 97.0204 48.0773C102.909 36.4721 109.612 22.1554 115.155 10.3166L115.156 10.3147C116.907 6.57479 118.542 3.08217 119.999 0.0004793L99.8289 52.9232C99.5177 53.7899 99.1859 54.7205 98.8348 55.7054C94.3767 68.2104 86.7959 89.4745 78.4512 100.048C69.4462 111.457 51.7017 117.323 49.6591 117.961C47.6166 118.598 41.7552 119.761 37.2763 119.874C23.5743 120.218 0 119.746 0 119.746ZM119.999 0.0004793C115.781 8.68307 109.716 20.3549 105.956 27.3988C102.197 34.4427 86.67 58.9216 80.0418 67.9711C77.6316 70.9061 71.2733 78.0593 65.4888 83.1465C59.7042 88.2338 47.8719 90.89 43.1485 91.4001C38.4252 91.9102 0 91.6907 0 91.6907V74.0923C1.80684 74.0923 3.90575 74.0954 6.2122 74.0988H6.21426C11.586 74.1068 18.0832 74.1165 24.6381 74.0923C33.8527 74.0583 43.466 73.89 52.2123 70.9042C67.355 65.7348 78.255 55.305 83.835 49.9656C84.3118 49.5094 84.7497 49.0903 85.1482 48.7149C89.775 44.3551 100.722 30.4789 103.531 26.5256C105.654 23.5369 107.34 20.7859 108.974 18.1192L108.975 18.1172C109.502 17.2573 110.023 16.4061 110.552 15.5585C114.261 9.61718 117.357 4.53805 119.999 0.0004793Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="w-[100%] min-h-[100px] h-auto flex justify-around">
                      <div className="flex flex-col justify-start items-center text-white">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 51 50"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.9"
                            d="M49.4822 23.7376L44.1262 18.3815L26.2728 0.528102C26.1068 0.360764 25.9093 0.227945 25.6918 0.137305C25.4742 0.0466658 25.2409 0 25.0052 0C24.7695 0 24.5361 0.0466658 24.3186 0.137305C24.101 0.227945 23.9035 0.360764 23.7376 0.528102L5.88413 18.3815L0.528102 23.7376C0.360764 23.9036 0.227945 24.101 0.137305 24.3186C0.0466658 24.5361 0 24.7695 0 25.0052C0 25.2409 0.0466658 25.4742 0.137305 25.6918C0.227945 25.9093 0.360764 26.1068 0.528102 26.2728C0.694073 26.4401 0.891534 26.5729 1.10909 26.6636C1.32666 26.7542 1.56001 26.8009 1.7957 26.8009C2.03138 26.8009 2.26474 26.7542 2.4823 26.6636C2.69986 26.5729 2.89732 26.4401 3.06329 26.2728L5.36638 23.9518V48.2147C5.36638 48.6882 5.55448 49.1423 5.8893 49.4771C6.22412 49.8119 6.67823 50 7.15173 50H42.8586C43.3321 50 43.7862 49.8119 44.121 49.4771C44.4559 49.1423 44.644 48.6882 44.644 48.2147V23.9518L46.9471 26.2728C47.113 26.4401 47.3105 26.5729 47.528 26.6636C47.7456 26.7542 47.979 26.8009 48.2146 26.8009C48.4503 26.8009 48.6837 26.7542 48.9013 26.6636C49.1188 26.5729 49.3163 26.4401 49.4822 26.2728C49.6496 26.1068 49.7824 25.9093 49.873 25.6918C49.9637 25.4742 50.0103 25.2409 50.0103 25.0052C50.0103 24.7695 49.9637 24.5361 49.873 24.3186C49.7824 24.101 49.6496 23.9036 49.4822 23.7376ZM41.0733 46.4293H8.93707V20.3811L25.0052 4.31303L41.0733 20.3811V46.4293Z"
                            fill="white"
                          />
                        </svg>
                        <span> &lt; Go To Home</span>
                      </div>
                      <div className="flex flex-col justify-start items-center text-white">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 60 50"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.9"
                            d="M36.45 3.3775L57.8748 23.7311L36.45 43.3705V33.4997C36.45 32.4093 35.5572 31.5444 34.4863 31.5514C26.613 31.6028 20.1129 32.8445 14.5281 35.4426C10.1216 37.4925 6.34112 40.3608 2.92997 44.0642C4.76154 37.7461 7.51716 31.7582 11.7504 26.833C16.8381 20.9139 24.1353 16.4405 34.7818 14.8311C35.7088 14.6909 36.45 13.8938 36.45 12.8998V3.3775ZM58.6125 24.4319L58.6129 24.4322L58.6125 24.4319Z"
                            stroke="white"
                            strokeWidth="2.9"
                          />
                        </svg>

                        <span>
                          {" "}
                          Share <span className=" font-bold">Mehraz</span> With
                          Others
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.section>
    </Suspense>
  );
};

export default page;
