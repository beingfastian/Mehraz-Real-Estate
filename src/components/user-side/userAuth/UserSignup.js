"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Backbutton from "@/components/Backbutton";
import NumberExtensions from "./NumberExtensions";
import { Firestore, query, where } from "firebase/firestore";
import { db } from "../../../Firebase/firebase"; // Adjust the path if needed
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
const phoneExtensions = [
  { code: "+1", minDigits: 10 }, // US and Canada
  { code: "+1-809", minDigits: 10 }, // Dominican Republic
  { code: "+20", minDigits: 10 }, // Egypt
  { code: "+30", minDigits: 10 }, // Greece
  { code: "+31", minDigits: 9 }, // Netherlands
  { code: "+32", minDigits: 9 }, // Belgium
  { code: "+33", minDigits: 9 }, // France
  { code: "+34", minDigits: 9 }, // Spain
  { code: "+36", minDigits: 9 }, // Hungary
  { code: "+39", minDigits: 9 }, // Italy
  { code: "+41", minDigits: 9 }, // Switzerland
  { code: "+42", minDigits: 9 }, // Czech Republic
  { code: "+43", minDigits: 9 }, // Austria
  { code: "+44", minDigits: 10 }, // UK
  { code: "+45", minDigits: 8 }, // Denmark
  { code: "+46", minDigits: 9 }, // Sweden
  { code: "+48", minDigits: 9 }, // Poland
  { code: "+49", minDigits: 10 }, // Germany
  { code: "+52", minDigits: 10 }, // Mexico
  { code: "+55", minDigits: 11 }, // Brazil
  { code: "+60", minDigits: 9 }, // Malaysia
  { code: "+61", minDigits: 9 }, // Australia
  { code: "+62", minDigits: 10 }, // Indonesia
  { code: "+63", minDigits: 10 }, // Philippines
  { code: "+64", minDigits: 9 }, // New Zealand
  { code: "+65", minDigits: 8 }, // Singapore
  { code: "+66", minDigits: 9 }, // Thailand
  { code: "+7", minDigits: 10 }, // Russia
  { code: "+81", minDigits: 10 }, // Japan
  { code: "+82", minDigits: 10 }, // South Korea
  { code: "+86", minDigits: 11 }, // China
  { code: "+90", minDigits: 10 }, // Turkey
  { code: "+92", minDigits: 10 }, // Pakistan
  { code: "+94", minDigits: 9 }, // Sri Lanka
  { code: "+95", minDigits: 9 }, // Myanmar
  { code: "+97", minDigits: 9 }, // Saudi Arabia
  { code: "+98", minDigits: 10 }, // Iran
  { code: "+234", minDigits: 10 }, // Nigeria
  { code: "+27", minDigits: 9 }, // South Africa
  { code: "+351", minDigits: 9 }, // Portugal
  { code: "+353", minDigits: 9 }, // Ireland
  { code: "+965", minDigits: 8 }, // Kuwait
  { code: "+971", minDigits: 9 }, // United Arab Emirates
  { code: "+58", minDigits: 10 }, // Venezuela
];

const UserSignup = () => {
  const [fullName, setFullName] = useState("");
  const [extension, setExtension] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
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
    console.log("handle submit function run!");
    // console.log({ fullName, extension, phoneNumber });
    const phone = extension + phoneNumber;
    if (validate()) {
      const usersCollection = collection(db, "users");
      // Query to check if the username already exists
      const usernameQuery = query(usersCollection, where("phone", "==", phone));
      console.log("user query result:", usernameQuery);
      // Execute the query
      const querySnapshot = await getDocs(usernameQuery);
      if (!querySnapshot.empty) {
        toast.error("User With This Contact Already Exist");
      }
      // Store additional user data in Firestore
      await addDoc(collection(db, "users"), {
        fullname: fullName,
        phonenumber: phone,
        role: "user", // Default role
      });
      toast.success("User Registered Successfully!");
    }
  };

  return (
    <div className="flex flex-grow h-full absolute top-0 left-0 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3] flex-grow h-full">
        <span
          className=" absolute top-[10%] left-[5%]"
          onClick={() => router.back()}>
          <Backbutton />
        </span>
        <div className="h-full w-full flex justify-center items-center flex-col">
          <div className="h-[50vh] w-[50%] md:w-[80%] sm:w-[100%] flex justify-center items-center flex-col">
            <div className="text-white text-2xl font-bold mb-[20px]">
              VERIFY YOURSELF
            </div>
            <div className="w-[100%]  bg-gradient-to-r from-[#171E4D] to-[#13617C] p-6 sm:px-3 sm:py-9 min-h-[300px] h-[50vh] sm:h-[40vh] md:h-[40vh] lg:h-[40vh] flex justify-center items-center">
              {/* phone number input start  */}
              <form className=" flex justify-center items-center flex-col relative h-[100%] w-[100%]">
                <div className="w-[80%] sm-w[100%]">
                  <label
                    className="block mb-1 text-base font-normal text-white bg-transparent"
                    id="fullName"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}>
                    First name
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full py-3 font-light"
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

                <div className="w-[80%] sm-w[100%]">
                  <label
                    htmlFor="extension"
                    className="block mb-1 text-base font-normal text-white bg-transparent">
                    PHONE NUMBER
                  </label>
                  <div className="flex">
                    <select
                      id="extension"
                      value={extension}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[20%] sm:w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full py-3 font-light"
                      onChange={e => setExtension(e.target.value)}>
                      <option value="">COUNTRY CODE</option>
                      {phoneExtensions.map(ext => (
                        <option key={ext.code} value={ext.code}>
                          {ext.code}
                        </option>
                      ))}
                    </select>
                    <span className="mx-2 flex justify-center items-center">
                      <span className="h-[1px] w-[10px] bg-white"></span>
                    </span>
                    <input
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block sm:w-[50%] flex-grow p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full py-3 font-light"
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
            </div>
            <button
              type="submit"
              className="py-2.5 mt-[20px] px-8 sm:px-5 me-2 mb-2 text-sm text-black  focus:outline-none bg-white  border border-white hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800 dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-gray-800 hover:border-gray-800 font-bold"
              onClick={e => handleSubmit(e)}>
              Submit
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSignup;
