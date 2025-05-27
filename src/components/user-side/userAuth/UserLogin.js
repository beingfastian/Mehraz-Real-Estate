"use client";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Backbutton from "@/components/Backbutton";
// import NumberExtensions from "./NumberExtensions";
// import { Firestore, query, where } from "firebase/firestore";
// import { db } from "../../../Firebase/firebase"; // Adjust the path if needed
// import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/UserContext";
const phoneExtensions = [
  { code: "+1", minDigits: 10, shortName: "US" }, // US and Canada
  { code: "+1-809", minDigits: 10, shortName: "DR" }, // Dominican Republic
  { code: "+20", minDigits: 10, shortName: "EG" }, // Egypt
  { code: "+30", minDigits: 10, shortName: "GR" }, // Greece
  { code: "+31", minDigits: 9, shortName: "NL" }, // Netherlands
  { code: "+32", minDigits: 9, shortName: "BE" }, // Belgium
  { code: "+33", minDigits: 9, shortName: "FR" }, // France
  { code: "+34", minDigits: 9, shortName: "ES" }, // Spain
  { code: "+36", minDigits: 9, shortName: "HU" }, // Hungary
  { code: "+39", minDigits: 9, shortName: "IT" }, // Italy
  { code: "+41", minDigits: 9, shortName: "CH" }, // Switzerland
  { code: "+42", minDigits: 9, shortName: "CZ" }, // Czech Republic
  { code: "+43", minDigits: 9, shortName: "AT" }, // Austria
  { code: "+44", minDigits: 10, shortName: "UK" }, // UK
  { code: "+45", minDigits: 8, shortName: "DK" }, // Denmark
  { code: "+46", minDigits: 9, shortName: "SE" }, // Sweden
  { code: "+48", minDigits: 9, shortName: "PL" }, // Poland
  { code: "+49", minDigits: 10, shortName: "DE" }, // Germany
  { code: "+52", minDigits: 10, shortName: "MX" }, // Mexico
  { code: "+55", minDigits: 11, shortName: "BR" }, // Brazil
  { code: "+60", minDigits: 9, shortName: "MY" }, // Malaysia
  { code: "+61", minDigits: 9, shortName: "AU" }, // Australia
  { code: "+62", minDigits: 10, shortName: "ID" }, // Indonesia
  { code: "+63", minDigits: 10, shortName: "PH" }, // Philippines
  { code: "+64", minDigits: 9, shortName: "NZ" }, // New Zealand
  { code: "+65", minDigits: 8, shortName: "SG" }, // Singapore
  { code: "+66", minDigits: 9, shortName: "TH" }, // Thailand
  { code: "+7", minDigits: 10, shortName: "RU" }, // Russia
  { code: "+81", minDigits: 10, shortName: "JP" }, // Japan
  { code: "+82", minDigits: 10, shortName: "KR" }, // South Korea
  { code: "+86", minDigits: 11, shortName: "CN" }, // China
  { code: "+90", minDigits: 10, shortName: "TR" }, // Turkey
  { code: "+92", minDigits: 10, shortName: "PK" }, // Pakistan
  { code: "+94", minDigits: 9, shortName: "SL" }, // Sri Lanka
  { code: "+95", minDigits: 9, shortName: "MM" }, // Myanmar
  { code: "+97", minDigits: 9, shortName: "SA" }, // Saudi Arabia
  { code: "+98", minDigits: 10, shortName: "IR" }, // Iran
  { code: "+234", minDigits: 10, shortName: "NG" }, // Nigeria
  { code: "+27", minDigits: 9, shortName: "ZA" }, // South Africa
  { code: "+351", minDigits: 9, shortName: "PT" }, // Portugal
  { code: "+353", minDigits: 9, shortName: "IE" }, // Ireland
  { code: "+965", minDigits: 8, shortName: "KW" }, // Kuwait
  { code: "+971", minDigits: 9, shortName: "AE" }, // United Arab Emirates
  { code: "+58", minDigits: 10, shortName: "VE" }, // Venezuela
];

const pageStates = {
  initial: "initial",
  otp: "otp",
  success: "success",
  error: "error",
};

