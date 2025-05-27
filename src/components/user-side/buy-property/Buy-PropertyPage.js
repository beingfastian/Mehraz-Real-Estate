"use client";
import React, { lazy, Suspense, useState } from "react";
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
const defaultStep1Screen2FormData = {
  city: "",
};
const BuyPropertyPage = () => {
  const [step, setStep] = useState(1);
  const [step1Screen2FormData, setStep1Screen2FormData] = useState(
    defaultStep1Screen2FormData,
  );
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
            <div>
              <div className="flex border-b w-fit border-black pb-2 !sm:mx-auto">
                {/* <customicon /> */}
                <Image
                  src={blackbuildingicon}
                  alt="myverse"
                  width={100}
                  height={100}
                  className="h-[70px] w-[70px]"
                />
                <span className="flex items-end text-xl">
                  MEHRAZ <b>&nbsp;ESTATE</b>
                </span>
              </div>

              <p className="text-center my-2">
                <b>SELECT TYPE</b> OF PROJECT YOU REQUIRE...
              </p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-6 sm:gap-4">
                {projecttype?.length > 0 &&
                  projecttype.map((value, index) => {
                    return (
                      <Card
                        data={value}
                        key={index}
                        setStep={setStep}
                        hightcustomdetail={hightcustomdetail}
                        setHighCustomDetail={setHighCustomDetail}
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {step === 3 && (
            <SpecificDetail
              setStep={setStep}
              hightcustomdetail={hightcustomdetail}
              setHighCustomDetail={setHighCustomDetail}
            />
          )}
        </div>
      </motion.section>
    </Suspense>
  );
};

export default BuyPropertyPage;
