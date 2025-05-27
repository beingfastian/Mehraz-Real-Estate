"use client";
import React, { useState } from "react";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import AdvancePaymentSelection from "@/components/payment/advance-payment-selection";
import PaymentTitle from "@/components/payment/paymentTitle";
import { bankIcon, QRScanImage } from "@/assets";
import Image from "next/image";
import Line from "@/components/common/Line/Line";
import { IoIosAdd } from "react-icons/io";

const PaymentAdvance = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = optionId => {
    setSelectedOption(optionId);
  };

  return (
    <PageWrapper>
      <div className="f-col gap-5">
        <PaymentTitle title="advance payment" />
        <div
          className="max-w-[41.875rem] max-auto-width h-auto  rounded-[10px] md:rounded-lg sm:rounded-md bg-white/25 overflow-hidden"
          style={{ boxShadow: "0px 5px 30px 10px rgba(0,0,0,0.1)" }}>
          <div className="bg-[#f0f0f0]/50 h-auto py-2 w-full flex-center gap-1">
            <p className="text-center">
              <span className="base-text bold text-[#606060]">
                TOTAL AMOUNT =
              </span>
            </p>
            <div>
              <p className="base-text-0 font-medium md:font-normal text-line-through text-accent-gray-light-2">
                140,000
              </p>
              <p className="text-large-1 font-medium md:font-normal uppercase">
                <span className="text-danger">120,000</span>
                <span> </span>
                <span className="normal-text-3 font-medium text-[#2f2f2f]">
                  PKR
                </span>
              </p>
            </div>
          </div>
          <div className="f-col gap-3 pt-1 pb-6 px-[45px] md:px-[30px] sm:px-[15px] transition-all duration-300"> 
            <p className="base-text-0 text-center uppercase text-accent-black/50">
              select any option that suits you
            </p>
              <AdvancePaymentSelection
                title="50% or 0.5%"
                amount="120,000,000"
                currency="PKR"
                isSelected={selectedOption === "1"}
                onChange={() => handleOptionChange("1")}
                id="1"  
              />
              <AdvancePaymentSelection
                title="60% or 1%"
                amount="120,000,000"
                currency="PKR"
                isSelected={selectedOption === "2"}
                onChange={() => handleOptionChange("2")}
                id="2"  
              />
         
              <AdvancePaymentSelection
                title="70% or 2.5%"
                amount="120,000,000"
                currency="PKR"
                isSelected={selectedOption === "3"}
                onChange={() => handleOptionChange("3")}
                id="3"  
              />
              <AdvancePaymentSelection
                title="80% or 5%"
                amount="120,000,000"
                currency="PKR"
                isSelected={selectedOption === "4"}
                onChange={() => handleOptionChange("4")}
                id="4"  
              />
              <AdvancePaymentSelection
                title="90% or 7.5%"
                amount="120,000,000"
                currency="PKR"
                isSelected={selectedOption === "5"}
                onChange={() => handleOptionChange("5")}
                id="5"  
              />
              <AdvancePaymentSelection
                title="100% or 10%"
                amount="120,000,000"
                currency="PKR"
                isSelected={selectedOption === "6"}
                onChange={() => handleOptionChange("6")}
                id="6"  
              />
             
  
          </div>
        </div>

        <div className="w-full flex flex-row lg:flex-col items-stretch lg:items-center justify-center h-full gap-[81px] lg:gap-[40px] md:gap-[20px] sm:gap-[10px]">
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

                <div className="opacity-70 base-text text-left text-black">
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
        </div>
      </div>
    </PageWrapper>
  );
};

export default PaymentAdvance;
