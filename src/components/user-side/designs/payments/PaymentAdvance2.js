"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import AdvancePaymentSelection from "@/components/payment/advance-payment-selection";
import PaymentTitle from "@/components/payment/paymentTitle";
import { bankIcon, QRScanImage } from "@/assets";
import Image from "next/image";
import Line from "@/components/common/Line/Line";
import { IoIosAdd } from "react-icons/io";
import BlackButton from "../../BlackButton";
import { payemntServices2 } from "./data2";
import { FaTimes, FaRegCopy } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { fastHomeIcon } from "@/assets";
import { UButton } from "@/components";
import { useAuth } from "@/context/UserContext";
import { uploadPaymentReceipt } from "@/Firebase/admin-side/payment/uploadPaymentReceipt";

const PaymentAdvance2 = ({ paymentAmount = 0 }) => {
  const [auth, setAuth, setIsAcceptTerms, isAcceptTerms] = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [pageState, setPageState] = useState("select"); // "select" or "summary"
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const formatCurrency = amount => {
    return new Intl.NumberFormat("en-PK").format(amount);
  };

  // Get user ID
  const getUserId = () => {
    if (!auth || auth.isLoading || !auth.success || !auth.user) {
      return null;
    }
    return auth.user.phone;
  };

  const paymentInfo = {
    accountName: "MEHRAZ SMC PRIVATE LIMITED",
    bank: "United Bank Limited (UBL)",
    branch: "Valencia Society, Lahore, Pakistan\nA5, Block D, Commercial Zone",
    accountNumber: "0310-312439851",
    iban: "PK04UNIL0109000312439851",
    swiftCode: "UNILPKKA",
  };

  const handleCopy = text => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const handleOptionChange = optionId => {
    setSelectedOption(optionId);
  };

  const paymentOptionsData = [
    { id: "1", title: "50% or 0.5%", percentage: 0.5 },
    { id: "2", title: "60% or 1%", percentage: 0.6 },
    { id: "3", title: "70% or 2.5%", percentage: 0.7 },
    { id: "4", title: "80% or 5%", percentage: 0.8 },
    { id: "5", title: "90% or 7.5%", percentage: 0.9 },
    { id: "6", title: "100% or 10%", percentage: 1.0 },
  ];

  // File upload handlers
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (!file) return;

    // File validation
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    if (!validTypes.includes(file.type)) {
      setUploadStatus({
        type: "error",
        message: "Please upload JPEG, PNG, or PDF files only",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus({
        type: "error",
        message: "File size must be less than 5MB",
      });
      return;
    }

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }

    setUploadedFile(file);
    setUploadStatus(null);
  };

  const handleUpload = async file => {
    const userId = getUserId();

    if (auth?.isLoading) {
      setUploadStatus({
        type: "error",
        message: "Please wait, loading user information...",
      });
      return;
    }

    if (!userId) {
      setUploadStatus({
        type: "error",
        message: "Please log in to upload files. User phone number not found.",
      });
      return;
    }

    if (!file) {
      setUploadStatus({
        type: "error",
        message: "No file selected",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Calculate advance amount
      const selectedPercentage =
        paymentOptionsData.find(o => o.id === selectedOption)?.percentage || 0;
      const advanceAmount = paymentAmount * selectedPercentage;

      // Create FormData for server action
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("userName", auth?.user?.fullName || "Unknown");
      formData.append("uploadTimestamp", new Date().toISOString());
      formData.append("paymentAmount", advanceAmount.toString());
      formData.append("paymentType", "advance");

      const result = await uploadPaymentReceipt(formData);

      if (result.success) {
        setUploadStatus({
          type: "success",
          message: "Receipt uploaded successfully!",
        });
      } else {
        setUploadStatus({
          type: "error",
          message: result.message || "Upload failed",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({
        type: "error",
        message: `Upload failed: ${error.message || "Please try again"}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFilePreview(null);
    setUploadStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageWrapper className="flex-1 flex flex-col">
        <div className="f-col gap-5">
          <PaymentTitle title="advance payment" />
          <div
            className="max-w-[41.875rem] max-auto-width h-auto  rounded-[10px] md:rounded-lg sm:rounded-md bg-white/25 overflow-hidden"
            style={{ boxShadow: "0px 5px 30px 10px rgba(0,0,0,0.1)" }}>
            {pageState === "select" && (
              <>
                {/* Only show if no option is selected yet */}
                {!selectedOption && (
                  <>
                    <div className="bg-[#f0f0f0]/50 h-auto py-2 w-full flex-center gap-1">
                      <p className="text-center">
                        <span className="base-text bold text-[#606060]">
                          TOTAL AMOUNT =
                        </span>
                      </p>
                      <div>
                        {/* Commented out discount for consistency */}
                        {/* 
                        <p className="base-text-0 font-medium md:font-normal text-line-through text-accent-gray-light-2">
                          {formatCurrency(Math.round(paymentAmount * 1.17))}
                        </p>
                        */}
                        <p className="text-large-1 font-medium md:font-normal uppercase">
                          <span className="text-danger">
                            {formatCurrency(paymentAmount)}
                          </span>
                          <span> </span>
                          <span className="normal-text-3 font-medium text-[#2f2f2f]">
                            PKR
                          </span>
                        </p>
                      </div>
                    </div>

                    <p className="base-text-0 text-center uppercase text-accent-black/50 mt-3">
                      select any option that suits you
                    </p>
                  </>
                )}

                {/* Options List */}
                <div className="f-col gap-3 pt-1 pb-20 px-[45px] md:px-[30px] sm:px-[15px] transition-all duration-300">
                  <div className="base-text text-[#606060] text-center text-[20px] py-[15px]">
                    Total Amount = {formatCurrency(paymentAmount)} PKR
                  </div>
                  {paymentOptionsData.map(option => (
                    <AdvancePaymentSelection
                      key={option.id}
                      title={option.title}
                      amount={formatCurrency(paymentAmount * option.percentage)}
                      currency="PKR"
                      isSelected={selectedOption === option.id}
                      onChange={() => handleOptionChange(option.id)}
                      id={option.id}
                    />
                  ))}
                </div>

                {/* Bottom bar for selected option */}
                {selectedOption && (
                  <>
                    <div className="w-[70%] h-[2px] bg-[#606060]/50 mx-auto my-4"></div>

                    <div className="flex flex-center  w-full px-5 py-3 bg-white z-40 pb-[25px]">
                      <span className="base-text bold text-[#606060] text-center">
                        ADVANCE AMOUNT ={" "}
                        <b className="bold text-black text-[28px]">
                          {formatCurrency(
                            paymentAmount *
                              (paymentOptionsData.find(
                                o => o.id === selectedOption,
                              )?.percentage || 0),
                          )}
                        </b>{" "}
                        PKR
                      </span>
                    </div>

                    {/* NEXT button - fixed to bottom right */}
                    <div className="fixed bottom-[130px] right-[400px] justify-end items-center mt-1">
                      <BlackButton
                        onclickfunction={() => setPageState("summary")}
                        customClass="text-[29px] font-thin px-[60px] py-[20px] rounded-[8px] shadow-md shadow-gray-400"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="max-w-[41.875rem] max-auto-width h-auto pt-[150px] rounded-[10px] md:rounded-lg sm:rounded-md bg-white/25 overflow-hidden">
            {pageState === "summary" && (
              <div className="f-col gap-12 lg:gap-10 md:gap-8 sm:gap-6 w-full bg-transparent">
                <div className="f-col gap-5 md:gap-4 sm:gap-3 w-full">
                  <p className="opacity-70 normal-text text-center uppercase text-accent-black">
                    Payment Options
                  </p>
                  <Line
                    className={"w-full h-[2px] bg-accent-black opacity-20"}
                  />
                </div>

                <div className="f-col gap-[30px] lg:gap-[20px] md:gap-[15px]">
                  {payemntServices2.map((service, index) => (
                    <div
                      key={index}
                      className={`payment-full-checkbox_container cursor-pointer transition-all duration-300 ${
                        selectedPaymentMethod === service
                          ? "bg-[#2f2f2f] text-white shadow-md"
                          : "bg-dull/50 text-black"
                      }`}
                      onClick={() => setSelectedPaymentMethod(service)}>
                      <label className="payment-full-checkbox">
                        <input
                          type="radio"
                          name="payment-option"
                          className="peer hidden"
                          checked={selectedPaymentMethod === service}
                          onChange={() => setSelectedPaymentMethod(service)}
                        />
                        <div className="general-tick w-[14px] md:w-[10px] sm:w-[8px] h-[31px] md:h-[24px] sm:h-[20px] opacity-0 peer-checked:opacity-100 transition-all duration-300"></div>
                      </label>
                      <p className="payment-full-checkbox-text">{service}</p>
                    </div>
                  ))}
                </div>

                {/* Black button */}
                <div className="flex justify-center mt-8">
                  <BlackButton
                    onclickfunction={() => setPageState("paymentMethod")}
                    customClass="text-[29px] font-thin px-[60px] py-[20px] rounded-[8px] shadow-md shadow-gray-400"
                  />
                </div>
              </div>
            )}
          </div>

          {pageState === "paymentMethod" && (
            <div className="w-full flex flex-row lg:flex-col items-stretch lg:items-center justify-center h-full gap-[81px] lg:gap-[40px] md:gap-[20px] sm:gap-[10px]">
              {/* left start */}
              <div className="max-w-[467px] pt-[25px] f-col items-end gap-[34px] md:gap-[20px] sm:gap-[10px] w-full">
                <div className="max-w-[375px] w-full rounded-[10px] md:rounded-lg sm:rounded-md bg-white/25 py-2.5 md:py-2 sm:py-1.5 shadow-payment-box flex-center">
                  <div className="base-text bold text-[#606060]">AMOUNT =</div>
                  <div>
                    {/* Show advance amount */}
                    <div className="text-large-1 font-medium md:font-normal uppercase">
                      <span className="text-danger">
                        {formatCurrency(
                          paymentAmount *
                            (paymentOptionsData.find(
                              o => o.id === selectedOption,
                            )?.percentage || 0),
                        )}
                      </span>
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

                    <div
                      className="opacity-70 base-text text-left text-black"
                      onClick={() => setShowPopup(true)}>
                      <span>View </span>
                      <span className="bold">Payment Details</span>
                    </div>
                  </div>
                </div>

                <div className="payment-advance-box--right-container">
                  <div className="payment-advance-box--right-text">
                    <span>Transaction</span>
                    <span className="bold"> Receipt</span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    style={{ display: "none" }}
                  />

                  {!uploadedFile ? (
                    <div
                      onClick={handleClick}
                      className="w-full py-[9px] md:py-[7px] sm:py-[5px] rounded-full bg-[#efefef]/50 hover:bg-gray-100 transition-all duration-300 border border-black/[0.15] shadow-copy flex-center gap-3.5 cursor-pointer">
                      <div className="w-[36px] md:w-[30px] sm:w-[25px] h-[36px] md:h-[30px] sm:h-[25px] rounded-full bg-accent-black opacity-60 flex-center">
                        <IoIosAdd className="text-white w-[30px] md:w-[25px] sm:w-[20px] h-[30px] md:h-[25px] sm:h-[20px]" />
                      </div>
                      <p className="opacity-70 normal-text bold text-center text-black uppercase underline">
                        UPLOAD
                      </p>
                    </div>
                  ) : (
                    <div className="w-full p-4 border rounded-lg bg-white">
                      {/* File preview */}
                      {filePreview ? (
                        <div className="mb-3">
                          <Image
                            src={filePreview}
                            alt="Receipt preview"
                            width={200}
                            height={200}
                            className="max-w-full h-auto rounded border"
                          />
                        </div>
                      ) : (
                        <div className="mb-3 p-4 bg-gray-100 rounded text-center">
                          <p>PDF File: {uploadedFile.name}</p>
                        </div>
                      )}

                      {/* File info and actions */}
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700">
                          <FaTimes size={20} />
                        </button>
                      </div>

                      {/* Upload status */}
                      {uploadStatus && (
                        <div
                          className={`mt-2 text-sm ${
                            uploadStatus.type === "success"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}>
                          {uploadStatus.message}
                        </div>
                      )}

                      {/* Upload button */}
                      <button
                        onClick={() => handleUpload(uploadedFile)}
                        disabled={
                          isUploading ||
                          uploadStatus?.type === "success" ||
                          !getUserId()
                        }
                        className="mt-3 w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400">
                        {!getUserId()
                          ? "Please log in"
                          : isUploading
                          ? "Uploading..."
                          : uploadStatus?.type === "success"
                          ? "Uploaded ✓"
                          : "Confirm Upload"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* right end */}
              {/* NEXT button - fixed to bottom right */}
              <div className="fixed bottom-[150px] right-[150px] justify-end items-center mt-1">
                <BlackButton
                  onclickfunction={() => router.push("/client-dashboard")}
                  text="DONE"
                  customClass="text-[29px] font-thin px-[60px] py-[20px] rounded-[8px] shadow-md shadow-gray-400"
                />
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
                  onClick={() => setShowPopup(false)}>
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
                    <span className="text-sm text-left pl-[50px]">
                      {paymentInfo.accountName}
                    </span>
                  </div>
                  <div className="bg-[#f5f5f5] rounded-[50px] px-[80px] py-3 flex items-center mx-[80px]">
                    <span className="font-bold text-sm">Bank</span>
                    <span className="text-sm text-left pl-[112px]">
                      {paymentInfo.bank}
                    </span>
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
                      <span className="text-black-600 font-semibold">
                        Within Pakistan
                      </span>
                    </h3>

                    {/* Field container with vertical spacing */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="bg-white p-3 rounded-lg space-y-1">
                        <label className="text-xs text-gray-500 block">
                          Account Number
                        </label>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">
                            {paymentInfo.accountNumber}
                          </span>
                          <button
                            onClick={() =>
                              handleCopy(paymentInfo.accountNumber)
                            }>
                            <FaRegCopy size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom button */}
                    <button
                      onClick={() =>
                        handleCopy(
                          `Account Number: ${paymentInfo.accountNumber}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 w-full py-2 mt-4 rounded-lg bg-[#efefef] text-sm font-medium">
                      <FaRegCopy size={14} /> COPY ALL DETAILS
                    </button>
                  </div>

                  {/* Outside Pakistan */}
                  <div className="w-1/2 bg-[#f5f5f5] rounded-xl p-4 flex flex-col justify-between min-h-[250px]">
                    <h3 className="text-sm mb-2 flex justify-between w-full opacity-60">
                      <span className="">TRANSACTION</span>
                      <span className="font-semibold text-black-600">
                        Outside Pakistan
                      </span>
                    </h3>

                    {/* Field container */}
                    <div className="flex-1 flex flex-col justify-start gap-3">
                      <div className="bg-white p-3 rounded-lg space-y-1">
                        <label className="text-xs text-gray-500 block">
                          IBAN
                        </label>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{paymentInfo.iban}</span>
                          <button onClick={() => handleCopy(paymentInfo.iban)}>
                            <FaRegCopy size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg space-y-1">
                        <label className="text-xs text-gray-500 block">
                          SWIFT Code
                        </label>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">
                            {paymentInfo.swiftCode}
                          </span>
                          <button
                            onClick={() => handleCopy(paymentInfo.swiftCode)}>
                            <FaRegCopy size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom button */}
                    <button
                      onClick={() =>
                        handleCopy(
                          `IBAN: ${paymentInfo.iban}\nSWIFT Code: ${paymentInfo.swiftCode}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 w-full py-2 mt-4 rounded-lg bg-[#efefef] text-sm font-medium">
                      <FaRegCopy size={14} /> COPY ALL DETAILS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default PaymentAdvance2;
