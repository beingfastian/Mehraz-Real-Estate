"use client";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import DesignIcon from "./DesignIcon";
import ConstructionIcon from "./ConstructionIcon";
import MeterialsIcon from "./MeterialsIcon";
import FurnitureIcon from "./FurnitureIcon";

const Services = ({ service1, setService1 }) => {
  const handleSelect = index => {
    const updatedServices = service1.map((item, i) => ({
      ...item,
      checked: i === index,
    }));
    setService1(updatedServices);
  };

  return (
    <div className="block px-4 bg-white w-full h-[30vh] min-h-[300px] flex flex-col justify-start items-center">
      {/* Heading Row */}
      <div className="w-full flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold text-center w-full">
          AVAILED SERVICES
        </h2>
        <div className="border border-black flex h-[24px] w-[24px] rounded-full justify-center items-center mr-4">
          <FaCheck className="text-gray-500 text-sm" />
        </div>
      </div>

      {/* Subheading */}
      <p className="text-sm text-gray-400 text-center mb-4">
        Check circle to Add / Remove
      </p>

      {/* Services Buttons */}
      <div className="flex flex-col items-center gap-2 w-full">
        {service1.map((item, index) => {
          const isSelected = item.checked;

          return (
            <React.Fragment key={index}>
              <div
                onClick={() => handleSelect(index)}
                className={`flex items-center justify-start gap-3 w-[90%] p-1 py-3 rounded-full cursor-pointer transition-all duration-200 ${
                  isSelected ? "bg-[#FFEBD2]" : "bg-[#F0F0F0]"
                }`}>
                {/* Checkbox */}
                <span
                  className={`border border-black flex h-[32px] w-[32px] rounded-full justify-center items-center transition-all duration-150 ${
                    isSelected ? "bg-white opacity-100" : "bg-white opacity-40"
                  }`}>
                  {isSelected && <FaCheck className="text-black text-lg" />}
                </span>

                {/* Icon */}
                <span className="text-2xl">{item.icon}</span>

                {/* Label */}
                <span className="text-lg font-medium">{item.text}</span>
              </div>

              {/* Divider */}
              {index < service1.length - 1 && (
                <hr className="w-[90%] border-gray-300" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
