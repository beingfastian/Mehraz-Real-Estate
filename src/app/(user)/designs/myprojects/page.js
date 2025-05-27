"use client";
import React, { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { UserScreenSpinner } from "@/components";
import { Section1 } from "@/components";
import { Carousel2 } from "@/components";
import Schedule from "@/components/user-side/myprojects/Schedule";
import { MeetSchedule } from "@/components";
const page = () => {
  const [step, setStep] = useState(1);
  return (
    <Suspense fallback={UserScreenSpinner}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] sm:p-0">
        {step == 1 && (
          <div className="max-w-8xl w-auto h-full min-h-[500px] max-h-page-user-inner mx-auto px-4 pt-8 pb-0 grid grid-cols-1  gap-16">
            <Section1 setSteps={setStep} />
            <Carousel2 />
          </div>
        )}
        {step == 2 && (
          // min-h-page-user-inner
          <div className="max-w-8xl w-auto min-h-[500px] max-h-page-user-inner mx-auto px-4 pt-8 grid grid-cols-1  gap-16 h-[80vh]">
            <Schedule setStep={setStep} />
          </div>
        )}
        {step == 3 && (
          // <div className="max-w-8xl w-auto h-full min-h-page-user-inner max-h-page-user-inner mx-auto px-4 pt-8 pb-6 grid grid-cols-1  gap-16">
          <div className="max-w-8xl w-auto min-h-[500px] max-h-page-user-inner mx-auto px-4 pt-8 grid grid-cols-1  gap-16 h-[80vh]">
            <MeetSchedule setStep={setStep} />
            {/* Schedule A MEET */}
          </div>
          // </div>
        )}
      </motion.section>
    </Suspense>
  );
};

export default page;
