"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  buildingicon,
  buyMaterialDarkIcon,
  buyMaterialLightIcon,
} from "@/assets";
import { UserHeader } from "@/components";
import Image from "next/image";
import DesSelStep1Screen1InputBox from "../fast-homes/design-selection/DesSelStep1Screen1InputBox";
import DesSelSelect from "../fast-homes/design-selection/DesSelSelect";
import { toast } from "react-toastify";
import localBackgroundImage from "@/assets/images/bg.jpg";

const Screen2 = ({ setStep, heading, subheading }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const defaultStep1Screen2FormData = {
    city: "",
    budget: "Low to High",
  };

  const [step1Screen2FormData, setStep1Screen2FormData] = useState(
    defaultStep1Screen2FormData,
  );

  const step1Screen2FormDataInputHandler = (key, value) => {
    setStep1Screen2FormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
    
    const query = new URLSearchParams(router.query);
    query.set(key, value);
    router.push(`/buy-materials?${query.toString()}`);
  };

  useEffect(() => {
    setStep1Screen2FormData(prevState => ({
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

  const budget = [
    { id: 1, name: "High to Low" },
    { id: 2, name: "Low to High" },
  ];

  return (
    <div className="flex flex-grow h-full absolute top-0 left-0 w-full">
      <div className="w-full fixed top-0 left-0 z-20">
        <UserHeader />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: `url(${localBackgroundImage.src})`
        }}
        className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3] flex-grow h-full"
      >
        <div className="h-full w-full flex justify-center items-center flex-col py-20">
          {/* Icon Container */}
          <div 
            style={{
              width: "100px",
              height: "100px",
              position: "absolute",
              top: "100px",
              left: "910px",
            }}
          >
            {pathname === "/buy-materials" && (
              <Image 
                src={buyMaterialLightIcon} 
                alt="building" 
                priority={true}
                width={100}
                height={100}
              />
            )}
            {pathname === "/high-custom" && (
              <svg
                width="100"
                height="100"
                viewBox="0 0 154 158"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1780_16508)">
                  <mask
                    id="mask0_1780_16508"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="146"
                    height="150">
                    <rect
                      width="145.183"
                      height="150"
                      fill="url(#pattern0_1780_16508)"
                    />
                  </mask>
                  <g mask="url(#mask0_1780_16508)">
                    <path
                      d="M0 -3.00062H162.605V164.999H0V-3.00062Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_1780_16508"
                    x="0"
                    y="0"
                    width="153.184"
                    height="158"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="4" dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1780_16508"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1780_16508"
                      result="shape"
                    />
                  </filter>
                  <pattern
                    id="pattern0_1780_16508"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1">
                    <use
                      xlinkHref="#image0_1780_16508"
                      transform="matrix(0.0028384 0 0 0.00274725 -0.0165886 0)"
                    />
                  </pattern>
                  <image
                    id="image0_1780_16508"
                    width="364"
                    height="364"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWwAAAFsCAYAAADon4O5AAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAB7HSURBVHgB7d2NkeQ2esbxp64cgEJ4nYGcAS6DzUBwBnIExEUgOYKmI1hlsO0IdI6A4wh0GawXnunTaNQf+CRB9v9XhSqpdoZk97AfovGCoAQAcN/aFwEAhuX0GtRf3xoAYDBOfwxqAhsABmPf2qw/BzWBDQCD+O5bm72333Q7rH8TAGBTn761RbeD+tIWAQA2Ybo+Tn2r/SoAwKouwx9fM9tZAIDVOKUNf1xrvwgA0J19a59VFtSX9rMG9xcBwL79qNfx50+q8w8BALow5RUVHzUvAEBzsVd9b051SXMCADRjTurnet++FwCgiR696vetewEAUsXC4tcNWu1NNwDwNEz9C4v3GlP6ACCBU/mCTa0aAOCBSdsGdWysgw0Ad5i2HQJ531hWFQBuMNpuCOR9Y1lVALjBafsC4732RQCAf9pqFsi95gQA+Kd4I8xJ44X117djAwDodbx60ZhhvWhHeOIMgJ7ijSsxjE3j+v8BAAD/A5Xb7yKqAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>
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

          {/* Main Content Container */}
          <div 
            className={`${
              pathname === "/buy-materials" 
                ? "min-h-[500px] w-[90%] max-w-[600px]" 
                : "h-[50vh] w-[80%] max-w-[800px]"
            } flex flex-col items-center`}
          >
            {pathname === "/buy-materials" && (
              <>
                {/* Divider Line */}
                <div
                  className="absolute border-t border-white/30"
                  style={{
                    width: "600px",
                    top: "200px",
                    left: "660px",
                  }}
                />
                
                {/* Heading */}
                <div
                  className="absolute text-center uppercase text-white/80"
                  style={{
                    width: "742px",
                    height: "37px",
                    top: "222px",
                    left: "589px",
                    fontSize: "30px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  <span style={{ fontWeight: 700 }}>CUSTOM DESIGNED STORE </span>
                  <span style={{ fontWeight: 400 }}>ONLY THE BEST FOR YOU</span>
                </div>
<div className="flex flex-col items-center justify-center h-full w-full">
  {/* City Input */}
  <div className="mb-8 w-full max-w-[600px] flex items-center">
    <label 
      className="text-white/90 text-opacity-90 uppercase mr-4"
      style={{
        fontWeight: 400,
        fontSize: '36px',
        lineHeight: '100%',
        letterSpacing: '0%',
        minWidth: '120px' // Added to prevent label width jumping
      }}
    >
      CITY
    </label>
    
    <div className="relative w-[314.9px] h-[67px]">
      <DesSelSelect
        options={[
          { label: "SELECT CITY", value: "" },
          ...cities.map(city => ({ label: city.name, value: city.name })),
        ]}
        selectedOption={step1Screen2FormData.city}
        selectHandler={value => step1Screen2FormDataInputHandler("city", value)}
        className="w-full h-full"
        style={{
          borderRadius: '50px',
          border: '1px solid',
          fontWeight: 400,
          fontSize: '30px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
          padding: '0 39.36px',
          opacity: 0.65
        }}
        dropdownIndicatorStyle={{
          right: '0',
          width: '71.29px',
          height: '67px',
          borderTopRightRadius: '50px',
          borderBottomRightRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid'
        }}
        indicatorIconStyle={{
          width: '34.34px',
          height: '40px',
          transform: 'rotate(90deg)'
        }}
      />
    </div>
  </div>

  {/* Cost Input */}
  <div className="w-full max-w-[600px] flex items-center">
    <label 
      className="text-white/90 text-opacity-90 uppercase mr-4"
      style={{
        fontWeight: 400,
        fontSize: '36px',
        lineHeight: '100%',
        letterSpacing: '0%',
        minWidth: '120px' // Added to prevent label width jumping
      }}
    >
      COST
    </label>
    
    <div className="relative w-[314.9px] h-[67px]">
      <DesSelSelect
        options={budget.map(budget => ({
          label: budget.name,
          value: budget.name,
        }))}
        selectedOption={step1Screen2FormData.budget}
        selectHandler={value => step1Screen2FormDataInputHandler("budget", value)}
        className="w-full h-full"
        style={{
          borderRadius: '50px',
          border: '1px solid',
          fontWeight: 400,
          fontSize: '30px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
          padding: '0 39.36px',
          opacity: 0.65
        }}
        dropdownIndicatorStyle={{
          right: '0',
          width: '71.29px',
          height: '67px',
          borderTopRightRadius: '50px',
          borderBottomRightRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid'
        }}
        indicatorIconStyle={{
          width: '34.34px',
          height: '40px',
          transform: 'rotate(90deg)'
        }}
      />
    </div>
  </div>
</div>
<button
  type="button"
  className="text-sm text-black hover:text-white hover:bg-transparent font-bold border border-white transition-colors duration-300"
  style={{
    position: 'absolute',
    top: '709px',
    left: '860px',
    width: '200px',
    height: '56px',
    padding: '12px 80.5px', // Adjusted to center 39x32px text
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    boxShadow: '4px 4px 4px 0px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid #FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 700,
    fontSize: '26px',
    lineHeight: '32px', // Set height to 32px
    letterSpacing: '0%',
    textTransform: 'uppercase'
  }}
  onClick={() => {
    if (!step1Screen2FormData.city) {
      toast.error("Please select a city");
      return;
    }
    setStep(prev => prev + 1);
  }}
>
  <span style={{ width: '39px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    GO
  </span>
</button>
              </>
            )}

            {heading && (
              <div className="text-4xl sm:text-3xl text-white border-b border-white text-center w-fit mt-8 pb-2">
                {heading.normaltext} <b>{heading.boldtext}</b>
              </div>
            )}
          </div>

          {subheading && (
            <div className={`text-white text-center mt-4 ${pathname === "/buy-materials" ? "" : "mt-12"}`}>
              {subheading.normaltext}
              <b>{subheading.boldtext}</b>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Screen2;