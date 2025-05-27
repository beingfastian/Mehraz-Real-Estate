"use client";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import RadioTile from "@/components/common/RadioTile/RadioTile";
import React, { useState } from "react";
import Level_selector from "../component/Level_selector";
import Line from "@/components/common/Line/Line";

import TextareaWithUpload from "@/components/common/fileuploader/FileUploader";
import Common_btn from "@/components/common/Btns/Common_btn";
import PersonalizedCard from "./component/PersonalizedCard";
import LevelCardDesign from "./component/card";

const Unique_homes = () => {
  const [personalizationType, setPersonalizationType] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState("low");
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);

  const handlePersonalizeChange = e => {
    setPersonalizationType(Number(e.target.value));
    setSelectedLevel("low");
    setInputValues(["", "", "", "", ""]);
  };

  const handleLevelChange = e => {
    const newLevel = e.target.value;

    setInputValues(prevValues => {
      const newValues = [...prevValues];
      if (newLevel === "low") {
        // Clear all input fields except the first one
        for (let i = 1; i < newValues.length; i++) {
          newValues[i] = "";
        }
      } else if (newLevel === "medium") {
        // Clear the last two input fields
        newValues[3] = "";
        newValues[4] = "";
      }
      return newValues;
    });
    setSelectedLevel(newLevel);
  };

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const submitHandler = () => {
    console.log(personalizationType);
  };
  return (
    <PageWrapper>
      <div className="some-final-section-container">
        <p className="unique-home-page-title">Lets Make Your Home Unique</p>
        <div className="max-w-[46.125rem] lg:max-w-[40.0625rem] w-full mx-auto h-10 md:h-9 sm:h-auto rounded-full bg-white shadow-box flex justify-center gap-[2.06rem] lg:gap-7 md:gap-5 sm:gap-1 flex-nowrap sm:flex-wrap">
          <RadioTile
            name="personalize"
            value={1}
            checked={personalizationType === 1}
            onChange={handlePersonalizeChange}
            label="SELECTED CHANGES"
            width={`min-w-[16.25rem] lg:min-w-[15rem] md:min-w-[13.75rem] sm:min-w-[12.5rem]`}
            textSize={`text-xl lg:text-xl md:text-lg sm:text-base`}
            responsive={true}
          />

          <RadioTile
            name="personalize"
            value={2}
            checked={personalizationType === 2}
            onChange={handlePersonalizeChange}
            label="full personalize"
            width={`min-w-[16.25rem] lg:min-w-[15rem] md:min-w-[13.75rem] sm:min-w-[12.5rem]`}
            textSize={`text-xl lg:text-xl md:text-lg sm:text-base`}
            responsive={true}
          />
        </div>
        <Line
          className={
            "max-w-[65.625rem] w-full h-[1px] bg-accent-black mx-auto "
          }
        />
        {personalizationType === 1 ? (
          <>
            <div className="max-w-[85rem] w-full mx-auto py-3 md:py-2 px-0 sm:px-1  bg-white border border-black/10 shadow-btn-shadow unique-home-selector-container flex-row md:flex-col">
              <p className="normal-text-2 text-center text-accent-black/90 uppercase block md:flex md:gap-1 ">
                <span>SELECT</span>
                <br className="block md:hidden" />
                <span>LEVEL</span>
              </p>
              <div className="unique-home-selector-container flex-nowrap lg:flex-wrap sm:!justify-start sm:w-full">
                <Level_selector
                  level="level"
                  value="low"
                  onChange={handleLevelChange}
                  checked={selectedLevel === "low"}
                  first_label="Upto 1"
                  second_label="Free"
                  sec_label_classname={"lowercase"}
                />
                <Level_selector
                  level="level"
                  value="medium"
                  onChange={handleLevelChange}
                  checked={selectedLevel === "medium"}
                  first_label="2-3"
                  second_label="2 pkr/sft"
                  sec_label_classname={"uppercase"}
                />
                <Level_selector
                  level="level"
                  value="high"
                  onChange={handleLevelChange}
                  checked={selectedLevel === "high"}
                  first_label="4-5"
                  second_label="3 pkr/sft"
                  sec_label_classname={"uppercase"}
                />
              </div>
            </div>
            <div className="f-col mt-2 gap-2.5 w-full justify-center items-center">
              {[...Array(5)].map((_, index) => (
                <div className="unique-home-selection-container" key={index}>
                  <div
                    className={`unique-home-selection-lable ${
                      (selectedLevel === "low" && index !== 0) ||
                      (selectedLevel === "medium" && index > 2)
                        ? "blur-effect"
                        : ""
                    }`}>
                    <p className="unique-home-tile flex-center normal-text-2 font-bold text-center text-accent-black">
                      {index + 1}
                    </p>
                  </div>
                  <input
                    type="text"
                    className={`unique-home-input ${
                      (selectedLevel === "low" && index !== 0) ||
                      (selectedLevel === "medium" && index > 2)
                        ? "blur-effect"
                        : ""
                    }`}
                    value={inputValues[index] || ""}
                    onChange={
                      selectedLevel === "high" ||
                      (selectedLevel === "medium" && index < 3) ||
                      (selectedLevel === "low" && index === 0)
                        ? e => handleInputChange(index, e.target.value)
                        : undefined
                    }
                    placeholder="How you’d want to personalize your home ?"
                    disabled={
                      (selectedLevel === "low" && index !== 0) ||
                      (selectedLevel === "medium" && index > 2)
                    }
                  />
                </div>
              ))}
            </div>
            <p className="opacity-50 text-base lg:text-base md:text-sm sm:text-xs text-center text-accent-black">
              <span>
                ONLY SMALL CHANGES ACCEPTED HERE, MAJOR CHANGES IN FLOOR PLAN /
                DESIGN IN{" "}
              </span>
              <span className="font-bold">FULLY PERSONALIZE</span>
            </p>
            <p className="normal-text-2 text-center text-accent-black uppercase">
              <span>WILL IT BE</span>
              <span className="font-bold md:font-semibold">
                {" "}
                BETTER TO DESCRIBE MORE ?
              </span>
            </p>
            <TextareaWithUpload
              style={{
                maxWidth: "max-w-[78.1875rem]",
                height: "h-[104px]",
                borderRadius: "rounded-[20px]",
                borderWidth: "border-2",
                borderColor: "border-[#2f2f2f]/60",
                textareaBorderRadius: "rounded-[20px]",
              }}
              textareaPlaceholder="TELL US ABOUT YOUR NEEDS, what your planned imagination is ..."
              referenceText="REFERENCE"
              referenceHighlight="FILE /IMG"
              maxLimitText="(max lmt)"
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center pt-3">
            <div className="flex flex-wrap gap-9 items-stretch justify-center">
              <LevelCardDesign
                isPersonalized={true}
                // level={2}
                // designLevel={designLevel}
                // handleDesignLevel={handleDesignLevel}
                title={`Interior Design`}
                imgSize={"w-full h-[180px]"}
                containerPadding={"p-0"}
                imgRounded={"rounded-[18px]"}
                cardBodyPaddingTop={"px-3.5 py-2 pb-[30px]"}
                radioBtnPosition={"translate-y-1/2 bottom-0"}
                lable_1={"fully personalized"}
                lable_2={"upto 4x price"}
              />
              <LevelCardDesign
                isPersonalized={true}
                // level={2}
                // designLevel={designLevel}
                // handleDesignLevel={handleDesignLevel}
                title={`Interior Design`}
                imgSize={"w-full h-[180px]"}
                containerPadding={"p-0"}
                imgRounded={"rounded-[18px]"}
                cardBodyPaddingTop={"px-3.5 py-2 pb-[30px]"}
                radioBtnPosition={"translate-y-1/2 bottom-0"}
                lable_1={"fully personalized"}
                lable_2={"upto 4x price"}
              />
              <LevelCardDesign
                isPersonalized={true}
                // level={2}
                // designLevel={designLevel}
                // handleDesignLevel={handleDesignLevel}
                title={`Interior Design`}
                imgSize={"w-full h-[180px]"}
                containerPadding={"p-0"}
                imgRounded={"rounded-[18px]"}
                cardBodyPaddingTop={"px-3.5 py-2 pb-[30px]"}
                radioBtnPosition={"translate-y-1/2 bottom-0"}
                lable_1={"fully personalized"}
                lable_2={"upto 4x price"}
              />
              <LevelCardDesign
                isPersonalized={true}
                // level={2}
                // designLevel={designLevel}
                // handleDesignLevel={handleDesignLevel}
                title={`Interior Design`}
                imgSize={"w-full h-[180px]"}
                containerPadding={"p-0"}
                imgRounded={"rounded-[18px]"}
                cardBodyPaddingTop={"px-3.5 py-2 pb-[30px]"}
                radioBtnPosition={"translate-y-1/2 bottom-0"}
                lable_1={"fully personalized"}
                lable_2={"upto 4x price"}
              />
            </div>
          </div>
        )}
        <Common_btn text={"DONE"} handler={submitHandler} />
      </div>
    </PageWrapper>
  );
};

export default Unique_homes;
