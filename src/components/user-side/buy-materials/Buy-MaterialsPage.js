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
  whitewall,
  finsih,
  couch,
  leaf,
} from "@/assets";
import Image from "next/image";
import { custom2, customicon, myVerseImage } from "@/assets";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import MaterialSelectionPage from "./MaterialSelectionPage";
import OrderList from "./OrderList";
const defaultStep1Screen2FormData = {
  city: "",
};
const materials = [
  {
    icon: whitewall,
    alt: "White wall icon",
    heading: "Building",
    content: "Grey Structure",
  },
  {
    icon: finsih,
    alt: "Finish icon",
    heading: "FINISH",
    content: "Interior",
  },
  {
    icon: couch,
    alt: "Couch icon",
    heading: "FINISH",
    content: "& Decor",
  },
  {
    icon: leaf,
    alt: "Leaf icon",
    heading: "LANDSCAPE",
    content: "& Decor",
  },
];
const BuyMaterialsPage = () => {
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
  console.log("step", step);  
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
              heading={{ normaltext: "MEHRAZ", boldtext: "MATERIALS" }}
              subheading={{
                normaltext:
                  "GREY STRUCTURE . FINISHING . LANDSCAPING . FURNITURE",
                boldtext: "",
              }}
            />
          )}
          {step === 2 && (
            <Screen2
              setStep={setStep}
              // heading={{ normaltext: "Dummy", boldtext: "Page" }}
              // subheading={{
              //   normaltext:
              //     "GREY STRUCTURE . FINISHING . LANDSCAPING . FURNITURE",
              //   boldtext: "",
              // }}
            />
          )}
          {step === 3 && <Screen3 setStep={setStep} materials={materials} />}
          {step === 4 && (
            <MaterialSelectionPage setStep={setStep} materials={materials} />
          )}
          {step === 5 && <OrderList setStep={setStep} />}
        </div>
      </motion.section>
    </Suspense>
  );
};

export default BuyMaterialsPage;
