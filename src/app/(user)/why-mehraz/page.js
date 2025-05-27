"use client";

import { useState, useRef } from "react";
import { videos } from "./videos";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";

export default function WhyMehraz() {
  const [activeTab, setActiveTab] = useState("why");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const getVideoSource = () => {
    switch (activeTab) {
      case "why":
        return videos[0].sources[0];
      case "how":
        return videos[1].sources[0];
      case "process":
        return videos[2].sources[0];
      default:
        return videos[0].sources[0];
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="min-h-full w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: "url(/images/whyMeeting.png)" }}
    >
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {/* Main Layout */}
        <div className="w-full flex flex-col-reverse gap-y-10 mfmd:flex-row items-center mfmd:justify-between mfxl:justify-evenly">
          {/* Tabs Section */}
          <div className="w-full mfmd:w-2/6 flex flex-col items-center mfmd:items-center mfmd:justify-center mb-8 mfmd:mb-0 mfmd:pr-8">
            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center mt-4  mfmd:flex-col mfxl:w-[90%] mfmd:pr-5 mflg:px-5  mfxl:px-20  mfmd:border-r-2  border-r-gray-400 ">
              <button
                className={`px-6 mb-2  rounded-lg py-3 text-white ${
                  activeTab === "why"
                    ? "bg-accent-gold"
                    : "bg-gray-700 hover:bg-gray-600"
                } mfxs:text-sm mfsm:text-base`}
                onClick={() => setActiveTab("why")}
              >
                WHY MEHRAZ
              </button>

              <button
                className={`px-6 mb-2 rounded-lg py-3 text-white ${
                  activeTab === "how"
                    ? "bg-accent-gold"
                    : "bg-gray-700 hover:bg-gray-600"
                } mfxs:text-sm mfsm:text-base`}
                onClick={() => setActiveTab("how")}
              >
                HOW WE WORK
              </button>

              <button
                className={`px-6 mb-2  rounded-lg py-3 text-white ${
                  activeTab === "process"
                    ? "bg-accent-gold"
                    : "bg-gray-700 hover:bg-gray-600"
                } mfxs:text-sm mfsm:text-base`}
                onClick={() => setActiveTab("process")}
              >
                OUR PROCESS
              </button>
              {/* Extra Buttons */}

          <button className="px-8 py-[3px] mt-5 text-white w-[90%] capitalize text-nowrap mx-auto rounded-full bg-gradient-to-r from-[#21254A] to-[#154556] hover:bg-gray-600">
            See What We Provide
          </button>
          <button className="px-8 py-[3px] text-white  w-[90%] text-nowrap capitalize mx-auto rounded-full bg-gradient-to-r from-[#21254A] to-[#154556] hover:bg-gray-600">
             <FaQuestionCircle className="inline text-white" /> Frequent Questions
          </button>
        
            </div>

            
          </div>

          {/* Video Player Section */}
          <div className="w-full mfmd:w-4/6 relative min-h-[100%]  aspect-video rounded-lg overflow-hidden mfxs:w-[100%] mfsm:w-[100%] ">
            <video
              ref={videoRef}
              src={getVideoSource()}
              className="min-w-full h-full object-cover"
              onEnded={() => setIsPlaying(false)}
            />

            <div
              className="absolute top-1/2 left-1/2 border-none outline-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <div className="w-20 h-20 bg-black/50 rounded-full outline-none flex items-center justify-center">
                  <FaPause className="text-white text-4xl" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-black/50 rounded-full outline-none flex items-center justify-center">
                  <FaPlay className="text-white text-4xl" />
                </div>
              )}
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
