"use client";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import PaymentTitle from "@/components/payment/paymentTitle";
import React from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { fastHomeIcon } from "@/assets";
import { UButton } from "@/components";
import Image from "next/image";
import { motion } from "framer-motion";
import useRPS from "@/hooks/useRPS";

const Payment2 = ({ setStep }) => {
  const { router, pathname, searchParams } = useRPS();

  const submitHandler = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 9);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleAdvancePayment = () => {
    setStep(8); // Set to step 4 for advance payment
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageWrapper className="flex-1 flex flex-col">
        <div className="f-col gap-[1.8125rem] mt-[20px] justify-center flex-1">
          <PaymentTitle title="PAYMENT" />
          <div
            className="payment-box-size mt-[80px] rounded-[10px] md:rounded-lg sm:rounded-md
           bg-[#dcdcdc]/25 shadow-payment-card flex-center gap-1 sm:gap-0.5">
            <p className="text-center">
              <span className="base-text font-bold text-[#606060]">
                AMOUNT =
              </span>
            </p>
            <div>
              <p className="base-text-0 font-medium text-line-through text-accent-gray-light-2 !leading-none">
                140,000
              </p>
              <p className="text-large-1 font-medium uppercase">
                <span className="text-danger">120,000</span>
                <span> </span>
                <span className="normal-text-3 font-medium text-[#2f2f2f]">
                  PKR
                </span>
              </p>
            </div>
          </div>
          <div className="flex-center gap-1">
            <svg
              className="w-4 h-4 md:w-3 md:h-3 sm:w-2.5 sm:h-2.5"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet">
              <path
                d="M8.30769 0.692307C3.71921 0.692307 0 4.41151 0 9C0 13.5885 3.71921 17.3077 8.30769 17.3077C12.8962 17.3077 16.6154 13.5885 16.6154 9C16.6154 4.41151 12.8962 0.692307 8.30769 0.692307ZM13.2075 6.83983L7.61681 12.4297C7.59419 12.4523 7.59419 12.474 7.57244 12.474L7.4837 12.5628C7.21662 12.8299 6.79291 12.8969 6.45883 12.7629C6.34747 12.7185 6.23611 12.6515 6.14738 12.5628L6.05864 12.474C6.05864 12.474 6.05864 12.4514 6.03602 12.4514L3.4077 9.82399C3.05099 9.46728 3.05099 8.86611 3.4077 8.48767L3.49644 8.39892C3.85315 8.04222 4.45431 8.04222 4.83276 8.39892L6.83724 10.4034L11.8257 5.41492C12.1824 5.05821 12.7836 5.05821 13.1621 5.41492L13.2508 5.50366C13.5857 5.8821 13.5857 6.46153 13.2073 6.83998L13.2075 6.83983Z"
                fill="#0CD350"></path>
            </svg>
            <p className="sm-text text-left text-accent-black/65">
              Satisfaction Guaranty
            </p>
          </div>
          <button
            onClick={submitHandler}
            className="payment-box-size flex-center relative bg-white/25 rounded-full border border-black/[0.15] cursor-pointer shadow-payment-box">
            <p className="payment-box-text-size">
              <span>PAY</span>
              <span className="bold"> IN FULL</span>
            </p>
          </button>
          <button
            onClick={handleAdvancePayment}
            className="payment-box-size flex-center relative bg-white/25 rounded-full border border-black/[0.15] cursor-pointer shadow-payment-box">
            <p className="payment-box-text-size">
              <span>PAY</span>
              <span className="bold"> advance</span>
            </p>
          </button>
        </div>
      </PageWrapper>

      <footer className="w-full bg-accent-gray py-3 mt-auto">
        <div className="max-w-[80%] mx-auto grid grid-cols-3 text-white text-sm font-semibold">
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <Image
                src={fastHomeIcon}
                alt="Project Icon"
                width={24}
                height={24}
              />
              <button>PROJECT</button>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <IoChatboxOutline />
              <button>CHAT</button>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <UButton
              onClick={null}
              className="flex items-center gap-2 text-[#2F2F2F] py-4 px-2"
              color="gold-gray"
              text={
                <span className="flex items-center gap-2 text-[24px] px-6">
                  <MdOutlinePayment />
                  <span>Payment</span>
                </span>
              }
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Payment2;
