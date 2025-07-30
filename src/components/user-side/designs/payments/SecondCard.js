"use client";
import Nextbutton from "@/components/Nextbutton";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiCodesandboxLogoBold } from "react-icons/pi";
import Image from "next/image";
import tickIcon from "@/assets/icons/buy-materials/tickIcon.svg";
import localimg from "@/assets/images/bg.jpg";

const SecondCard = ({ service1 }) => {
  const selected = service1.find(service1 => service1.checked);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const materials = [
    {
      name: "Wood",
      vendor: "Vendor A",
      price: "120 PKR",
      image: "/materials/wood.jpg", // Use correct public folder path or import
    },
    {
      name: "Marble",
      vendor: "Vendor B",
      price: "220 PKR",
      image: "/materials/marble.jpg",
    },
    {
      name: "Tiles",
      vendor: "Vendor C",
      price: "180 PKR",
      image: "/materials/tiles.jpg",
    },
    {
      name: "Granite",
      vendor: "Vendor D",
      price: "250 PKR",
      image: "/materials/granite.jpg",
    },
    {
      name: "Steel",
      vendor: "Vendor E",
      price: "300 PKR",
      image: "/materials/steel.jpg",
    },
    {
      name: "Bricks",
      vendor: "Vendor F",
      price: "90 PKR",
      image: "/materials/bricks.jpg",
    },
    {
      name: "Paint",
      vendor: "Vendor G",
      price: "70 PKR",
      image: "/materials/paint.jpg",
    },
    {
      name: "Concrete",
      vendor: "Vendor H",
      price: "150 PKR",
      image: "/materials/concrete.jpg",
    },
    {
      name: "Glass",
      vendor: "Vendor I",
      price: "350 PKR",
      image: "/materials/glass.jpg",
    },
  ];
  const [services, setServices] = useState([
    {
      service: "DESIGN FILES",
      includes:
        "Complete architecture layout, elevations & 3D views in editable formats.",
      rate: "15 PKR/Yard",
      cost: "15 PKR/SQM",
      seeHow: "500 PKR",
    },
    {
      service: "HOME SERVICE PLANS",
      includes: "Detailed layout of utilities and home infrastructure plans.",
      rate: "12 PKR/Yard",
      cost: "14 PKR/SQM",
      seeHow: "",
    },
    {
      service: "LIFETIME ASSURANCE",
      includes:
        "Free revision support and updates for your home design forever.",
      rate: "10 PKR/Yard",
      cost: "12 PKR/SQM",
      seeHow: "",
    },
    {
      service: "CONSTRUCTION ASSISTANCE",
      includes: "Expert help during construction to ensure accurate execution.",
      rate: "18 PKR/Yard",
      cost: "20 PKR/SQM",
      seeHow: "",
    },
  ]);

  return (
    <div>
      {selected?.text === "DESIGN" && (
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-sm text-center">
          {/* Header */}
          <h1 className="text-xl font-semibold mb-1">
            <span className="font-bold">DESIGN</span> CHARGES
          </h1>
          <hr className="w-[50%] mx-auto mb-2" />

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="uppercase text-black border-b">
                <tr>
                  <th className="px-2 py-1 w-[12%]">Service</th>
                  <th className="px-2 py-1 w-[58%]">Includes</th>
                  <th className="px-2 py-1 w-[20%]">Charges</th>
                  <th className="px-2 py-1 w-[10%]">See How</th>
                </tr>
              </thead>

              <tbody>
                {services.map((value, index) => (
                  <tr
                    key={index}
                    className="bg-gray-100 hover:bg-gray-200 transition-all border-b ">
                    {/* Service */}
                    <td className="px-1 py-1 w-[12%] align-top">
                      <div className="flex items-start gap-1 bg-white px-2 py-1 rounded-full flex-row">
                        <span className="border border-black h-[14px] w-[14px] flex justify-center items-center rounded-full bg-white">
                          <FaCheck className="text-[10px]" />
                        </span>
                        <span className="text-[14px] font-semibold leading-tight">
                          {value.service}
                        </span>
                      </div>
                    </td>

                    {/* Includes */}
                    <td className="px-2 py-1">
                      <div className="bg-white border border-gray-200 rounded-lg px-2 py-1">
                        {value.includes}
                      </div>
                    </td>

                    {/* Charges */}
                    <td className="px-2 py-1">
                      <div className="flex justify-between gap-2">
                        <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-center min-w-[48%]">
                          {value.rate}
                        </div>
                        <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-center min-w-[48%]">
                          {value.cost}
                        </div>
                      </div>
                    </td>

                    {/* See How */}
                    <td className="px-2 py-1 text-right">
                      <Nextbutton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Changes Section */}
          <div className="grid grid-cols-3 justify-start items-center bg-[#ffebd2c7] text-sm px-2 py-1 mt-2 rounded-full w-full">
            <div className="font-medium">CHANGES</div>
            <div className="text-center">
              LEVEL <span className="font-bold">LOW</span>
            </div>
            <div className="flex justify-end gap-2 mr-16">
              <button className="bg-white border border-gray-300 rounded-sm px-2 py-1 shadow-sm hover:bg-gray-100">
                RATE
              </button>
              <button className="bg-white border border-gray-300 rounded-sm px-2 py-1 shadow-sm hover:bg-gray-100">
                COST
              </button>
            </div>
          </div>

          {/* Offer Section */}
          <div className="flex items-center gap-2 bg-[#FFEBD2] text-sm px-2 py-1 mt-2 rounded-full w-full">
            <span className="border border-black h-[24px] w-[24px] flex justify-center items-center rounded-full bg-white" />
            <span>OFFER</span>
            <input
              type="text"
              placeholder="Label"
              className="w-[300px] border border-gray-300 rounded px-1 text-center"
            />
            <input
              type="number"
              placeholder="%"
              className="w-[50px] border border-gray-300 rounded px-1 text-center"
            />
            <span>% OFF</span>
          </div>
        </div>
      )}
      {selected?.text === "CONSTRUCTION" && (
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-sm text-center">
          {/* Header */}
          <h1 className="text-xl font-semibold mb-1">
            <span className="font-bold">DESIGN</span> CHARGES
          </h1>
          <hr className="w-[50%] mx-auto mb-2" />

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="uppercase text-black border-b">
                <tr>
                  <th className="px-2 py-1 w-[12%]">Service</th>
                  <th className="px-2 py-1 w-[58%]">Includes</th>
                  <th className="px-2 py-1 w-[20%]">Charges</th>
                  <th className="px-2 py-1 w-[10%]">See How</th>
                </tr>
              </thead>

              <tbody>
                {services.map((value, index) => (
                  <tr
                    key={index}
                    className="bg-gray-100 hover:bg-gray-200 transition-all border-b ">
                    {/* Service */}
                    <td className="px-1 py-1 w-[12%] align-top">
                      <div className="flex items-start gap-1 bg-white px-2 py-1 rounded-full flex-row">
                        <span className="border border-black h-[14px] w-[14px] flex justify-center items-center rounded-full bg-white">
                          <FaCheck className="text-[10px]" />
                        </span>
                        <span className="text-[14px] font-semibold leading-tight">
                          {value.service}
                        </span>
                      </div>
                    </td>

                    {/* Includes */}
                    <td className="px-2 py-1">
                      <div className="bg-white border border-gray-200 rounded-lg px-2 py-1">
                        {value.includes}
                      </div>
                    </td>

                    {/* Charges */}
                    <td className="px-2 py-1">
                      <div className="flex justify-between gap-2">
                        <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-center min-w-[48%]">
                          {value.rate}
                        </div>
                        <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-center min-w-[48%]">
                          {value.cost}
                        </div>
                      </div>
                    </td>

                    {/* See How */}
                    <td className="px-2 py-1 text-right">
                      <Nextbutton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selected?.text === "MATERIALS" && (
        <div className="w-full px-2 py-2 bg-white text-center">
          <h1 className="text-xl font-semibold mb-2">
            <span className="font-bold">MATERIAL</span> SELECTION
          </h1>
          <hr className="w-[50%] mx-auto mb-4" />

          <div className="h-[340px] overflow-y-auto overflow-x-hidden px-1">
            <div className="grid grid-cols-4 gap-3">
              {materials.map((material, index) => {
                const isSelected = selectedMaterials.some(
                  item => item.name === material.name,
                );
                return (
                  <div
                    key={index}
                    className={`w-[145px] h-[150px] rounded-[10px] relative border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col ${
                      isSelected ? "bg-[#21254A]" : "bg-white"
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedMaterials(prev =>
                          prev.filter(item => item.name !== material.name),
                        );
                      } else {
                        setSelectedMaterials(prev => [...prev, material]);
                      }
                    }}>
                    {/* Material Image */}
                    <div className="w-full h-[85px] rounded-[5px] overflow-hidden relative">
                      <Image
                        src={localimg}
                        layout="fill"
                        objectFit="cover"
                        alt={`Material ${material.name}`}
                        className="w-full h-full"
                      />
                      {isSelected && (
                        <Image
                          src={tickIcon}
                          width={28}
                          height={28}
                          alt="Tick"
                          className="absolute top-[4px] right-[4px] opacity-100 transition-opacity duration-200"
                        />
                      )}
                    </div>

                    {/* Material Info */}
                    <div className="mt-1 flex-grow flex flex-col px-1">
                      <h4
                        className={`font-bold text-[15px] uppercase truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                          isSelected ? "text-white" : "text-[#1f1f1f]"
                        }`}>
                        {material.name}
                      </h4>
                      <p
                        className={`text-[14px] truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                          isSelected
                            ? "text-white opacity-80"
                            : "text-[#2f2f2f]"
                        }`}>
                        {material.vendor}
                      </p>
                      <p
                        className={`text-[14px] mt-auto rounded-full px-2 py-0.5 truncate font-[Milliard] ${
                          isSelected
                            ? "bg-white/20 text-white border-white"
                            : "bg-gray-100 border border-black opacity-80"
                        }`}>
                        {material.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {selected?.text === "FURNITURE" && (
        <div className="w-full px-2 py-2 bg-white text-center">
          <h1 className="text-xl font-semibold mb-2">
            <span className="font-bold">FURNITURE</span> SELECTION
          </h1>
          <hr className="w-[50%] mx-auto mb-4" />

          <div className="h-[340px] overflow-y-auto overflow-x-hidden px-1">
            <div className="grid grid-cols-4 gap-3">
              {materials.map((material, index) => {
                const isSelected = selectedMaterials.some(
                  item => item.name === material.name,
                );
                return (
                  <div
                    key={index}
                    className={`w-[145px] h-[150px] rounded-[10px] relative border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col ${
                      isSelected ? "bg-[#21254A]" : "bg-white"
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedMaterials(prev =>
                          prev.filter(item => item.name !== material.name),
                        );
                      } else {
                        setSelectedMaterials(prev => [...prev, material]);
                      }
                    }}>
                    {/* Material Image */}
                    <div className="w-full h-[85px] rounded-[5px] overflow-hidden relative">
                      <Image
                        src={localimg}
                        layout="fill"
                        objectFit="cover"
                        alt={`Material ${material.name}`}
                        className="w-full h-full"
                      />
                      {isSelected && (
                        <Image
                          src={tickIcon}
                          width={28}
                          height={28}
                          alt="Tick"
                          className="absolute top-[4px] right-[4px] opacity-100 transition-opacity duration-200"
                        />
                      )}
                    </div>

                    {/* Material Info */}
                    <div className="mt-1 flex-grow flex flex-col px-1">
                      <h4
                        className={`font-bold text-[15px] uppercase truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                          isSelected ? "text-white" : "text-[#1f1f1f]"
                        }`}>
                        {material.name}
                      </h4>
                      <p
                        className={`text-[14px] truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                          isSelected
                            ? "text-white opacity-80"
                            : "text-[#2f2f2f]"
                        }`}>
                        {material.vendor}
                      </p>
                      <p
                        className={`text-[14px] mt-auto rounded-full px-2 py-0.5 truncate font-[Milliard] ${
                          isSelected
                            ? "bg-white/20 text-white border-white"
                            : "bg-gray-100 border border-black opacity-80"
                        }`}>
                        {material.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondCard;
