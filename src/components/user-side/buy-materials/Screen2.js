"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  buildingicon,
  buyMaterialLightIcon,
} from "@/assets";
import { UserHeader } from "@/components";
import Image from "next/image";
import { toast } from "react-toastify";
import materialsBg from "@/assets/images/buy-materials.png";

const Screen2 = ({ setStep, heading, subheading }) => {
  const router = useRouter();
  const pathname = usePathname();

  const defaultStep1Screen2FormData = {
    city: "LAHORE",
    budget: "",
  };

  const [step1Screen2FormData, setStep1Screen2FormData] = useState(
    defaultStep1Screen2FormData
  );

  const [showCityModal, setShowCityModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const step1Screen2FormDataInputHandler = (key, value) => {
    setStep1Screen2FormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    setStep1Screen2FormData((prevState) => ({
      ...prevState,
      style: "",
    }));
  }, [step1Screen2FormData.styleCost]);

  const cities = [
    { id: 1, name: "Karachi" },
    { id: 2, name: "Lahore" },
    { id: 3, name: "Islamabad" },
    { id: 4, name: "Rawalpindi" },
    { id: 5, name: "Faisalabad" },
    { id: 6, name: "Peshawar" },
    { id: 7, name: "Quetta" },
    { id: 8, name: "Multan" },
    { id: 9, name: "Sialkot" },
    { id: 10, name: "Gujranwala" },
    { id: 11, name: "Hyderabad" },
    { id: 12, name: "Sukkur" },
    { id: 13, name: "Bahawalpur" },
    { id: 14, name: "Mardan" },
    { id: 15, name: "Sargodha" },
    { id: 16, name: "Abbottabad" },
    { id: 17, name: "Mingora" },
    { id: 18, name: "Gujrat" },
    { id: 19, name: "Rahim Yar Khan" },
    { id: 20, name: "Muzaffarabad" },
    { id: 21, name: "Jhelum" },
    { id: 22, name: "Sahiwal" },
    { id: 23, name: "Dera Ghazi Khan" },
    { id: 24, name: "Nawabshah" },
    { id: 25, name: "Mirpur Khas" },
  ];

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCityConfirm = () => {
    setShowCityModal(false);
  };

  return (
    <div className="flex flex-grow h-full absolute top-12 left-0 w-full">
      {/* Header */}
      <div className="w-full fixed top-0 left-0 z-20">
        <UserHeader />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: `url(${materialsBg.src})`,
        }}
        className="relative z-[1] min-h-full w-full flex items-center justify-center bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3]"
      >
        <div className="h-full w-full flex justify-center items-center flex-col py-4 space-y-4">
          {/* Icon */}
          <div className="w-[100px] h-[100px]">
            {pathname === "/buy-materials" && (
              <Image
                src={buyMaterialLightIcon}
                alt="building"
                priority={true}
                width={100}
                height={100}
              />
            )}
            {pathname === "/buy-property" && (
              <Image
                src={buildingicon}
                alt="building"
                priority={true}
                width={100}
                height={100}
              />
            )}
          </div>

          {/* Heading + Divider */}
          {pathname === "/buy-materials" && (
            <div className="text-center uppercase text-white/80 w-full max-w-[742px]">
              <span className="font-bold">CUSTOM DESIGNED STORE </span>
              <span className="font-normal">ONLY THE BEST FOR YOU</span>
              <div className="mt-2 border-t border-white/30 w-full mx-auto" />
            </div>
          )}
<div className="justify-center w-[40%]">
          {/* CITY Section */}
          <div className="w-full flex flex-row items-center py-2 space-x-8">
            <label className="text-white/90 uppercase text-3xl pr-2">CITY</label>
            <div className="w-full max-w-[230px] h-[67px] flex items-center justify-center bg-white/10 border border-white/30 rounded-[50px] text-white text-2xl">
              📍 {step1Screen2FormData.city}
            </div>
            <button
              onClick={() => setShowCityModal(true)}
              className="text-[#21254A] bg-white border border-[#21254A] px-4 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition"
            >
              CHANGE MY LOCATION
            </button>
          </div>

          {/* COST Section */}
          <div className="w-full flex flex-row items-center py-2 space-x-6">
            <label className="text-white/90 uppercase text-3xl">COST</label>
            <div className="grid grid-cols-2 gap-6 w-full max-w-[500px]">
              {["LOW TO HIGH", "HIGH TO LOW"].map((cost) => (
                <button
                  key={cost}
                  onClick={() =>
                    step1Screen2FormDataInputHandler("budget", cost)
                  }
                  className={`uppercase shadow-lg text-lg font-bold rounded-full h-[75px] w-full
                    ${
                      step1Screen2FormData.budget === cost
                        ? "text-white bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green"
                        : "text-[#21254A] bg-white border border-[#21254A]"
                    }`}
                >
                  {cost}
                </button>
              ))}
            </div>
          </div>
</div>
          {/* GO Button */}
          <button
            type="button"
            onClick={() => {
              if (!step1Screen2FormData.budget) {
                toast.error("Please select a cost option");
                return;
              }
              setStep((prev) => prev + 1);
            }}
            className="mt-10 w-[200px] h-[56px] flex items-center justify-center text-black font-bold text-xl uppercase bg-white border border-white rounded shadow-lg hover:bg-transparent hover:text-white transition"
          >
            GO
          </button>

          {/* Optional Heading/Subheading */}
          {heading && (
            <div className="text-4xl sm:text-3xl text-white border-b border-white text-center w-fit mt-8 pb-2">
              {heading.normaltext} <b>{heading.boldtext}</b>
            </div>
          )}
          {subheading && (
            <div
              className={`text-white text-center mt-4 ${
                pathname === "/buy-materials" ? "" : "mt-12"
              }`}
            >
              {subheading.normaltext}
              <b>{subheading.boldtext}</b>
            </div>
          )}
        </div>
      </motion.div>

      {/* City Modal */}
      {showCityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 w-[90%] max-w-[500px] max-h-[70vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-black">Change Area</h3>
              <button
                onClick={() => setShowCityModal(false)}
                className="text-black hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Enter city name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    step1Screen2FormDataInputHandler(
                      "city",
                      city.name.toUpperCase()
                    );
                    setSearchTerm("");
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200 text-black
                    ${
                      step1Screen2FormData.city === city.name.toUpperCase()
                        ? "bg-blue-100"
                        : ""
                    }
                  `}
                >
                  {city.name}
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={() => setShowCityModal(false)}
                className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                SKIP?
              </button>
              <button
                onClick={handleCityConfirm}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Screen2;
