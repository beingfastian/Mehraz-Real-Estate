"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { teamleadImages } from "@/assets/images/team-lead/team-lead-image";
import Link from "next/link";
const SuccessApply = () => {
  return (
    <div className="page-height relative flex-center p-4  pt-20 sm:pt-5">
      <div
        className="max-w-[60rem] w-full m-auto h-full flex flex-col gap-[1.9rem] 
            ">
        <div>
          <h1
            className="opacity-90 text-5xl font-bold text-center uppercase text-accent-black 
            lg:text-4xl 
            md:text-3xl 
            sm:text-2xl
            xs:text-xl">
            WE HAVE GOT YOUR info
          </h1>
          <p
            className="opacity-60 text-2xl font-bold text-center uppercase text-accent-black 
            lg:text-xl 
            md:text-lg 
            sm:text-base
            xs:text-sm">
            OUR TEAM WILL CHECK AND contact YOU asap
          </p>
        </div>
        <div className="relative w-full h-[1px] bg-accent-black opacity-80 ">
          <span
            className="absolute top-1/2 left-1/2 bg-white text-[22px] lg:text-[20px] 
            md:text-[18px] 
            sm:text-[16px] text-center text-accent-black -translate-x-1/2 -translate-y-1/2 uppercase">
            or
          </span>
        </div>

        <div
          className="cursor-pointer w-fit m-auto relative gap-2.5 px-[66px] py-[19px] rounded bg-accent-2-base shadow-btn-shadow 
            lg:px-[56px] lg:py-[16px] 
            md:px-[46px] md:py-[14px] 
            sm:px-[36px] sm:py-[12px]">
          <p className=" text-[22px] lg:text-xl md:text-lg sm:text-base font-medium text-center uppercase text-white">
            schedule A CALL
          </p>
        </div>
        <div
          className="flex xs:flex-col justify-between items-center px-[2.9rem] 
            lg:px-[2.4rem] 
            md:px-[2rem] 
            sm:px-[1.5rem] gap-2">
          <Link href={"/"} className="mini-card gap-4">
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90 
                         lg:w-[40px] lg:h-[40px] 
                         md:w-[35px] md:h-[35px] 
                         sm:w-[30px] sm:h-[30px]"
              preserveAspectRatio="xMidYMid meet">
              <path
                opacity="0.9"
                d="M44.534 21.3638L39.7136 16.5434L23.6455 0.475292C23.4961 0.324688 23.3184 0.20515 23.1226 0.123575C22.9268 0.0419992 22.7168 0 22.5047 0C22.2925 0 22.0825 0.0419992 21.8867 0.123575C21.6909 0.20515 21.5132 0.324688 21.3638 0.475292L5.29572 16.5434L0.475292 21.3638C0.324688 21.5132 0.20515 21.6909 0.123575 21.8867C0.0419992 22.0825 0 22.2925 0 22.5047C0 22.7168 0.0419992 22.9268 0.123575 23.1226C0.20515 23.3184 0.324688 23.4961 0.475292 23.6455C0.624665 23.7961 0.802381 23.9156 0.998185 23.9972C1.19399 24.0788 1.40401 24.1208 1.61613 24.1208C1.82824 24.1208 2.03826 24.0788 2.23407 23.9972C2.42987 23.9156 2.60759 23.7961 2.75696 23.6455L4.82975 21.5566V43.3932C4.82975 43.8193 4.99904 44.228 5.30037 44.5294C5.60171 44.8307 6.0104 45 6.43656 45H38.5728C38.9989 45 39.4076 44.8307 39.7089 44.5294C40.0103 44.228 40.1796 43.8193 40.1796 43.3932V21.5566L42.2524 23.6455C42.4017 23.7961 42.5794 23.9156 42.7752 23.9972C42.9711 24.0788 43.1811 24.1208 43.3932 24.1208C43.6053 24.1208 43.8153 24.0788 44.0111 23.9972C44.2069 23.9156 44.3846 23.7961 44.534 23.6455C44.6846 23.4961 44.8042 23.3184 44.8857 23.1226C44.9673 22.9268 45.0093 22.7168 45.0093 22.5047C45.0093 22.2925 44.9673 22.0825 44.8857 21.8867C44.8042 21.6909 44.6846 21.5132 44.534 21.3638ZM36.9659 41.7864H8.04337V18.343L22.5047 3.88173L36.9659 18.343V41.7864Z"
                fill="#2F2F2F"></path>
            </svg>
            <p className="mini-card-text">
              <span className="mini-card-text font-extrabold">&#x3C; </span>
              <span className="mini-card-text">go to</span>
              <span className="font-bold mini-card-text"> home</span>
            </p>
          </Link>
          <div className="mini-card gap-1">
            {" "}
            <svg
              width="54"
              height="44"
              viewBox="0 0 54 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90 
                        lg:w-[48px] lg:h-[39px] 
                        md:w-[42px] md:h-[34px] 
                        sm:w-[36px] sm:h-[30px]"
              preserveAspectRatio="none">
              <path
                opacity="0.9"
                d="M32.95 11.5664V3.3775L51.8748 21.3561L32.95 38.7038V30.1997C32.95 29.1105 32.0584 28.2438 30.9855 28.2516C23.9463 28.3028 18.1156 29.4111 13.096 31.7289C9.25624 33.502 5.94273 35.9591 2.94975 39.111C4.60274 33.6237 7.05194 28.4448 10.7487 24.1708C15.2941 18.9156 21.8007 14.94 31.2833 13.4977C32.2095 13.3568 32.95 12.5601 32.95 11.5664Z"
                stroke="#2F2F2F"
                stroke-width="2.9"></path>
            </svg>
            <p className="mini-card-text">
              <span>share &nbsp;</span>
              <span className="font-bold">mehraz</span>
              <br />
              <span>w/ others</span>
            </p>
          </div>
        </div>
        <div className="m-auto">
          <Image src={teamleadImages.brand_logo_success} alt="logo"  className="w-[152px] h-[152px] 
             lg:w-[130px] lg:h-[130px] 
             md:w-[110px] md:h-[110px] 
             sm:w-[90px] sm:h-[90px]"  />
        </div>
      </div>
    </div>
  );
};

export default SuccessApply;