const UserLogin = () => {
  const [auth, setAuth] = useAuth();
  const [fullName, setFullName] = useState("");
  const [extension, setExtension] = useState("+92");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [pageState, setPageState] = useState(pageStates.initial);
  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full Name is required";
    if (!extension) newErrors.extension = "Phone Extension is required";

    const selectedExtension = phoneExtensions.find(
      ext => ext.code === extension,
    );
    if (selectedExtension && !phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (
      selectedExtension &&
      phoneNumber.length < selectedExtension.minDigits
    ) {
      newErrors.phoneNumber = `Phone number must be at least ${selectedExtension.minDigits} digits`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log("handle submit function run!");
    // console.log({ fullName, extension, phoneNumber });
    const phone = extension + phoneNumber;
    if (validate()) {
      try {
        const { data } = await axios.post(
          "/api/auth/loginuser",
          { fullname: fullName, phonenumber: phone },
          { withCredentials: true },
        );
        console.log("data response is:", data);

        //   const data = await response.json();
        if (data.success) {
          toast.success("LOGIN SUCCESSFUL");
          setAuth(prev => {
            return {
              ...prev,
              user: data?.user,
              success: true,
              isLoading: false,
            };
          });
          router.push("/");
        } else {
          toast.error("Login Failed");
        }
      } catch (err) {
        toast.error("Login Failed", err.message);
      }
    }
  };

  const handleOtpSubmit = useCallback(() => {}, []);
  const sumbitHandler = useCallback(
    e => {
      e.preventDefault();
      if (pageState === pageStates.initial) {
        setPageState(pageStates.otp);
      } else if (pageState === pageStates.otp) {
        setPageState(pageStates.success);
      } else if (pageState === pageStates.success) {
        setPageState(pageStates.error);
      } else if (pageState === pageStates.error) {
        setPageState(pageStates.initial);
      }
    },
    [pageState],
  );
  console.log("pageState", pageState);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen z-[1]  w-full flex items-center justify-center bg-login bg-no-repeat bg-center bg-cover  ">
      <span
        className=" absolute top-[10%] md:top-[2%] left-[5%] md:left-[3%]"
        onClick={() => router.back()}>
        <Backbutton />
      </span>

      <div className="h-full w-full flex justify-center items-center flex-col">
        <div className="p-0 md:p-2 max-w-[950px] m-auto flex gap-6  w-full flex-col">
          <p className="text-4xl lg:text-3xl md:text-2xl  leading-none text-center text-white">
            <span className="font-bold md:font-semibold">VERIFY </span>
            <span>YOURSELF</span>
          </p>
          {pageState === pageStates.initial ? (
            <div className="login-form-container f-col items-center justify-center">
              {/* phone number input start  */}
              <form className="max-w-2xl m-auto w-full flex gap-12 md:gap-9 sm:gap-7 flex-col relative  mb-[4rem] md:mb-[3rem] sm:mb-[2rem]">
                <div className="w-full f-col gap-3 md:gap-2">
                  <label
                    className="login-label"
                    id="fullName"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}>
                    First name
                  </label>
                  <input
                    className="login-input login-input-height"
                    id="fullName"
                    type="text"
                    value={fullName}
                    placeholder="ENTER HERE"
                    onChange={e => setFullName(e.target.value)}
                    required
                  />
                  {errors.fullName && (
                    <p className=" text-[#ff0000]">{errors.fullName}</p>
                  )}
                </div>

                <div className="w-full f-col gap-3 md:gap-2">
                  <label htmlFor="extension" className="login-label">
                    PHONE NUMBER
                  </label>
                  <div className="flex w-full ">
                    <select
                      id="extension"
                      value={extension}
                      className=" !w-[123px] md:!w-[112px] sm:!w-[92px] login-input login-input-height"
                      onChange={e => setExtension(e.target.value)}>
                      <option value="">COUNTRY CODE</option>
                      {phoneExtensions.map(ext => (
                        <option key={ext.code} value={ext.code}>
                          {ext.code} {ext.shortName}
                        </option>
                      ))}
                    </select>
                    <span className="mx-2 flex justify-center items-center">
                      <span className="h-[1px] w-[10px] md:w-[8px] sm:w-[6px] bg-white"></span>
                    </span>
                    <input
                      id="phoneNumber"
                      className="login-input login-input-height"
                      placeholder="ENTER HERE"
                      type="text"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  {errors.extension && (
                    <p className=" text-[#ff0000]">{errors.extension}</p>
                  )}
                </div>
              </form>
              <div className="max-w-3xl m-auto w-full h-[1px] bg-white mb-[1.1rem] "></div>
              <p class="opacity-70 text-base md:text-sm sm:text-xs text-center uppercase text-white">
                <span>The number will BE the </span>
                <span className="font-bold">primary means of contact </span>
                <span>b/W</span>
                <span className="font-bold">Mehraz &#x26; you.</span>
              </p>
            </div>
          ) : pageState === pageStates.otp ? (
            <>
              <div className="login-form-container">
                {/* phone number input start  */}
                <form className="w-full flex gap-12 md:gap-9 sm:gap-7 flex-col relative h-full justify-center items-center">
                  <p class="w-[337px] text-center text-accent-white f-col gap-0.5">
                    <span class="w-[337px] text-[32px] font-bold text-center text-accent-white">
                      Enter 6-Digit Code
                    </span>
                    <br />
                    <span class="w-[337px] text-[22px] text-center text-accent-white">
                      Received On Given Phone Number
                    </span>
                  </p>

                  <input className="max-w-[337px] w-full login-input-height x-5 md:px-4 sm:px-3  rounded-full bg-white  text-4xl md:text-3xl sm:text-2xl xs:text-xl text-center text-black/60" />
                  {errors.extension && (
                    <p className=" text-[#ff0000]">{errors.extension}</p>
                  )}
                </form>
              </div>
            </>
          ) : pageState === pageStates.success ? (
            <>
              <div className="login-form-container">
                {/* phone number input start  */}
                <div className="h-full flex-center flex-col gap-3">
                  <svg
                    className="w-14 h-12 lg:w-16 lg:h-14"
                    viewBox="0 0 58 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet">
                    <path
                      d="M18.2092 52L17.8945 51.4638C13.0874 43.2735 0.313302 25.8925 0.18427 25.7179L0 25.4676L4.35207 21.1665L18.1284 30.7861C26.8023 19.5304 34.8945 11.7995 40.173 7.28494C45.9472 2.34646 49.7058 0.0729495 49.7438 0.0511631L49.8292 0H57.2116L56.5064 0.62801C38.3704 16.7817 18.7129 51.1148 18.5172 51.4597L18.2092 52Z"
                      fill="white"></path>
                  </svg>

                  <p class="text-4xl md:text-3xl sm:text-2xl text-center text-accent-white">
                    SUCCESS
                  </p>
                </div>
              </div>
            </>
          ) : (
            pageState === pageStates.error && (
              <>
                <div className="login-form-container">
                  {/* phone number input start  */}
                  <div className="h-full flex justify-evenly flex-col gap-3">
                    <h2 className="text-4xl uppercase md:text-3xl sm:text-2xl text-center text-accent-white">
                      error
                    </h2>
                    <div className="flex sm:flex-col gap-0 md:gap-2 sm:gap-3 justify-evenly items-center">
                      <button
                        className="flex justify-center items-center w-[250px] h-14 relative gap-4 px-8 py-4 rounded-[28px] bg-white shadow-md 
         md:w-full md:gap-2 md:px-6 md:py-3">
                        <p className="text-lg text-center uppercase text-[#3f3f3f] md:text-base">
                          resend code
                        </p>
                      </button>
                      <button
                        className="flex justify-center items-center w-[250px] h-14 relative gap-4 px-8 py-4 rounded-[28px] bg-white shadow-md 
         md:w-full md:gap-2 md:px-6 md:py-3">
                        <p className="text-lg text-center uppercase text-[#3f3f3f] md:text-base">
                          change number
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )
          )}

          <button
            // onClick={e => handleSubmit(e)}
            onClick={sumbitHandler}
            className="flex justify-center items-center w-[214px] md:w-[180px] h-14 md:h-12 m-auto relative
               rounded bg-white shadow-btn-shadow hover:bg-transparent hover:border-white hover:border-2 group">
            <p className="text-[22px] md:text-xl sm-text-base  text-nowrap text-left uppercase text-[#3f3f3f] group-hover:text-white">
              {pageState === pageStates.initial
                ? "send code"
                : pageState === pageStates.otp
                ? "confirm"
                : pageState === pageStates.success
                ? "lets go"
                : pageState === pageStates.error
                ? "back"
                : "send code"}
            </p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserLogin;
