"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { shareWhite } from "@/assets";

const ProjectStatusCard = ({
  targetDate = new Date(Date.now() + 25 * 60 * 60 * 1000 + 3 * 60 * 1000), // 1 day 3 hours from now
  projectStages = [
    { stage: 1, title: "STRUCTURAL DESIGN", status: "DONE" },
    { stage: 2, title: "STRUCTURAL DESIGN", status: "IN PROGRESS" },
    { stage: 3, title: "STRUCTURAL DESIGN", status: "LEFT" },
  ],
  isVisible = true,
  onClose,
  onContinue,
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        setTimeLeft({ days, hours });
      } else {
        setTimeLeft({ days: 0, hours: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div className="flex z-50" onClick={onClose} />

      {/* Status card */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-[83px] z-50">
        <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-2xl shadow-2xl p-6 min-w-[300px] max-w-[400px] relative overflow-hidden pt-12">
          {/* Timer section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="text-center">
                <div className="text-6xl font-bold text-white">
                  {/* {String(timeLeft.days).padStart(2, "0")} */}
                  01
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wider">
                  DAYS
                </div>
              </div>
              <div className="text-3xl text-white font-bold">:</div>
              <div className="text-center">
                <div className="text-6xl font-bold text-white">
                  {/* {String(timeLeft.hours).padStart(2, "0")} */}
                  03
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wider">
                  HOURS
                </div>
              </div>
            </div>
            <div className="text-gray-300 text-sm uppercase tracking-widest">
              L E F T
            </div>
          </div>

          {/* Continue button */}
          <div className="relative">
            <button
              onClick={onContinue}
              className="w-full bg-white text-gray-800 font-semibold py-2 px-6 rounded-full mb-6 hover:bg-gray-100 transition-colors uppercase text-lg tracking-wide">
              CONTINUE PROJECT
            </button>
            {/* Notification badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-800">
              1
            </div>
          </div>

          {/* Status section */}
          <div>
            <div className="text-center text-gray-300 text-xs uppercase tracking-wider pb-2 mb-2 border-b border-gray-600">
              STATUS
            </div>

            <div className="space-y-3">
              {projectStages.map(stage => (
                <div
                  key={stage.stage}
                  className="flex items-center justify-between border-b border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="flex-row">
                      <div
                        className={`text-xs font-bold uppercase ${
                          stage.stage === 1
                            ? "text-yellow-400"
                            : stage.stage === 2
                            ? "text-white"
                            : "text-gray-400"
                        }`}>
                        STAGE {stage.stage}
                      </div>
                      <div
                        className={`text-xs uppercase ${
                          stage.stage === 1
                            ? "text-yellow-400"
                            : stage.stage === 2
                            ? "text-white"
                            : "text-gray-400"
                        }`}>
                        {stage.title}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-xs font-bold uppercase ${
                      stage.stage === 1
                        ? "text-yellow-400"
                        : stage.stage === 2
                        ? "text-white"
                        : "text-gray-400"
                    }`}>
                    {stage.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex mt-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full shadow-2xl p-6 min-w-[300px] max-w-[400px] relative overflow-hidden items-center justify-between cursor-pointer">
          <div className="text-white text-xl">
            <b>MY MATERIALS</b> ORDER
          </div>
          <div className="z-[55]">
            <Image
              src={shareWhite}
              width={48} // size control
              height={48}
              alt="→"
              className="w-10 h-10" // makes it consistent & bigger
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProjectStatusCard;
