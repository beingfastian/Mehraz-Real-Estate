"use client";
import { useState } from "react";
import { card, tiles } from "@/assets";
import Line from "@/components/common/Line/Line";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import Image from "next/image";
import React from "react";
import LevelCardDesign from "./component/card";
import Common_btn from "@/components/common/Btns/Common_btn";
import useRPS from "@/hooks/useRPS";

const Level_selection = () => {
  const { router, pathname, searchParams } = useRPS();
  const [designLevel, setDesignLevel] = useState(null);
  const handleDesignLevel = e => {
    setDesignLevel(Number(e.target.value));
  };
  const submitHandler = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 7);
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
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[80%]">
            <Line className="h-full w-[1px] bg-accent-black/20 md:hidden block" />
          </div>
          <LevelCardDesign
            level={1}
            designLevel={designLevel}
            handleDesignLevel={handleDesignLevel}
            title={"SELECTED CHANGES"}
            imgSize={"h-[20rem] md:h-[11.875rem] sm:h-[10.625rem]  w-full md:min-w-[10.625rem]"}
            imgRounded={"rounded-[5px]"}
            containerPadding={"px-3.5 md:px-3  py-3 md:py-2"}
            cardBodyPaddingTop={"pt-[1.875rem]"}
            radioBtnPosition={"-translate-y-1/2 top-0"}
            subLable_1={"Small Changes"}
            lable_1={"Upto 5"}
            lable_2={"Economic"}
          />

          <LevelCardDesign
            level={2}
            designLevel={designLevel}
            imgSize={"h-[20rem] md:h-[11.875rem] sm:h-[10.625rem]  w-full md:min-w-[10.625rem]"}
            handleDesignLevel={handleDesignLevel}
            title={"fully personalized"}
            imgRounded={"rounded-[5px]"}
            containerPadding={"px-3.5 py-3"}
            cardBodyPaddingTop={"pt-[1.875rem]"}
            radioBtnPosition={"-translate-y-1/2 top-0"}
            lable_1={"All at once "}
            lable_2={"upto 4x price"}
          />
        </div>
        <Common_btn text={"Next"} handler={submitHandler} />
      </div>
    </PageWrapper>
  );
};

export default Level_selection;
