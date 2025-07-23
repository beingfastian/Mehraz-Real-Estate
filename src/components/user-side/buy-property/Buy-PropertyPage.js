"use client";
import React, { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserScreenSpinner,
  Screen1,
  ProjectDetails,
  DesSelStep1Screen1InputBox,
  DesSelSelect,
  Placetype,
  Card,
  SpecificDetail,
  UserProtectedRoute,
  PropertySelect,
  UserLogin,
} from "@/components";
import {
  industrialImage,
  renovativeImage,
  residentialImage,
  commercialImage,
  buildingicon,
  blackbuildingicon,
} from "@/assets";
import Image from "next/image";
import { custom2, customicon, myVerseImage } from "@/assets";
import ScheduleCall from "./ScheduleCall";
import ScheduleMeetup from "./ScheduleMeetup";
import { useRouter } from "next/navigation";
import SuccessCall from "./success-call";
import SuccessMeet from "./success-meet";

const RedirectToSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/success-apply");
  }, [router]);

  return null;
};

const defaultStep1Screen2FormData = {
  city: "",
};
const BuyPropertyPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [step1Screen2FormData, setStep1Screen2FormData] = useState(
    defaultStep1Screen2FormData,
  );
  const [meetingType, setMeetingType] = useState("oncall"); // <- default value
  const [nextStep, setNextStep] = useState(5); // default
  const [hightcustomdetail, setHighCustomDetail] = useState({});
  const step1Screen2FormDataInputHandler = (key, value) => {
    setStep1Screen2FormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const cities = [
    { name: "Karachi", label: "Karachi" },
    { name: "Lahore", label: "Lahore" },
    { name: "Islamabad", label: "Islamabad" },
    { name: "Faisalabad", label: "Faisalabad" },
    { name: "Peshawar", label: "Peshawar" },
  ];
  const projecttype = [
    {
      text: (
        <>
          <b>RESIDENTIAL</b> DESIGN
        </>
      ),
      URL: "residential",
      imagesrc: residentialImage.src, // Replace with your actual image path
    },
    {
      text: (
        <>
          {" "}
          <b>COMMERCIAL</b> DESIGN
        </>
      ),
      URL: "commercial",
      imagesrc: commercialImage.src, // Replace with your actual image path
    },
    {
      text: (
        <>
          <b>RENOVATION</b> / INTERIOR DESIGN
        </>
      ),
      URL: "renovative",
      imagesrc: renovativeImage.src, // Replace with your actual image path
    },
    {
      text: (
        <>
          <b>INDUSTRIAL</b> / OTHER
        </>
      ),
      URL: "industrial",
      imagesrc: renovativeImage.src, // Replace with your actual image path
    },
  ];
  if (step === 5 && nextStep === 6) {
    setStep(6);
  }
  return (
    <Suspense fallback={<UserScreenSpinner />}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] sm:p-0">
        <div className="max-w-8xl w-auto min-h-[500px] max-h-page-user-inner mx-auto px-4 pt-8 h-[80vh]">
          {step === 1 && (
            <Screen1
              setStep={setStep}
              heading={{ normaltext: "MEHRAZ", boldtext: "ESTATE" }}
              subheading={{
                normaltext: "GET THE",
                boldtext: "BEST REAL ESTATE IN THE COUNTRY",
              }}
            />
          )}
          {step === 2 && (
            <PropertySelect
              setStep={setStep}
              hightcustomdetail={hightcustomdetail}
              setHighCustomDetail={setHighCustomDetail}
            />
          )}
          {step === 3 && (
            <SpecificDetail
              setStep={setStep}
              hightcustomdetail={hightcustomdetail}
              setHighCustomDetail={setHighCustomDetail}
              setNextStep={setNextStep}
            />
          )}
          {step === 4 && <UserLogin setStep={setStep} />}
          {step === 5 && nextStep === 5 && <ScheduleCall setStep={setStep} />}
          {step === 6 && nextStep === 6 && <ScheduleMeetup setStep={setStep} />}
          {step === 7 && <SuccessCall setStep={setStep} />}
          {step === 8 && <SuccessMeet setStep={setStep} />}
        </div>
      </motion.section>
    </Suspense>
  );
};

export default BuyPropertyPage;
