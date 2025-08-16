"use client";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import RadioTile from "@/components/common/RadioTile/RadioTile";
import React, { useState, useEffect } from "react";
import Level_selector from "../component/Level_selector";
import Line from "@/components/common/Line/Line";
import useRPS from "@/hooks/useRPS";
import TextareaWithUpload from "@/components/common/fileuploader/FileUploader";
import Common_btn from "@/components/common/Btns/Common_btn";
import LevelCardDesign from "./component/card";
import { useAuth } from "@/context/UserContext";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
import { toast } from "react-toastify";
import { Spinner } from "@/components";

const Unique_homes = () => {
  const { router, pathname, searchParams } = useRPS();
  const [auth] = useAuth();
  const [personalizationType, setPersonalizationType] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState("low");
  const [selectedCard, setSelectedCard] = useState(null);
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [levelPricing, setLevelPricing] = useState({
    low: { changes: "Upto 1", charges: "Free" },
    medium: { changes: "2-3", charges: "2 pkr/sft" },
    high: { changes: "4-5", charges: "3 pkr/sft" },
  });
  const [personalizedOptions, setPersonalizedOptions] = useState([
    {
      id: "interior",
      title: "Interior Design",
      label1: "fully personalized",
      label2: "upto 4x price",
      selected: false,
    },
    {
      id: "exterior",
      title: "Exterior Design",
      label1: "fully personalized",
      label2: "upto 4x price",
      selected: false,
    },
    {
      id: "landscaping",
      title: "Landscaping",
      label1: "fully personalized",
      label2: "upto 4x price",
      selected: false,
    },
    {
      id: "structural",
      title: "Structural Changes",
      label1: "fully personalized",
      label2: "upto 4x price",
      selected: false,
    },
  ]);

  // Fetch data from database on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch level pricing
        const pricingRef = doc(db, "settings", "levelPricing");
        const pricingSnap = await getDoc(pricingRef);
        if (pricingSnap.exists()) {
          setLevelPricing(pricingSnap.data());
        } else {
          await setDoc(pricingRef, levelPricing);
        }

        // Fetch personalized options
        const optionsRef = doc(db, "settings", "personalizedOptions");
        const optionsSnap = await getDoc(optionsRef);
        if (optionsSnap.exists()) {
          setPersonalizedOptions(
            optionsSnap.data().options.map(option => ({
              ...option,
              selected: false,
            })),
          );
        } else {
          const defaultOptions = personalizedOptions.map(opt => ({
            title: opt.title,
            label1: opt.label1,
            label2: opt.label2,
            id: opt.id,
          }));
          await setDoc(optionsRef, { options: defaultOptions });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load customization options");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectProjectHandler = async id => {
    // if (!auth?.user) {
    //   toast.error("Please login to continue");
    //   return;
    // }

    // Validation based on personalization type
    if (personalizationType === 1) {
      if (
        (selectedLevel === "low" && !inputValues[0]) ||
        (selectedLevel === "medium" &&
          (!inputValues[0] || !inputValues[1] || !inputValues[2])) ||
        (selectedLevel === "high" && inputValues.some(val => !val))
      ) {
        toast.error("Please fill all required fields for the selected level");
        return;
      }
    } else {
      if (!selectedCard) {
        toast.error("Please select a customization option");
        return;
      }
    }

    setLoading(true);
    try {
      // Prepare data for submission with proper null checks
      const submissionData = {
        userId: auth.user?.uid || null,
        userEmail: auth.user?.email || null,
        type: personalizationType === 1 ? "selectedChanges" : "fullPersonalize",
        level: personalizationType === 1 ? selectedLevel : null,
        changes:
          personalizationType === 1 ? inputValues.filter(val => val) : null,
        selectedOption: personalizationType === 2 ? selectedCard : null,
        description: description || null,
        fileUrl: file?.url || null,
        status: "pending",
        createdAt: new Date(),
        category: searchParams.get("category") || "general",
      };

      // Validate all required fields
      // if (!submissionData.userId) {
      //   throw new Error("User authentication failed");
      // }

      if (personalizationType === 1 && !submissionData.level) {
        throw new Error("Level selection is required");
      }

      if (personalizationType === 2 && !submissionData.selectedOption) {
        throw new Error("Customization option is required");
      }

      // Add to database
      await addDoc(collection(db, "customizationRequests"), submissionData);

      // Navigate to next step
      const newParams = new URLSearchParams(searchParams);
      newParams.set("step", 3);
      newParams.set("screen", 0);
      newParams.set("project", id);
      newParams.delete("view");
      router.push(`${pathname}?${newParams.toString()}`);

      toast.success("Your customization request has been submitted!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(`Failed to submit request: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalizeChange = e => {
    setPersonalizationType(Number(e.target.value));
    setSelectedLevel("low");
    setSelectedCard(null);
    setInputValues(["", "", "", "", ""]);
  };

  const handleLevelChange = e => {
    const newLevel = e.target.value;
    setSelectedLevel(newLevel);

    setInputValues(prevValues => {
      const newValues = [...prevValues];
      if (newLevel === "low") {
        for (let i = 1; i < newValues.length; i++) {
          newValues[i] = "";
        }
      } else if (newLevel === "medium") {
        newValues[3] = "";
        newValues[4] = "";
      }
      return newValues;
    });
  };

  const handleCardSelect = id => {
    setSelectedCard(id);
    setPersonalizedOptions(prev =>
      prev.map(opt => ({
        ...opt,
        selected: opt.id === id,
      })),
    );
  };

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleDescriptionChange = value => {
    setDescription(value);
  };

  const handleFileUpload = file => {
    setFile(file);
  };

  return (
    <PageWrapper>
      <div className="some-final-section-container">
        {loading && !file && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Spinner size="lg" className="border-white" />
          </div>
        )}

        <p className="unique-home-page-title">Lets Make Your Home Unique</p>

        {/* Personalization Type Selection */}
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

        <Line className="max-w-[65.625rem] w-full h-[1px] bg-accent-black mx-auto" />

        {personalizationType === 1 ? (
          <>
            {/* Selected Changes Section */}
            <div className="max-w-[85rem] w-full mx-auto py-3 md:py-2 px-0 sm:px-1 bg-white border border-black/10 shadow-btn-shadow unique-home-selector-container flex-row md:flex-col">
              <p className="normal-text-2 text-center text-accent-black/90 uppercase block md:flex md:gap-1">
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
                  first_label={levelPricing.low?.changes || "Upto 1"}
                  second_label={levelPricing.low?.charges || "Free"}
                  sec_label_classname={"lowercase"}
                />
                <Level_selector
                  level="level"
                  value="medium"
                  onChange={handleLevelChange}
                  checked={selectedLevel === "medium"}
                  first_label={levelPricing.medium?.changes || "2-3"}
                  second_label={levelPricing.medium?.charges || "2 pkr/sft"}
                  sec_label_classname={"uppercase"}
                />
                <Level_selector
                  level="level"
                  value="high"
                  onChange={handleLevelChange}
                  checked={selectedLevel === "high"}
                  first_label={levelPricing.high?.changes || "4-5"}
                  second_label={levelPricing.high?.charges || "3 pkr/sft"}
                  sec_label_classname={"uppercase"}
                />
              </div>
            </div>

            {/* Change Input Fields */}
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
                    placeholder="How you'd want to personalize your home?"
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
          </>
        ) : (
          <>
            {/* Fully Personalized Section */}
            <div className="w-full h-full flex flex-col items-center justify-center pt-3">
              <div className="flex flex-wrap gap-9 items-stretch justify-center">
                {personalizedOptions.map(option => (
                  <LevelCardDesign
                    key={option.id}
                    isPersonalized={true}
                    title={option.title}
                    imgSize={"w-full h-[180px]"}
                    containerPadding={"p-0"}
                    imgRounded={"rounded-[18px]"}
                    cardBodyPaddingTop={"px-3.5 py-2 pb-[30px]"}
                    radioBtnPosition={"translate-y-1/2 bottom-0"}
                    lable_1={option.label1}
                    lable_2={option.label2}
                    selected={option.selected}
                    onClick={() => handleCardSelect(option.id)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Description Section (Common for both types) */}
        <p className="normal-text-2 text-center text-accent-black uppercase mt-4">
          <span>WILL IT BE</span>
          <span className="font-bold md:font-semibold">
            {" "}
            BETTER TO DESCRIBE MORE?
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
          onTextChange={handleDescriptionChange}
          onFileUpload={handleFileUpload}
        />

        <Common_btn
          text={
            loading ? (
              <Spinner size={"sm"} className={"border-white"} />
            ) : (
              "DONE"
            )
          }
          handler={() => selectProjectHandler("unique_homes")}
          disabled={loading}
        />
      </div>
    </PageWrapper>
  );
};

export default Unique_homes;
