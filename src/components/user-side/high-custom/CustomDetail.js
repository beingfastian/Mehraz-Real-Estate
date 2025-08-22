"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Backbutton from "@/components/Backbutton";
import TextareaWithUpload from "@/components/common/fileuploader/FileUploader";
import DesSelStep1StylesModal from "../fast-homes/design-selection/DesSelStep1StylesModal";

const CustomDetail = ({ setStep, setNextStep, styles = [] }) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("");

  const handleDescriptionChange = value => setDescription(value);
  const handleFileUpload = file => setFile(file);

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const step1Screen2FormDataInputHandler = (key, value) => {
    if (key === "style") setSelectedStyle(value);
  };

  return (
    <section className="px-4 py-6 max-w-4xl mx-auto">
      <div className="flex flex-col">
        {/* Back and Heading */}
        <div className="flex items-center gap-4 mb-8">
          <Backbutton />
          <div className="text-xl pl-2 text-gray-600">STEP 1/2</div>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-800 -pl-2">
              TELL US A LITTLE MORE
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              SO WE CREATE PERFECT DESIGN FOR YOU..
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-50 rounded-xl p-8 shadow-sm border">
          <h2 className="text-xl text-center font-medium text-gray-800 mb-6">
            <b>DESIGN PREFERENCES</b> & DETAILS{" "}
            <span className="text-gray-500 text-sm font-normal">
              (OPTIONAL)
            </span>
          </h2>

          <div className="flex gap-8">
            {/* Left Side - Text Area */}
            <div className="flex-1">
              <TextareaWithUpload
                style={{
                  maxWidth: "max-w-[37rem]",
                  height: "h-[230px]",
                  borderRadius: "rounded-[20px]",
                  borderWidth: "border-2",
                  borderColor: "border-[#2f2f2f]/60",
                  textareaBorderRadius: "rounded-[20px]",
                }}
                textareaPlaceholder="YOUR ASPIRATIONS, GOALS, NEEDS, PLANNED IMAGINATION FOR YOUR PROJECT.."
                referenceText="REFERENCE"
                referenceHighlight="FILE /IMG"
                maxLimitText="(max lmt)"
                onTextChange={handleDescriptionChange}
                onFileUpload={handleFileUpload}
              />
            </div>

            {/* Right Side - Form Fields */}
            <div className="flex-1 space-y-3">
              {/* Floors */}
              <div className="flex items-center justify-between border-b-[1px] border-gray-200 pb-3">
                <label className="text-lg font-medium text-gray-700 min-w-[120px]">
                  FLOORS
                </label>
                <input
                  type="text"
                  placeholder="ENTER"
                  className="w-48 border border-gray-300 px-3 py-2 rounded text-sm"
                />
              </div>

              {/* Budget */}
              <div className="flex items-center justify-between border-b-[1px] border-gray-200 pb-3">
                <label className="text-lg font-medium text-gray-700 min-w-[120px]">
                  BUDGET
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ENTER"
                    className="w-32 border border-gray-300 px-3 py-2 rounded text-sm"
                  />
                  <select className="w-16 border border-gray-300 px-2 py-2 rounded text-sm">
                    <option>PKR</option>
                    <option>USD</option>
                  </select>
                </div>
              </div>

              {/* Style */}
              <div className="flex items-center justify-between border-b-[1px] border-gray-200 pb-3">
                <label className="text-lg font-medium text-gray-700 min-w-[120px]">
                  STYLE
                </label>
                <button
                  onClick={toggleModal}
                  className="w-48 bg-gray-400 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-500 transition-colors">
                  {selectedStyle
                    ? styles.find(s => s.id === selectedStyle)?.name || "CHOOSE"
                    : "CHOOSE"}
                </button>
              </div>

              {/* Family Units */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-lg font-medium text-gray-700">
                    FAMILY UNITS
                  </label>
                  <div className="text-xs text-gray-500">
                    (APPLIED TO RESIDENTIAL)
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="ENTER NUMBER"
                  className="w-48 border border-gray-300 px-3 py-2 rounded text-sm"
                />
              </div>
            </div>
          </div>

          {/* Get Quote Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-gray-700 text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors font-medium">
              GET QUOTE
            </button>
          </div>
        </div>
      </div>

      {/* Style Modal */}
      <DesSelStep1StylesModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        styles={styles}
        styleCost={""}
        style={selectedStyle}
        step1Screen2FormDataInputHandler={step1Screen2FormDataInputHandler}
      />
    </section>
  );
};

export default CustomDetail;
