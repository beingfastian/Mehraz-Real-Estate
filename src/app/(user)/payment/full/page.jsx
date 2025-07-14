"use client";
import Line from "@/components/common/Line/Line";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import PaymentTitle from "@/components/payment/paymentTitle";
import { formatNumber } from "@/helper/helper";
import React, { useState } from "react";
import Image from "next/image";
import { bankIcon, QRScanImage } from "@/assets";
import { payemntServices } from "../data";
import PaymentModal from "@/components/payment/paymentModal";
import BlackButton from "../../../../components/user-side/BlackButton";
import { IoIosAdd } from "react-icons/io";
import { FaTimes, FaRegCopy } from "react-icons/fa";
import { useRouter } from "next/navigation";

const PaymentFull = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [pageState, setPageState] = useState("summary"); // "summary", "paymentMethod"
    const [showPopup, setShowPopup] = useState(false);
      const router = useRouter();
  const handleOptionChange = option => {
    setSelectedOption(option);
  };

    const paymentInfo = {
    accountName: "MEHRAZ SMC PRIVATE LIMITED",
    bank: "United Bank Limited (UBL)",
    branch: "Valencia Society, Lahore, Pakistan\nA5, Block D, Commercial Zone",
    accountNumber: "0310-312439851",
    iban: "PK04UNIL0109000312439851",
    swiftCode: "UNILPKKA",
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };
  const totalPrice = 120000; // You can move this to props or backend later
  return (
    <PageWrapper>
      <div className="f-col gap-9 items-center">
        <PaymentTitle title="payment" />
        {pageState === "summary" && (
        <div className="flex flex-col lg:flex-col gap-8 lg:gap-10 md:gap-8 sm:gap-6 items-center w-full justify-center ">
<div className="f-col max-w-[550px] w-full mt-[80px]">
  <div className="flex justify-center w-full">
    <div
      className="w-[65%] p-4 text-center bg-white rounded-md base-text bold text-[#606060] py-[30px]"
      style={{ boxShadow: "0px 0px 10px 8px rgba(0, 0, 0, 0.1)" }}
    >
      AMOUNT = <b className="bold text-[28px] text-black">{totalPrice}</b> PKR
    </div>
  </div>
</div>

              <Line className={"w-[500px] h-[1px] bg-accent-black opacity-30"} />
          <div className="f-col gap-12 lg:gap-10 md:gap-8 sm:gap-6 max-w-[550px] w-full">
            <div className="f-col gap-5 md:gap-4 sm:gap-3 w-full">
              <p class="opacity-70 normal-text text-center uppercase text-accent-black">
                Payment Options
              </p>
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
    {/* Black button */}
<div className="flex-center justify-center mt-8">
            <BlackButton onclickfunction={() => setPageState("paymentMethod")}   customClass="text-[29px] font-thin px-[60px] py-[20px] rounded-[8px] shadow-md shadow-gray-400" />
</div>
        </div>
        
        )}

{pageState === "paymentMethod" && (
        <div className="w-full pt-[130px] flex flex-row lg:flex-col items-stretch lg:items-center justify-center h-full gap-[81px] lg:gap-[40px] md:gap-[20px] sm:gap-[10px]">
          {/* left start */}
          <div className="max-w-[467px] pt-[25px] f-col items-end gap-[34px] md:gap-[20px] sm:gap-[10px] w-full">
            <div className="max-w-[375px] w-full rounded-[10px] md:rounded-lg sm:rounded-md bg-white/25 py-2.5 md:py-2 sm:py-1.5 shadow-payment-box flex-center">
              <div className="base-text bold text-[#606060]">AMOUNT =</div>
              <div>
                <p className="base-text-0 font-medium md:font-normal text-line-through text-accent-gray-light-2">
                  140,000
                </p>
                <div className="text-large-1 font-medium md:font-normal uppercase">
                  <span className="text-danger">120,000</span>
                  <span> </span>
                  <span className="normal-text-3 font-medium text-[#2f2f2f]">
                    PKR
                  </span>
                </div>
              </div>
            </div>
            <div className="max-w-[452.39px] w-full py-2.5 md:py-2 sm:py-1.5 rounded-[50px] md:rounded-[40px] sm:rounded-[35px] bg-[#5680f5] flex justify-between items-center px-[47px] md:px-[35px] sm:px-[30px] gap-5">
              <div className="f-col gap-5">
                <p className="normal-text bold text-left uppercase text-white">
                  scan to pay
                </p>
                <div className="text-xs text-left uppercase text-white">
                  <span className="text-xs font-bold text-left uppercase text-white">
                    scan qr
                  </span>
                  <span> </span>
                  <span className="text-xs text-left uppercase text-white">
                    W/ your payment app
                  </span>
                </div>
              </div>
              <div className="max-w-[210px] h-auto bg-white rounded-xl md:rounded-lg sm:rounded-md">
                <Image
                  src={QRScanImage}
                  alt="QR Scan"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
          {/* left end */}

          {/* mid start */}
          <div>
            <Line className="h-full w-[1px] bg-black/40" />
          </div>
          {/* mid end */}

          {/* right start */}
          <div className="max-w-[478px] w-full f-col gap-6 md:gap-5 sm:gap-4">
            <div className="base-text-0 text-left uppercase text-accent-black">
              <span className="bold">pay through any service</span>
              <span> to this account, upload payment receipt here</span>
            </div>
            <div className="payment-advance-box--right-container">
              <div className="payment-advance-box--right-text">
                <span>ACCOUNT</span>
                <span className="bold"> DETAILS</span>
              </div>
              <div className="w-full pt-3 md:pt-2.5 sm:pt-2 pb-3.5 md:pb-3 sm:pb-2.5 rounded-[10px] md:rounded-lg sm:rounded-md bg-white hover:bg-gray-100 transition-all duration-300 border border-black/70 shadow-payment-box-shadow flex-center gap-3.5 md:gap-2.5 sm:gap-2 cursor-pointer">
                <Image
                  src={bankIcon}
                  alt="bank icon"
                  className={`w-[30px] md:w-[25px] sm:w-[20px] h-[30px] md:h-[25px] sm:h-[20px] object-contain`}
                />

                <div className="opacity-70 base-text text-left text-black" onClick={() => setShowPopup(true)}>
                  <span>
                    View{" "}
                  </span>
                  <span className="bold">
                    Payment Details
                  </span>
                </div>
              </div>
            </div>

            <div className="payment-advance-box--right-container">
            <div className="payment-advance-box--right-text">
                <span>Transaction</span>
                <span className="bold"> Receipt</span>
              </div>


              <div className="w-full py-[9px] md:py-[7px] sm:py-[5px] rounded-full bg-[#efefef]/50 hover:bg-gray-100 transition-all duration-300 border border-black/[0.15] shadow-copy flex-center gap-3.5 cursor-pointer">
                <div className="w-[36px] md:w-[30px] sm:w-[25px] h-[36px] md:h-[30px] sm:h-[25px] rounded-full bg-accent-black opacity-60 flex-center">

                  <IoIosAdd className="text-white w-[30px] md:w-[25px] sm:w-[20px] h-[30px] md:h-[25px] sm:h-[20px]" />
                </div>
                <p className="opacity-70 normal-text bold text-center text-black uppercase underline">
                  UPLOAD
                </p>
              </div>
            </div>
          </div>
          {/* right end */}
                  {/* NEXT button - fixed to bottom right */}
          <div className="fixed bottom-[150px] right-[150px] justify-end items-center mt-1">
            <BlackButton  onclickfunction={() => router.push("/success-apply")}    text="DONE"  customClass="text-[29px] font-thin px-[60px] py-[20px] rounded-[8px] shadow-md shadow-gray-400" />
          </div>
        </div>
)}

              {/* Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-[95%] max-w-[750px] p-6 rounded-xl relative shadow-xl">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setShowPopup(false)}
            >
              <FaTimes size={20} />
            </button>

            {/* Heading */}
<h2 className="text-center text-2xl leading-[100%] tracking-normal uppercase font-[400] mb-6 font-[FONTSPRING DEMO - Proxima Nova]">
  PAYMENT <span className="font-bold">DETAILS</span>
</h2>


{/* Bank Info (as table) */}
<div className="rounded-lg mb-6 space-y-3">
  <div className="bg-[#f5f5f5] rounded-[50px] px-[80px] py-3 flex items-center mx-[80px]">
    <span className="font-bold text-sm">Account Name</span>
    <span className="text-sm text-left pl-[50px]">{paymentInfo.accountName}</span>
  </div>
  <div className="bg-[#f5f5f5] rounded-[50px] px-[80px] py-3 flex items-center mx-[80px]">
    <span className="font-bold text-sm">Bank</span>
    <span className="text-sm text-left pl-[112px]">{paymentInfo.bank}</span>
  </div>
  <div className="bg-[#f5f5f5] rounded-[50px] px-[80px] py-1 flex items-center mx-[80px]">
    <span className="font-bold text-sm">Branch</span>
    <span className="text-sm text-left whitespace-pre-line pl-[100px]">
      {paymentInfo.branch}
    </span>
  </div>
</div>


            {/* Transaction Boxes */}
<div className="flex flex-row gap-6 w-full">
  {/* Inside Pakistan */}
  <div className="w-1/2 bg-[#f5f5f5] rounded-xl p-4 flex flex-col justify-between min-h-[250px]">
<h3 className="text-sm mb-2 flex justify-between w-full opacity-60">
  <span>TRANSACTION</span>
  <span className="text-black-600 font-semibold">Within Pakistan</span>
</h3>

    {/* Field container with vertical spacing */}
    <div className="flex-1 flex flex-col justify-center">
      <div className="bg-white p-3 rounded-lg space-y-1">
        <label className="text-xs text-gray-500 block">Account Number</label>
        <div className="flex justify-between items-center">
          <span className="text-sm">{paymentInfo.accountNumber}</span>
          <button onClick={() => handleCopy(paymentInfo.accountNumber)}>
            <FaRegCopy size={16} />
          </button>
        </div>
      </div>
    </div>

    {/* Bottom button */}
    <button
      onClick={() => handleCopy(`Account Number: ${paymentInfo.accountNumber}`)}
      className="flex items-center justify-center gap-2 w-full py-2 mt-4 rounded-lg bg-[#efefef] text-sm font-medium"
    >
      <FaRegCopy size={14} /> COPY ALL DETAILS
    </button>
  </div>

  {/* Outside Pakistan */}
  <div className="w-1/2 bg-[#f5f5f5] rounded-xl p-4 flex flex-col justify-between min-h-[250px]">
<h3 className="text-sm mb-2 flex justify-between w-full opacity-60">
  <span className="">TRANSACTION</span>
  <span className="font-semibold text-black-600">Outside Pakistan</span>
</h3>

    {/* Field container */}
    <div className="flex-1 flex flex-col justify-start gap-3">
      <div className="bg-white p-3 rounded-lg space-y-1">
        <label className="text-xs text-gray-500 block">IBAN</label>
        <div className="flex justify-between items-center">
          <span className="text-sm">{paymentInfo.iban}</span>
          <button onClick={() => handleCopy(paymentInfo.iban)}>
            <FaRegCopy size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white p-3 rounded-lg space-y-1">
        <label className="text-xs text-gray-500 block">SWIFT Code</label>
        <div className="flex justify-between items-center">
          <span className="text-sm">{paymentInfo.swiftCode}</span>
          <button onClick={() => handleCopy(paymentInfo.swiftCode)}>
            <FaRegCopy size={16} />
          </button>
        </div>
      </div>
    </div>

    {/* Bottom button */}
    <button
      onClick={() =>
        handleCopy(
          `IBAN: ${paymentInfo.iban}\nSWIFT Code: ${paymentInfo.swiftCode}`
        )
      }
      className="flex items-center justify-center gap-2 w-full py-2 mt-4 rounded-lg bg-[#efefef] text-sm font-medium"
    >
      <FaRegCopy size={14} /> COPY ALL DETAILS
    </button>
  </div>
</div>


          </div>
        </div>
      )}
      </div>
      {/* <PaymentModal /> */}
    </PageWrapper>
  );
};

export default PaymentFull;

