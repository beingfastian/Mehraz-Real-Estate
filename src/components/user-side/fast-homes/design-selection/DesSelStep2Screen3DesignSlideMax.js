"use client";
import { circleCheckIcon, shareGrayIcon, blackNextIcon } from "@/assets";
import Image from "next/image";
import { UButton } from "@/components";
import { useState } from "react";
import Chart from "react-google-charts";

const DesSelStep2Screen3DesignSlideMax = ({
  design,
  selectDesignHandler,
  selectSkipDesignHandler,
}) => {
  const [showChart, setShowChart] = useState(false);

  // Chart data based on design costs
  const pieChartData = [
    ["Service", "Cost"],
    ["Design", parseInt(design.designCost.replace(/,/g, "")) || 0],
    ["Construction", parseInt(design.constructionCost.replace(/,/g, "")) || 0],
  ];

  return (
    <div className="h-full flex rounded-lg shadow-btn border border-black border-opacity-25 overflow-hidden lg:flex-col-reverse shadow-lg">
      {/* Left Panel - Details (Expanded) */}
      <div className="h-full flex-1 lg:w-full lg:h-3/5 flex flex-col lg:grid lg:grid-cols-1 overflow-y-auto">
        <div className="text-black/90 lg:w-full px-5 pt-4 sm:px-2">
          <h1 className="text-xl xl:text-lg sm:text-base font-bold text-center uppercase">
            {design.area?.name || "Design Details"}
          </h1>
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <span>{design.floors?.name || "Floor Info"}</span>
            <span>•</span>
            <span>{design.familyUnit?.name || "Family Unit"}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg xl:text-base sm:text-sm text-justify mt-3 px-5 sm:px-2 flex-1">
          {design.description}
        </p>

        {/* Cost Section */}
        <div className="mt-4 px-5 sm:px-2 pb-4">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="border border-gray-300 rounded p-2">
              <h3 className="text-xs uppercase text-gray-600">Design Cost</h3>
              <p className="font-bold">PKR {design.designCost}</p>
            </div>
            <div className="border border-gray-300 rounded p-2">
              <h3 className="text-xs uppercase text-gray-600">
                Construction Cost
              </h3>
              <p className="font-bold">PKR {design.constructionCost}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mt-4 sm:mt-2 px-5 sm:px-2 pb-4 lg:pb-2 lg:w-full">
            <UButton
              onClick={selectDesignHandler}
              color="solid-gold"
              className="w-full flex items-center justify-center gap-2 text-center text-lg xl:text-base font-bold py-1.5 px-4 shadow-md"
              text={
                <>
                  <span>Explore Home</span>
                  <Image
                    src={blackNextIcon}
                    width={44}
                    height={44}
                    alt="→"
                    className="w-6 h-auto"
                  />
                </>
              }
            />
            <UButton
              onClick={selectSkipDesignHandler}
              className="w-full flex items-center shadow-md justify-center gap-2 text-lg xl:text-base font-bold py-1.5 px-4"
              color="gradient-blue-green"
              text={
                <>
                  <Image
                    src={circleCheckIcon}
                    width={24}
                    height={24}
                    alt="✓"
                    className="w-6 h-auto"
                  />
                  <span>Get Designed</span>
                </>
              }
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Image/Chart (Fixed width) */}
      <div className="h-full lg:h-2/5 aspect-[4/3] flex-shrink-0 relative">
        {showChart ? (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center p-4">
            <Chart
              chartType="PieChart"
              data={pieChartData}
              options={{
                legend: "none",
                pieSliceText: "label",
                pieHole: 0.4,
                colors: ["#4285F4", "#34A853"],
              }}
              width="100%"
              height="100%"
            />
          </div>
        ) : design.image ? (
          <Image
            src={design.image}
            alt="Design Preview"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesSelStep2Screen3DesignSlideMax;