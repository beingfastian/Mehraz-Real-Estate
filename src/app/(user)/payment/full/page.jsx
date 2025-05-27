"use client";
import Line from "@/components/common/Line/Line";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import PaymentTitle from "@/components/payment/paymentTitle";
import { formatNumber } from "@/helper/helper";
import React, { useState } from "react";
import { payemntServices } from "../data";
import PaymentModal from "@/components/payment/paymentModal";

const PaymentFull = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = option => {
    setSelectedOption(option);
  };
  return (
    <PageWrapper>
      <div className="f-col gap-9 items-center">
        <PaymentTitle title="final payment" />
        <div className="flex flex-row lg:flex-col gap-16 lg:gap-10 md:gap-8 sm:gap-6 items-center w-full justify-center ">
          <div class="max-w-[534px] w-full h-[492px] md:h-[400px] sm:h-[300px] rounded-[10px] md:rounded-lg sm:rounded-md bg-white/25 shadow-payment-box flex-center flex-col gap-14 lg:gap-10 md:gap-8 sm:gap-6 px-[59px] lg:px-[30px] md:px-[20px]">
            <div className="f-col gap-1 w-full">
              <p className="payment-full-box-title">
                <span className="font-bold">TOTAL </span>
                <span>PAYMENT</span>
              </p>
              <div class="payment-full-box-amount">
                <p class="payment-full-box-amount-text">AMOUNT PKR</p>
              </div>
            </div>
            <div className="f-col gap-1 w-full">
              <p className="payment-full-box-title">
                <span className="font-bold">advance </span>
                <span>PAYMENT</span>
              </p>
              <div class="payment-full-box-amount">
                <p class="payment-full-box-amount-text">
                  {formatNumber(125000)} PKR
                </p>
              </div>
            </div>
            <div className="f-col gap-1 items-center w-full">
              <p className="payment-full-box-title font-bold">
                <span>remaining </span>
                <span>PAYMENT</span>
              </p>
              <div class="payment-full-box-amount !bg-[#F8F3C7]">
                <p class="text-black opacity-75 text-large-1 text-center uppercase">
                  {formatNumber(125000)} PKR
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <p class="text-xl font-medium text-line-through text-accent-gray-light-2">
                  140,000
                </p>
                <p class="text-large-1 font-medium uppercase">
                  <span class="text-danger">120,000</span>
                  <span> </span>
                  <span class="normal-text-3 font-medium text-[#2f2f2f]">
                    PKR
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="f-col gap-12 lg:gap-10 md:gap-8 sm:gap-6 max-w-[550px] w-full">
            <div className="f-col gap-5 md:gap-4 sm:gap-3 w-full">
              <p class="opacity-70 normal-text text-center uppercase text-accent-black">
                Payment Options
              </p>
              <Line className={"w-full h-[1px] bg-accent-black"} />
            </div>
            <div className="f-col gap-[30px] lg:gap-[20px] md:gap-[15px] ">
              <div
                class={`payment-full-checkbox_container ${
                  selectedOption === payemntServices[0]
                    ? "bg-accent-gold-lightest"
                    : "bg-dull/50"
                }`}
                onClick={() => handleOptionChange(payemntServices[0])}>
                <label class="payment-full-checkbox">
                  <input
                    type="radio"
                    name="payment-option"
                    className="peer hidden"
                    checked={selectedOption === payemntServices[0]}
                    onChange={() => handleOptionChange(payemntServices[0])}
                  />
                  <div className="general-tick w-[14px] md:w-[10px] sm:w-[8px] h-[31px] md:h-[24px] sm:h-[20px] opacity-0 peer-checked:opacity-100 transition-all duration-300"></div>
                </label>
                <p class="payment-full-checkbox-text">
                  Pay through any service
                </p>
              </div>
              <div
                class={`payment-full-checkbox_container ${
                  selectedOption === payemntServices[1]
                    ? "bg-accent-gold-lightest"
                    : "bg-dull/50"
                }`}
                onClick={() => handleOptionChange(payemntServices[1])}>
                <label class="payment-full-checkbox">
                  <input
                    type="radio"
                    name="payment-option"
                    className="peer hidden"
                    checked={selectedOption === payemntServices[1]}
                    onChange={() => handleOptionChange(payemntServices[1])}
                  />
                  <div className="general-tick w-[14px] md:w-[10px] sm:w-[8px] h-[31px] md:h-[24px] sm:h-[20px] opacity-0 peer-checked:opacity-100 transition-all duration-300"></div>
                </label>
                <p class="payment-full-checkbox-text">
                  Pay through gateway
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <PaymentModal /> */}
    </PageWrapper>
  );
};

export default PaymentFull;
