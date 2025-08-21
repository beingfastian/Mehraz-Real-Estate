"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { UserHeader } from "@/components";
import Backbutton from "@/components/Backbutton";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "@/context/UserContext";
import { db } from "../../../Firebase/firebase"; // Adjust the path if needed

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

const UserLogin = () => {
  const [fullName, setFullName] = useState("");
  const [extension, setExtension] = useState("+92");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [auth, setAuth] = useAuth();

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
    if (validate()) {
      try {
        const phone = extension + phoneNumber;
        const usersCollection = collection(db, "users");
        // Query to check if the username already exists
        const usernameQuery = query(
          usersCollection,
          where("phonenumber", "==", phone),
        );
        const querySnapshot = await getDocs(usernameQuery);

        if (querySnapshot.empty) {
          toast.error("No User Found!");
          return;
        }

        // ✅ Set auth context here
        setAuth({
          success: true,
          user: { phone, fullName }, // whatever you want to store
        });

        toast.success("Login Successful!");
        router.push("/dashboard"); // ✅ Redirect
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred during login");
      }
    }
  };

  return (
    <div className="flex flex-grow h-full absolute top-0 left-0 w-full">
      {/* Header */}
      <div className="w-full fixed top-0 left-0 z-20">
        <UserHeader />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-full z-[1] w-full flex items-center justify-center bg-login bg-no-repeat bg-center bg-cover">
        <div className="h-full w-full flex justify-center items-center flex-col pt-[150px]">
          <div className="p-0 md:p-2 max-w-[950px] m-auto flex gap-6 w-full flex-col">
            {/* Heading with back button on the left */}
            <div className="flex items-center justify-between">
              <span
                className=" absolute top-[130px] left-[5%]"
                onClick={() => router.back()}>
                <Backbutton />
              </span>
              <p className="text-4xl lg:text-3xl md:text-2xl leading-none text-center text-white flex-grow mr-12">
                <span className="font-bold md:font-semibold">VERIFY</span>
                <span> YOURSELF</span>
              </p>
            </div>

            {/* Box with inputs */}
            <div className="login-form-container f-col items-center justify-center bg-gradient-to-r from-[#171E4D] to-[#13617C] p-4 rounded-lg">
              <form className="max-w-2xl m-auto w-full flex gap-12 md:gap-9 sm:gap-7 flex-col relative">
                {/* Name Field */}
                <div className="w-full f-col gap-3 md:gap-2">
                  <label htmlFor="fullName" className="login-label">
                    Full name
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
                    <p className="text-[#ff0000]">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="w-full f-col gap-3 md:gap-2">
                  <label htmlFor="phone" className="login-label">
                    PHONE NUMBER
                  </label>
                  <div className="flex w-full">
                    <select
                      id="extension"
                      value={extension}
                      className="!w-[123px] md:!w-[112px] sm:!w-[92px] login-input login-input-height"
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
                  {errors.phoneNumber && (
                    <p className="text-[#ff0000]">{errors.phoneNumber}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Submit button outside the container at bottom exactly centered */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex justify-center items-center w-[214px] md:w-[180px] h-14 md:h-12 relative rounded bg-white shadow-btn-shadow hover:bg-transparent hover:border-white hover:border-2 group">
                <p className="text-[22px] md:text-xl sm-text-base text-nowrap text-left uppercase text-[#3f3f3f] group-hover:text-white">
                  SUBMIT
                </p>
              </button>
            </div>

            {/* Additional small text ending line */}
            <div className="text-center text-white text-xs mt-8">
              <p>
                By continuing, you agree to our terms & policies. TERMS .
                POLICIES . REFUND
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLogin;
