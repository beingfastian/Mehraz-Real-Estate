"use client";
import React, { useState } from "react";
import phone from "../../../assets/images/admin/phone.jpg";
import pdf from "../../../assets/images/admin/pdf.jpg";
import Image from "next/image";
import { audioSvg, cameraSvg, emojiSvg, fileSvg } from "@/assets/icons/admin";
import { messages } from "@/components/data";
import {
  adminChatArrowIcon,
  hamburgerIcon,
  mediaImg,
  phoneSvg,
  profileIcon,
  teamSvg,
} from "@/assets";

export default function AdminChat({ isRecept }) {
  const [isRightSideOpen, setIsRightSideOpen] = useState(false);
  const [isLeftSideOpen, setIsLeftSideOpen] = useState(false);
  const toggleRightSide = () => {
    setIsRightSideOpen(!isRightSideOpen);
  };
  const toggleLeftSide = () => {
    setIsLeftSideOpen(!isLeftSideOpen);
  };
  return (
    <div className="w-full admin-page-height flex p-6 gap-4 transition-all duration-300 relative ">
      {/* Left Sidebar */}
      <div
        className={`bg-white max-w-[272px] relative xl:fixed top-0 xl:left-0 h-auto xl:h-full  z-0 xl:z-50  overflow-y-auto p-4 rounded-md shadow-lg ${
          isLeftSideOpen ? "w-0 hidden" : "w-full block"
        }`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold  mb-4">Group IDs</h2>
          <svg
            className="w-3.5 h-[13px] hidden xl:block cursor-pointer"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            onClick={toggleLeftSide}>
            <line
              opacity="0.6"
              x1="14.7071"
              y1="0.707107"
              x2="1.70711"
              y2="13.7071"
              stroke="black"
              stroke-width="2"></line>
            <line
              opacity="0.6"
              y1="-1"
              x2="18.3848"
              y2="-1"
              transform="matrix(0.707107 0.707107 0.707107 -0.707107 2 0)"
              stroke="black"
              stroke-width="2"></line>
          </svg>
        </div>
        <ul className="space-y-2 w-full">
          {Array.from({ length: 5 }, (_, i) => (
            <li
              key={i}
              className=" bg-accent-1-base py-4 md:py-3 sm:py-2 px-[23px] md:px-[18px] sm:px-[13px] rounded-[18px] md:rounded-[13px] sm:rounded-[8px] hover:bg-accent-1-base/80 cursor-pointer bold base-text text-center">
              GROUP ID #{i + 456623}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full  relative overflow-y-auto flex rounded-[50px] bg-[#dcdcdc]">
        {/* left-side start */}
        <div
          className={`px-[2.1rem] py-4 f-col justify-between ${
            isRightSideOpen ? "w-full" : "w-9/12 xl:w-full"
          }`}>
          {/* top start */}
          <div className="py-4 md:py-3 sm:py-2 md:h-auto bg-white rounded-full grid grid-cols-3 gap-0 md:gap-2 grid-rows-1 md:grid-rows-2 relative">
            <div className="flex items-center pl-5 md:pl-10 sm:pl-5 col-start-1 col-end-2">
              <Image
                src={hamburgerIcon}
                alt="hamburger"
                className="!w-[33.84px] !h-[28.2px] cursor-pointer"
                onClick={toggleLeftSide}
              />
            </div>
            <div className="base-text w-full text-nowrap flex-center  font-bold text-center text-black col-start-2 md:col-start-1  col-end-3 md:col-end-4 row-start-1 md:row-start-2">
              GROUP ID #456623
            </div>
            <div className="col-start-3 col-end-4 pr-5 md:pr-10 sm:pr-5 flex gap-2 bg-transparent justify-end items-center">
              <Image
                src={phoneSvg}
                alt="phone"
                className="!w-[33.84px] !h-[28.2px]"
              />
              <div
                className="w-[35px] h-[27px] cursor-pointer"
                onClick={toggleRightSide}>
                <Image src={teamSvg} alt="team" className="!w-full !h-full" />
              </div>
            </div>
          </div>

          {/* middle start */}
          <div className="h-full overflow-y-auto">
            <div className="h-full overflow-y-auto p-4 ">
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex items-start ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}>
                    {message.type === "admin" && (
                      <Image
                        src={message.profileImg}
                        alt="Admin"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg first-letter:uppercase relative ${
                        message.type === "user"
                          ? "bg-white rounded-tr-none text-black"
                          : "bg-gray-400 rounded-tl-none text-white"
                      }`}>
                      <div
                        className={`absolute w-0 top-0 ${
                          message.type === "user"
                            ? "triangle-topleft -right-[10px]"
                            : "triangle-topRight -left-[10px]"
                        }`}></div>
                      <div className="flex flex-col items-end">
                        <span className="capitalize-first-letter">{message.text}</span>
                        <span className="text-xs opacity-70 mt-1">
                          {"12:30 pm"}
                        </span>
                      </div>
                    </div>
                    {message.type === "user" && (
                      <Image
                        src={message.profileImg}
                        alt="User"
                        className="w-10 h-10 rounded-full ml-3"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* bottom start */}
          <div className="flex  w-full items-center gap-4">
            <div className="w-full h-[60px] rounded-full bg-white flex items-center justify-between px-7 py-3">
              <div className="flex items-center gap-5 w-full flex-1">
                <Image
                  src={emojiSvg}
                  alt="bell"
                  priority={true}
                  className="cursor-pointer"
                />
                <input
                  className="w-full p-0 !border-none !outline-none !outline-0 resize-none placeholder:opacity-60 placeholder:text-black placeholder:text-1.5xl text-1.5xl uppercase placeholder:flex placeholder:items-center custom-scroll focus:ring-0 focus:outline-none"
                  placeholder="type here..."
                />
              </div>
              <div className="flex items-center gap-5">
                <Image
                  src={fileSvg}
                  alt="bell"
                  priority={true}
                  className="cursor-pointer"
                />
                <Image
                  src={cameraSvg}
                  alt="bell"
                  priority={true}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="w-[72.3px] h-[60.25px] rounded-full bg-white flex-center cursor-pointer">
              <Image src={audioSvg} alt="bell" priority={true} />
            </div>
          </div>
        </div>
        {/* left-side end */}

        {/* right-side start */}
        <div
          className={`bg-transparent transition-all duration-300  h-auto xl:h-full xl:bg-black/30 backdrop-blur-sm relative xl:absolute right-auto xl:right-0 ${
            isRightSideOpen ? "hidden w-0" : "block w-1/3 xl:w-full"
          }`}>
          <div
            // className={`ml-auto w-full h-full xl:w-1/2 overflow-y-auto transition-all duration-300  rounded-tr-[50px] rounded-br-[50px] bg-[#efefef] py-4 px-5 right-0 relative`}
            className={`ml-auto w-full h-full xl:w-1/2 overflow-y-auto transition-all duration-300  rounded-[50px] bg-[#efefef] py-4 px-5 right-0 relative`}>
            <div
              className="absolute cursor-pointer top-4 left-[5%] right-auto xl:left-auto xl:right-[5%]"
              onClick={toggleRightSide}>
              <div class="flex  w-[50px] h-[50px] relative gap-2.5 rounded-full bg-[#efefef]/60 shadow-btn-shadow flex-center">
                <Image
                  src={adminChatArrowIcon}
                  alt="close"
                  className="w-3 h-6 md:w-2.5 sm:w-2 md:h-5 sm:h-4"
                />
              </div>
            </div>
            <p className="text-lg pt-4 font-bold text-center text-black">
              PROJECT TEAM
            </p>

            {/* top start */}
            <div className="f-col gap-2.5 w-full pt-7">
              <div className="customer-support-chat-right">
                <div className="customer-support-chat-right-inner-left">
                  <Image
                    src={profileIcon}
                    alt="profile"
                    className="admin-chat-profile-icon"
                  />
                  <p className="admin-chat-profile-left-text">Muhammad Saqib</p>
                </div>
                <div className="customer-support-chat-right-inner-right">
                  <p className="admin-chat--right-side-lable">architect</p>
                </div>
              </div>
              <div className="customer-support-chat-right">
                <div className="customer-support-chat-right-inner-left">
                  <Image
                    src={profileIcon}
                    alt="profile"
                    className="admin-chat-profile-icon"
                  />
                  <p className="admin-chat-profile-left-text">Muhammad Saqib</p>
                </div>
                <div className="customer-support-chat-right-inner-right">
                  <p className="admin-chat--right-side-lable">client</p>
                </div>
              </div>
              <div className="customer-support-chat-right">
                <div className="customer-support-chat-right-inner-left">
                  <Image
                    src={profileIcon}
                    alt="profile"
                    className="admin-chat-profile-icon"
                  />
                  <p className="admin-chat-profile-left-text">Muhammad Saqib</p>
                </div>
                <div className="customer-support-chat-right-inner-right">
                  <p className="admin-chat--right-side-lable">client</p>
                </div>
              </div>
            </div>
            {/* top end */}

            {/* bottom start */}
            <div className=" f-col">
              <p className="admin-chat-profile-left-text bold py-5 !text-center">
                FILES
              </p>
              <div className="grid grid-cols-1 gap-5 items-start relative ">
                {/* <div className="w-[2px] h-[calc(100%-1.5rem)] bg-black opacity-60 absolute mt-6  bottom-0 left-1/2 -translate-x-1/2 mt"></div> */}
                <div className="f-col flex-1 w-full gap-3">
                  {/* <p className="opacity-60 text-base uppercase font-bold text-center text-black">
                    TEAMS
                  </p> */}
                  {/* first start */}

                  <div className="customer-support-chat-right-inner-box">
                    <p className="admin-chat-document-head-text">Media</p>
                    <div className="relative ">
                      <div className="admin-chat-document-slider-arrow">
                        <Image
                          src={adminChatArrowIcon}
                          alt="arrow"
                          className="admin-chat-document-slider-arrow-img"
                        />
                      </div>
                      <div className="admin-chat-document--img-container">
                        <Image
                          src={mediaImg}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={mediaImg}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={mediaImg}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={mediaImg}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={mediaImg}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={mediaImg}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={mediaImg}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={mediaImg}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                      </div>
                    </div>
                  </div>
                  {/* first end */}

                  {/* second start */}
                  <div className="customer-support-chat-right-inner-box ">
                    <p className="admin-chat-document-head-text">Documents</p>
                    <div className="relative ">
                      <div className="admin-chat-document-slider-arrow">
                        <Image
                          src={adminChatArrowIcon}
                          alt="arrow"
                          className="admin-chat-document-slider-arrow-img"
                        />
                      </div>
                      <div className="admin-chat-document--img-container">
                        <Image
                          src={pdf}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={pdf}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={pdf}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={pdf}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={pdf}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={pdf}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={pdf}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                        <Image
                          src={mediaImg}
                          alt="media"
                          className="admin-chat-document-img"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="customer-support-chat-right-inner-box  f-col gap-0.5 ">
                    <p className="admin-chat--right-side-lable">
                      PDFS
                    </p>
                    <div className="f-col gap-3">
                      <p className="base-italic-text">IMG 32342</p>
                      <p className="base-italic-text">IMG 32342</p>
                      <p className="base-italic-text">IMG 32342</p>
                    </div>
                  </div> */}
                  {/* second end */}

                  {/* third start */}
                  <div className="customer-support-chat-right-inner-box  f-col gap-0.5 ">
                    <p className="admin-chat-document-head-text">links</p>
                    <div className="f-col gap-1 ">
                      <p className="base-italic-text">
                        IMG 32342IMG 32342IMG 3234ttt2
                      </p>
                      <p className="base-italic-text">
                        IMG 32342IMG 32342IMG 3234ttt2
                      </p>
                      <p className="base-italic-text">
                        IMG 32342IMG 32342IMG 3234ttt2
                      </p>
                    </div>
                  </div>
                  {/* third end */}
                </div>
                {/* <div className="f-col flex-1 w-full gap-1.5 ">
                  <p className="opacity-60 text-base uppercase font-bold text-center text-black">
                    client
                  </p>
                  <div className="customer-support-chat-right-inner-box  f-col gap-0.5 ">
                    <p className="admin-chat--right-side-lable">
                      PDFS
                    </p>
                    <div className="f-col gap-3">
                      <p className="base-italic-text">IMG 32342</p>
                      <p className="base-italic-text">IMG 32342</p>
                      <p className="base-italic-text">IMG 32342</p>
                    </div>
                  </div>
                  <div className="customer-support-chat-right-inner-box  f-col gap-0.5 ">
                    <p className="admin-chat--right-side-lable">
                      PDFS
                    </p>
                    <div className="f-col gap-3">
                      <p className="base-italic-text">IMG 32342</p>
                      <p className="base-italic-text">IMG 32342</p>
                      <p className="base-italic-text">IMG 32342</p>
                    </div>
                  </div>
                  <div className="customer-support-chat-right-inner-box  f-col gap-0.5 ">
                    <p className="admin-chat--right-side-lable">
                      LINKS
                    </p>
                    <div className="f-col gap-3">
                      <p className="base-italic-text">IMG 32342</p>
                      <p className="base-italic-text">IMG 32342</p>
                      <p className="base-italic-text">IMG 32342</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* bottom end */}
          </div>
        </div>
        {/* right-side end */}
      </div>
      {/* Main Section start*/}
    </div>
  );
}

{
  /* Chat Section */
}
{
  /* <div className="flex-1 bg-white p-6 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">GROUP ID #456623</h2>
            <button className="text-blue-700 hover:text-blue-900">
              📞 Call
            </button>
          </div>
          <div className="bg-gray-100 rounded-md p-4 min-h-[300px] mb-4"></div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type here..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 mr-2"
            />
            <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
              ✏️
            </button>
            <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 ml-2">
              📎
            </button>
          </div>
        </div> */
}

{
  /* Right Sidebar */
}
{
  /* <div className="bg-white w-[20%] min-w-[250px] p-4 rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Project Team</h2>
          <ul className="space-y-2 mb-6">
            {["A. Rahman", "M. Saqib"].map((member, i) => (
              <li key={i} className="text-sm">
                {i + 1}. {member}
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mb-4">Files</h2>
          <ul className="space-y-2">
            {Array.from({ length: 5 }, (_, i) => (
              <li
                key={i}
                className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
              >
                File-{i + 1}.pdf
              </li>
            ))}
          </ul>
        </div> */
}
