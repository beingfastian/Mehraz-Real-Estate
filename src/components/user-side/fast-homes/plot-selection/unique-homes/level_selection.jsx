"use client";
import { useState } from "react";
import { card, tiles } from "@/assets";
import Line from "@/components/common/Line/Line";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import Image from "next/image";
import React from "react";
import LevelCardDesign from "./component/card";
import useRPS from "@/hooks/useRPS";

import selected from "@/assets/images/user-side/image 38.png";
import full from "@/assets/images/user-side/image 39.png";

const Level_selection = () => {
  const { router, pathname, searchParams } = useRPS();
  const [designLevel, setDesignLevel] = useState(null);

  const handleDesignLevel = level => {
    setDesignLevel(level);

    // Navigate immediately after selection
    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 8);
    newParams.set("levelType", level);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <PageWrapper title={"Level Selection"}>
      <div className="some-final-section-container">
        <p className="unique-home-page-title">Lets Make Your Home Unique</p>
        <Line className="max-w-[65.625rem] xl:max-w-[55.625rem] lg:max-w-[45.625rem] md:max-w-[35.625rem] md:mt-1 sm:max-w-[25.625rem] w-full h-[1px] bg-accent-black/20 mx-auto" />
        <p class="normal-text text-center text-[#2f2f2f]/60">
          Select According To Level Required
        </p>
        <div className="mx-auto max-w-[48.625rem] w-full flex justify-between relative md:flex-col gap-5">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[80%] sm:hidden block">
            <div className="relative flex justify-center items-center h-full">
              {/* Vertical line */}
              <div className="h-full w-[1px] bg-accent-black/20" />

              {/* OR label */}
              <div className="absolute bg-white px-2 text-sm text-accent-black/60">
                OR
              </div>
            </div>
          </div>
          <LevelCardDesign
            level={"selected"}
            designLevel={designLevel}
            handleDesignLevel={handleDesignLevel}
            title={"SELECTED CHANGES"}
            imgSize={
              "h-[20rem] md:h-[11.875rem] sm:h-[10.625rem]  w-full md:min-w-[10.625rem]"
            }
            imgRounded={"rounded-[5px]"}
            containerPadding={"px-3.5 md:px-3  py-3 md:py-2"}
            cardBodyPaddingTop={"pt-[1.875rem]"}
            radioBtnPosition={"-translate-y-1/2 top-0"}
            subLable_1={"Small Changes"}
            lable_1={"Upto 5"}
            lable_2={"Economic"}
            imgCard={selected}
          />

          <LevelCardDesign
            level={"full"}
            designLevel={designLevel}
            imgSize={
              "h-[20rem] md:h-[11.875rem] sm:h-[10.625rem]  w-full md:min-w-[10.625rem]"
            }
            handleDesignLevel={handleDesignLevel}
            title={"fully personalized"}
            imgRounded={"rounded-[5px]"}
            containerPadding={"px-3.5 py-3"}
            cardBodyPaddingTop={"pt-[1.875rem]"}
            radioBtnPosition={"-translate-y-1/2 top-0"}
            lable_1={"All at once "}
            lable_2={"upto 4x price"}
            imgCard={full}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Level_selection;
