"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, DesSelSelect } from "@/components";

import {
  blackbuildingicon,
  industrialImage,
  renovativeImage,
  residentialImage,
  commercialImage,
} from "@/assets";

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

const cities = [
  { name: "Karachi", label: "Karachi" },
  { name: "Lahore", label: "Lahore" },
  { name: "Islamabad", label: "Islamabad" },
  { name: "Faisalabad", label: "Faisalabad" },
  { name: "Peshawar", label: "Peshawar" },
];

const PropertySelect = ({
  setStep,
  hightcustomdetail,
  setHighCustomDetail,
}) => {
  const [filters, setFilters] = useState({
    city: "Faisalabad",
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex border-b w-fit border-black pb-2 !sm:mx-auto">
        <Image
          src={blackbuildingicon}
          alt="property-icon"
          width={100}
          height={100}
          className="h-[70px] w-[70px]"
        />
        <span className="flex items-end text-xl">
          MEHRAZ <b>&nbsp;ESTATE</b>
        </span>
      </div>

      {/* City Selector Centered with Label on Right */}
      <div className="flex justify-center my-8 mb-[25px]">
        <div className="flex items-center gap-4">
          <label
            className="text-black/90 uppercase"
            style={{
              fontFamily: "FONTSPRING DEMO - Proxima Nova",
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}>
            CITY
          </label>
          <DesSelSelect
            options={[
              { label: "SELECT CITY", value: "" },
              ...cities.map(city => ({
                label: city.name,
                value: city.name,
              })),
            ]}
            selectedOption={filters.city}
            selectHandler={value => handleFilterChange("city", value)}
            customStyle={{
              container: {
                width: "180px", // reduced width
                height: "44px",
                border: "1px solid rgba(40,40,40,0.6)",
              },
              text: {
                fontSize: "14px",
                fontWeight: 400,
              },
              chevronContainer: {
                width: "50px",
                height: "44px",
              },
              chevronIcon: {
                fontSize: "16px",
              },
            }}
          />
        </div>
      </div>

      {/* Project Type Selection */}
      <p className="text-center my-8">
        <b>SELECT TYPE</b> OF PROJECT YOU REQUIRE...
      </p>

      <div className="flex justify-center items-center flex-wrap gap-8 md:gap-6 sm:gap-4 ">
        {projecttype.map((value, index) => (
          <div
            key={index}
            style={{
              boxShadow: "10px 15px 20px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "16px", // optional for softness
            }}>
            <Card
              data={value}
              setStep={setStep}
              hightcustomdetail={hightcustomdetail}
              setHighCustomDetail={setHighCustomDetail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySelect;

//chk commit!
