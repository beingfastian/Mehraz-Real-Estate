"use client";
import React from "react";
import { motion } from "framer-motion";
import BlackButton from "@/components/user-side/BlackButton";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { fastHomeIcon } from "@/assets";
import { Backbutton, UButton } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { renovativeImage, residentialImage, commercialImage } from "@/assets";
import { Card } from "@/components";

const InitialPayment4 = ({ setStep }) => {
  const projecttype = [
    {
      text: (
        <>
          <b>LAND .</b> PLOT
        </>
      ),
      URL: "residential",
      imagesrc: residentialImage.src,
    },
    {
      text: (
        <>
          <b>COMMERCIAL</b>
        </>
      ),
      URL: "commercial",
      imagesrc: commercialImage.src,
    },
    {
      text: (
        <>
          <b>RESIDENTIAL</b>
        </>
      ),
      URL: "renovative",
      imagesrc: renovativeImage.src,
    },
    {
      text: (
        <>
          <b>OTHER</b>
        </>
      ),
      URL: "industrial",
      imagesrc: renovativeImage.src,
    },
  ];
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-full min-w-full">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-6">PAYMENT</h1>
          <p className="text-black/80 bg-gray-400 max-w-[40%] rounded-2xl mb-4 mx-auto">
            Services Availed
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-8 md:gap-6 sm:gap-4 ">
        {projecttype.map((value, index) => (
          <div
            key={index}
            style={{
              boxShadow: "10px 15px 20px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "16px", // optional for softness
            }}>
            <Card data={value} setStep={setStep} />
          </div>
        ))}
      </div>

      <Link href={"/payment"}>
        <div className="flex w-[40%] mx-auto">
          <UButton
            onClick={() => setStep(prev => prev + 1)}
            text="PAY FOR ALL"
            color="gray-white"
            className="text-base px-[30px] mx-auto mt-6 py-1 rounded-3xl"
          />
        </div>
      </Link>

      {/* Footer Navigation */}
      <footer className="w-full absolute left-0 bottom-0 bg-accent-gray py-3 mt-10">
        <div className="max-w-[80%] mx-auto grid grid-cols-3 text-white text-sm font-semibold">
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <Image
                src={fastHomeIcon}
                alt="Project Icon"
                width={24}
                height={24}
              />
              <button>PROJECT</button>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <IoChatboxOutline />
              <button>CHAT</button>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <UButton
              onClick={null}
              className="flex items-center gap-2 text-[#2F2F2F] py-4 px-2"
              color="gold-gray"
              text={
                <span className="flex items-center gap-2 text-[24px] px-6">
                  <MdOutlinePayment />
                  <span>Payment</span>
                </span>
              }
            />
          </div>
        </div>
      </footer>
    </motion.section>
  );
};

export default InitialPayment4;
