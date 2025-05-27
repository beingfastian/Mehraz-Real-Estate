"use client";

import { useEffect, useState } from "react";
import { copyIcon } from "@/assets";
import Image from "next/image";
import CopySingleDetail from "../CopySingleDetail";

export default function PaymentModal() {
  const [copyFeedback, setCopyFeedback] = useState("");

  const bankDetails = {
    accountName: "MEHRAZ SMC PRIVATE LIMITED",
    bank: "United Bank Limited (UBL)",
    branch: "Valencia Society, Lahore, Pakistan",
    address: "A5, Block D, Commercial Zone",
    localAccount: "0310-312439851",
    iban: "PK04UNILO109000312439851",
    swiftCode: "UNILPKKA",
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(field);
      setTimeout(() => setCopyFeedback(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const copyAllDetails = async type => {
    const details =
      type === "local"
        ? `Account Number: ${bankDetails.localAccount}`
        : `IBAN: ${bankDetails.iban}\nSWIFT Code: ${bankDetails.swiftCode}`;
    await copyToClipboard(details, `all-${type}`);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 top-0 flex justify-center items-center bg-black/40 hidden-scrollbar  ">
      <div className="w-full">
        <div className="min-h-full h-full bg-red-500 crelative top-0 w-full  flex-center">
          <div className="h-full flex-center absolute w-full top-0 p-5">
            <div className="bg-white rounded-2xl md:rounded-xl sm:rounded-lg m-auto shadow-lg max-w-[63.5625rem] w-full py-10 md:py-8 sm:py-6 px-[30px] md:px-6 sm:px-4 ">
              <p className="text-large text-center uppercase text-accent-black">
                <span>payment </span>
                <span className="bold">details</span>
              </p>

              {/* Account Details */}
              <div className="pt-[26px] md:pt-[22px] sm:pt-[18px] pb-[52px] md:pb-[48px] sm:pb-[44px] f-col gap-2.5 md:gap-2 sm:gap-1.5">
                <div className="base-text-0">
                  <p className="payment-modal--personal-detail-box-left-md">
                    Account Name
                  </p>
                  <div className="payment-modal--personal-detail-box">
                    <p className="payment-modal--personal-detail-box-left">
                      Account Name
                    </p>
                    <p className="font-normal uppercase">
                      {bankDetails.accountName}
                    </p>
                  </div>
                </div>
                <div className="base-text-0">
                  <p className="payment-modal--personal-detail-box-left-md">
                    Bank
                  </p>
                  <div className="payment-modal--personal-detail-box">
                    <p className="payment-modal--personal-detail-box-left">
                      Bank
                    </p>
                    <p className="font-normal capitalize">{bankDetails.bank}</p>
                  </div>
                </div>
                <div className="base-text-0">
                  <p className="payment-modal--personal-detail-box-left-md">
                    Branch
                  </p>
                  <div className="payment-modal--personal-detail-box">
                    <p className="payment-modal--personal-detail-box-left ">
                      Branch
                    </p>

                    <div className="f-col !leading-none">
                      <p className="font-normal capitalize">
                        {bankDetails.branch}
                      </p>
                      <p className="font-normal capitalize text-[#696969]">
                        {bankDetails.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Sections */}
              <div className="flex flex-row md:flex-col h-full items-stretch gap-6 lg:gap-4 sm:gap-3">
                {/* Within Pakistan */}
                <div className="max-w-[400px] lg:max-w-full payment-modal--personal-account-container gap-[47px] md:gap-[30px] sm:gap-[20px]">
                  <div className="payment-modal--personal-account-container-header">
                    <h3 className="payment-modal--personal-account-container-header-left">
                      TRANSACTION
                    </h3>
                    <h4 className="payment-modal--personal-account-container-header-right">
                      Within Pakistan
                    </h4>
                  </div>

                  <CopySingleDetail
                    title="Account Number"
                    value={bankDetails.localAccount}
                  />

                  <div
                    className="max-w-[18.75rem] max-auto-width  rounded-full bg-[#efefef]/50 shadow-copy flex-center gap-3 py-2 md:py-1.5 sm:py-1 cursor-pointer"
                    onClick={() => copyAllDetails("local")}>
                    <Image
                      src={copyIcon}
                      alt="copy"
                      className="w-[25px] h-[28px] md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px]"
                    />
                    <p className="opacity-70 text-center text-black base-text-0 underline uppercase">
                      <span className="bold">COPY </span>
                      <span className="">ALL DETAILS</span>
                    </p>
                  </div>
                </div>

                {/* Outside Pakistan */}
                <div className="payment-modal--personal-account-container">
                  <div className="max-w-[340px] w-full payment-modal--personal-account-container-header">
                    <h3 className="payment-modal--personal-account-container-header-left">
                      TRANSACTION
                    </h3>
                    <h4 className="payment-modal--personal-account-container-header-right">
                      Outside Pakistan
                    </h4>
                  </div>

                  <div className="f-col pt-5 gap-2">
                    <CopySingleDetail
                      title="Account Number"
                      value={bankDetails.localAccount}
                    />
                    <CopySingleDetail title="IBAN" value={bankDetails.iban} />
                  </div>

                  <div className="pt-[15px]">
                    <div
                      className="max-w-[18.75rem] max-auto-width  rounded-full bg-[#efefef]/50 shadow-copy flex-center gap-3 py-2 md:py-1.5 sm:py-1 cursor-pointer"
                      onClick={() => copyAllDetails("local")}>
                      <Image
                        src={copyIcon}
                        alt="copy"
                        className="w-[25px] h-[28px] md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px]"
                      />
                      <p className="opacity-70 text-center text-black base-text-0 underline uppercase">
                        <span className="bold">COPY </span>
                        <span className="">ALL DETAILS</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
