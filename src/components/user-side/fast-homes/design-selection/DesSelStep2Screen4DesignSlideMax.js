"use client";

import {
  bookmarkGrayFilledIcon,
  bookmarkGrayIcon,
  circleCheckIcon,
  shareGrayIcon,
  blackNextIcon,
} from "@/assets";
import Image from "next/image";
import { UButton } from "@/components";
import { useState } from "react";
import Chart from "react-google-charts";

const pieChartOptions = {
  legend: "none",
  pieSliceText: "label",
  backgroundColor: "transparent",
  pieSliceBorderColor: "transparent",
  tooltip: {
    textStyle: { color: "#000" },
    showColorCode: true,
  },
};

const pieChartData = [
  ["Service", "Cost"],
  ["Service 1", 2000000],
  ["Service 2", 500000],
  ["Service 3", 1000000],
  ["Service 4", 700000],
  ["Service 5", 1000000],
];

const DesSelStep2Screen4DesignSlideMax = ({
  design,
  isLocalStorageBookmarked,
  bookmarkLocalStorageHandler,
  selectDesignHandler,
  selectSkipDesignHandler,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isLocalStorageBookmarked);
  const [showChart, setShowChart] = useState(false);

  const toggleBookmark = () => {
    bookmarkLocalStorageHandler();
    setIsBookmarked(prev => !prev);
  };

  return (
    <div
      key={design.id}
      className="h-full flex rounded-lg shadow-btn border border-black border-opacity-25 overflow-hidden lg:flex-col-reverse">
      {/* Left Side (Text + Chart + Buttons) */}
      <div className="h-full w-2/5 xl:w-1/2 lg:w-full lg:h-3/5 flex flex-col lg:grid lg:grid-cols-1 overflow-y-auto">
        <div className="text-black/90 lg:w-full px-5 pt-4 sm:px-2">
          <h1 className="text-xl xl:text-lg sm:text-base font-bold text-center uppercase">
            {design.title || "Project Title"}
          </h1>
        </div>

        <p className="text-lg xl:text-base sm:text-sm text-justify mt-3 lg:mt-1 px-5 sm:px-2 flex-1 lg:w-full">
          {design.description}
        </p>

        <div className="uppercase text-black/90 mt-4 sm:mt-2 px-5 sm:px-0 lg:w-full grid grid-cols-7 lg:block">
          <div className="col-span-6 w-full flex flex-col items-center gap-1 border border-black/30 rounded p-2 relative before:absolute before:inset-0 before:z-[-1] before:shadow-btn before:opacity-60">
            <div className="text-sm font-bold w-full flex items-center justify-between px-3 py-1 border border-black/80 rounded-full">
              <h4>
                get design <span className="text-xxxs">only</span>
              </h4>
              <h4>PKR {design.designCost}</h4>
            </div>

            <div className="text-sm font-bold w-full flex items-center justify-between px-3 py-1 text-white rounded-full bg-gradient-to-r from-accent-dark-blue to-accent-sea-green opacity-90">
              <h4>
                design + material <span className="text-xxxs">(estimated)</span>
              </h4>
              <h4>PKR {design.materialCost}</h4>
            </div>
          </div>

          <div
            className="col-span-1 flex items-center justify-center cursor-pointer"
            onClick={() => setShowChart(!showChart)}>
            <Image
              src={blackNextIcon}
              alt="toggle chart"
              width={30}
              height={30}
            />
          </div>
        </div>

        {showChart && (
          <div className="px-5 py-3">
            <Chart
              chartType="PieChart"
              data={pieChartData}
              options={pieChartOptions}
              width={"100%"}
              height={"200px"}
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-4 px-5 sm:px-2 gap-2">
          <UButton
            onClick={selectSkipDesignHandler}
            className="bg-gray-300 text-black w-1/2"
            text="Skip"
          />
          <UButton
            onClick={selectDesignHandler}
            className="bg-accent-dark-blue text-white w-1/2"
            text={
              <>
                <Image
                  src={circleCheckIcon}
                  width={24}
                  height={24}
                  alt="select"
                />
                Select
              </>
            }
          />
        </div>
      </div>

      {/* Right Side (Image + Icons) */}
      <div className="h-full w-3/5 xl:w-1/2 lg:w-full lg:h-2/5 relative">
        <Image
          src={design.image}
          alt={design.title || "Design image"}
          className="h-full w-full object-cover"
          width={600}
          height={600}
        />

        {/* Bookmark & Share Icons */}
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <Image
            src={isBookmarked ? bookmarkGrayFilledIcon : bookmarkGrayIcon}
            alt="bookmark"
            width={28}
            height={28}
            onClick={toggleBookmark}
            className="cursor-pointer"
          />
          <Image
            src={shareGrayIcon}
            alt="share"
            width={28}
            height={28}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default DesSelStep2Screen4DesignSlideMax;
