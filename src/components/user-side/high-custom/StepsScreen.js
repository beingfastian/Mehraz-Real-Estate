"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

const StepScreenChanger = ({ changeStepScreen }) => {
  useEffect(() => {
    // Redirect to screen 1 after 3 seconds
    const screen0Timeout = setTimeout(() => {
      changeStepScreen(prev => prev + 1);
    }, 3000);

    return () => clearTimeout(screen0Timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed -z-20 min-h-full w-full top-0 right-0 flex items-center justify-center bg-[url('/custominfo.png')] bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3]">
      <div className="flex flex-col gap-3 p-8 lg:max-w-sm lg:flex-col-reverse">
        <h2 className="text-[#DEDEDE] text-4xl lg:text-6xl sm:text-5xl">
          STEP 1/2
        </h2>
        <h1 className="text-white text-6xl lg:text-4xl sm:text-3.5xl lg:border-b lg:border-b-white lg:pb-3">
          PROVIDE <strong>PROJECT INFO</strong>
        </h1>
      </div>
    </motion.div>
  );
};

export default StepScreenChanger;
