"use client";
import React, { useEffect, useState } from "react";

const Loadingbar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress < 100 ? prevProgress + 1 : 100,
      );
    }, 30); // Adjust the speed by changing the interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex  justify-center items-center flex-col">
      <h1 className="text-4xl font-bold mb-[10px] sm:text-2xl">
        Creating Group
      </h1>
      <div className="w-[50%] md:w-[70%] xl:w-[70%] sm:w-[80%] bg-[#000000]  h-[15%] sm:h-[40px] md:h-[10%]">
        <div
          className="bg-[#D9BF77] h-[100%] transition-all duration-75 ease-in-out"
          style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Loadingbar;
