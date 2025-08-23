"use client";
import { DesignCarouselMain, UserScreenSpinner } from "@/components";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { teamLeadData } from "@/components/user-side/team-lead/data/data";
import TeamLeadCard from "@/components/user-side/team-lead/team-lead-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const TeamApply = () => {
  const router = useRouter();

  // 🔹 Group teamLeadData into chunks of 3 (so {1,2,3} per slide)
  const chunkedData = [];
  for (let i = 0; i < teamLeadData.length; i += 3) {
    chunkedData.push(teamLeadData.slice(i, i + 3));
  }

  return (
    <Suspense fallback={UserScreenSpinner}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-[calc(100vh-84px)] bg-no-repeat bg-center bg-cover bg-team transparent-bg-layer z-[1] text-white">
        <div className="relative container w-auto px-8 sm:px-4 h-full flex flex-col gap-10 py-10">
          {/* === TOP HEADING WITH CROSS === */}
          <div className="relative flex justify-center items-center">
            <h2 className="text-[40px] lg:text-[36px] md:text-[32px] sm:text-[28px] text-center text-white font-normal">
              WORK WITH <span className="font-bold">MEHRAZ</span>
            </h2>
            <button
              onClick={() => router.back()}
              className="absolute right-0 top-1 text-white hover:text-gray-300">
              <X size={36} />
            </button>
          </div>

          {/* === 3 APPLY BUTTONS === */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex flex-col">
              <div className="text-center">
                Become Our <b>Partner Architect</b>
              </div>
              <div className="rounded-xl py-3 px-6 mt-2 border-white border-[2px]">
                <Link
                  href="#"
                  className="w-[18rem] sm:w-[15rem] h-[3.5rem] flex justify-center items-center rounded-full border-2 border-white bg-white hover:bg-transparent text-black hover:text-white transition">
                  <span className="font-bold uppercase tracking-wide">
                    Be <b>Partner Architect</b>
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-center">
                Supply <b>Materials, & Products</b>
              </div>
              <div className="rounded-xl py-3 px-6 mt-2 border-white border-[2px]">
                <Link
                  href="#"
                  className="w-[18rem] sm:w-[15rem] h-[3.5rem] flex justify-center items-center rounded-full border-2 border-white bg-white hover:bg-transparent text-black hover:text-white transition">
                  <span className="font-bold uppercase tracking-wide">
                    Be <b>Material Supplier</b>
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-center">
                Apply As <b>Labour/Contractor/Other</b>
              </div>
              <div className="rounded-xl py-3 px-6 mt-2 border-white border-[2px]">
                <Link
                  href="/apply-at-mehraz"
                  className="w-[18rem] sm:w-[15rem] h-[3.5rem] flex justify-center items-center rounded-full border-2 border-white bg-white hover:bg-transparent text-black hover:text-white transition">
                  <span className="font-bold uppercase tracking-wide">
                    <b>Apply</b> at Mehraz
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* === TEAM HEADING === */}
          <div className="flex justify-center">
            <h2 className="text-[32px] md:text-[28px] sm:text-[24px] font-bold border-b-2 border-white pb-2">
              MEHRAZ TEAM
            </h2>
          </div>

          {/* === TEAM CARDS CAROUSEL === */}
          <DesignCarouselMain slidesCount={chunkedData.length}>
            {chunkedData.map((group, idx) => (
              <div
                key={idx}
                className="!grid !grid-cols-3 gap-6 px-4 place-items-stretch">
                {group.map((value, i) => (
                  <div key={i} className="w-full">
                    <TeamLeadCard item={value} />
                  </div>
                ))}
              </div>
            ))}
          </DesignCarouselMain>
        </div>
      </motion.section>
    </Suspense>
  );
};

export default TeamApply;
