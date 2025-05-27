"use client";
import { DesignCarouselMain, UserScreenSpinner } from "@/components";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { teamLeadData } from "@/components/user-side/team-lead/data/data";
import TeamLeadCard from "@/components/user-side/team-lead/team-lead-card";
import Link from "next/link";

const TeamApply = () => {
  return (
    <Suspense fallback={UserScreenSpinner}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-[calc(100vh-72px)] bg-no-repeat bg-center bg-cover bg-team transparent-bg-layer z-[1] text-white">
        <div className="relative container w-auto px-8 sm:px-4 h-full flex page-top-padding page-flex-gap flex-col">
          <div className="relative flex flex-col sm:flex-col-reverse justify-center items-center gap-5 h-full">
            <p className="text-[40px] lg:text-[36px] md:text-[32px] sm:text-[28px] text-center text-white text-nowrap">
              <span className="text-center text-white">MEHRAZ </span>
              <span className="font-bold text-center text-white">TEAM</span>
            </p>

            <Link href={"/apply-at-mehraz"} className="absolute lg:relative top-0 right-0 flex justify-center items-center w-[16.375rem] md:w-[14rem] sm:w-[12rem] h-[3.5rem] md:h-[3rem] sm:h-[2.8rem] gap-[0.625rem]  rounded-full bg-white shadow-btn-shadow">
              <p className="text-[1.4rem] lg:text-xl md:text-lg text-base text-left uppercase text-[#3f3f3f] text-nowrap ">
                <span className="font-bold ">APPLY </span>
                <span>AT MEHRAZ</span>
              </p>
            </Link>
          </div>
          <DesignCarouselMain slidesCount={teamLeadData?.length}>
            {teamLeadData.map((value, index) => {
              return (
                <div className="!flex justify-center items-center">
                  <div
                    key={index}
                    className="overflow-hidden w-full !grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 page-flex-gap place-items-center">
                    {teamLeadData.map((value, index2) => (
                      <TeamLeadCard key={index2} item={value} />
                    ))}
                  </div>
                </div>
              );
            })}
          </DesignCarouselMain>
        </div>
      </motion.section>
    </Suspense>
  );
};

export default TeamApply;
