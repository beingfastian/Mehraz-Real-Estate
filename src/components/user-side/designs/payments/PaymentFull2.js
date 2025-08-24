// Fixed PaymentFull2.js - Updated to use passed payment amount
"use client";
import Line from "@/components/common/Line/Line";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import PaymentTitle from "@/components/payment/paymentTitle";
import { formatNumber } from "@/helper/helper";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { bankIcon, QRScanImage } from "@/assets";
import { payemntServices2 } from "./data2";
import PaymentModal from "@/components/payment/paymentModal";
import BlackButton from "../../../../components/user-side/BlackButton";
import { IoIosAdd } from "react-icons/io";
import { FaTimes, FaRegCopy } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { fastHomeIcon } from "@/assets";
import { UButton } from "@/components";
import { useRef } from "react";
import { useAuth } from "@/context/UserContext";
import { uploadPaymentReceipt } from "@/Firebase/admin-side/payment/uploadPaymentReceipt";

const PaymentFull2 = ({ paymentAmount = 0 }) => {
  const [auth, setAuth, setIsAcceptTerms, isAcceptTerms] = useAuth();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [pageState, setPageState] = useState("summary");
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const formatCurrency = amount => {
    return new Intl.NumberFormat("en-PK").format(amount);
  };

  // Debug user authentication state
  useEffect(() => {
    console.log("=== AUTH DEBUG INFO ===");
    console.log("Full auth object:", auth);
    console.log("Auth user:", auth?.user);
    console.log("Auth success:", auth?.success);
    console.log("Auth isLoading:", auth?.isLoading);

    if (auth?.user) {
      console.log("User phone (direct access):", auth.user.phone);
      console.log("User fullName:", auth.user.fullName);
      console.log("All user keys:", Object.keys(auth.user));
    }
    console.log("======================");
  }, [auth]);

  // Get user ID - now properly accessing the phone from user object
  const getUserId = () => {
    console.log("Getting user ID...");

    if (!auth) {
      console.log("No auth object");
      return null;
    }

    if (auth.isLoading) {
      console.log("Auth is still loading");
      return null;
    }

    if (!auth.success || !auth.user) {
      console.log("User not authenticated or no user object");
      return null;
    }

    // Based on your signup code, the user object is { phone, fullName }
    // So we access it directly as auth.user.phone (not auth.user.phone.phone)
    const userId = auth.user.phone; // This should be the phone number string
    console.log("Resolved user ID (phone number):", userId);
    return userId;
  };

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

  const handleCopy = text => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

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
    const userId = getUserId(); // Use the fixed getUserId function

    console.log("=== UPLOAD DEBUG ===");
    console.log("User ID for upload:", userId);
    console.log("User object:", auth?.user);
    console.log("File:", file);
    console.log("Auth state:", {
      isLoading: auth?.isLoading,
      success: auth?.success,
      hasUser: !!auth?.user,
    });
    console.log("===================");

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
      console.log("Starting upload with phone number:", userId);

      // Create FormData for server action
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("userName", auth?.user?.fullName || "Unknown");
      formData.append("uploadTimestamp", new Date().toISOString());
      formData.append("paymentAmount", paymentAmount.toString());
      formData.append("paymentType", "full");

      const result = await uploadPaymentReceipt(formData);
      console.log("Upload result:", result);

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

  // Show loading state while auth is loading
  if (auth?.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageWrapper className="flex-1 flex flex-col">
        <div className="f-col gap-9 items-center">
          <PaymentTitle title="payment" />

          {pageState === "summary" && (
            <div className="flex flex-col lg:flex-col gap-8 lg:gap-10 md:gap-8 sm:gap-6 items-center w-full justify-center ">
              <div className="f-col max-w-[550px] w-full mt-[80px]">
                <div className="flex justify-center w-full">
                  <div
                    className="w-[65%] p-4 text-center bg-white rounded-md base-text bold text-[#606060] py-[30px]"
                    style={{
                      boxShadow: "0px 0px 10px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                    AMOUNT ={" "}
                    <b className="bold text-[28px] text-black">
                      {formatCurrency(paymentAmount)}
                    </b>{" "}
                    PKR
                  </div>
                </div>
              </div>

              <Line
                className={"w-[500px] h-[1px] bg-accent-black opacity-30"}
              />

              <div className="f-col gap-12 lg:gap-10 md:gap-8 sm:gap-6 max-w-[550px] w-full">
                <div className="f-col gap-5 md:gap-4 sm:gap-3 w-full">
                  <p className="opacity-70 normal-text text-center uppercase text-accent-black">
                    Payment Options
                  </p>
                </div>
                <div className="f-col gap-[30px] lg:gap-[20px] md:gap-[15px] ">
                  <div
                    className={`payment-full-checkbox_container ${
                      selectedOption === payemntServices2[0]
                        ? "bg-accent-gold-lightest"
                        : "bg-dull/50"
                    }`}
                    onClick={() => handleOptionChange(payemntServices2[0])}>
                    <label className="payment-full-checkbox">
                      <input
                        type="radio"
                        name="payment-option"
                        className="peer hidden"
                        checked={selectedOption === payemntServices2[0]}
                        onChange={() => handleOptionChange(payemntServices2[0])}
                      />
                      <div className="general-tick w-[14px] md:w-[10px] sm:w-[8px] h-[31px] md:h-[24px] sm:h-[20px] opacity-0 peer-checked:opacity-100 transition-all duration-300"></div>
                    </label>
                    <p className="payment-full-checkbox-text">
                      Pay through any service
                    </p>
                  </div>
                  <div
                    className={`payment-full-checkbox_container ${
                      selectedOption === payemntServices2[1]
                        ? "bg-accent-gold-lightest"
                        : "bg-dull/50"
                    }`}
                    onClick={() => handleOptionChange(payemntServices2[1])}>
                    <label className="payment-full-checkbox">
                      <input
                        type="radio"
                        name="payment-option"
                        className="peer hidden"
                        checked={selectedOption === payemntServices2[1]}
                        onChange={() => handleOptionChange(payemntServices2[1])}
                      />
                      <div className="general-tick w-[14px] md:w-[10px] sm:w-[8px] h-[31px] md:h-[24px] sm:h-[20px] opacity-0 peer-checked:opacity-100 transition-all duration-300"></div>
                    </label>
                    <p className="payment-full-checkbox-text">
                      Pay through gateway
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-center justify-center mt-8">
                <BlackButton
                  onclickfunction={() => setPageState("paymentMethod")}
                  customClass="text-[29px] font-thin px-[60px] py-[20px] rounded-[8px] shadow-md shadow-gray-400"
                />
              </div>
            </div>
          )}

          {pageState === "paymentMethod" && (
            <div className="w-full pt-[130px] flex flex-row lg:flex-col items-stretch lg:items-center justify-center h-full gap-[81px] lg:gap-[40px] md:gap-[20px] sm:gap-[10px]">
              {/* Payment method content - keeping original structure */}
              <div className="max-w-[467px] pt-[25px] f-col items-end gap-[34px] md:gap-[20px] sm:gap-[10px] w-full">
                {/* Amount display and QR code section */}
                <div className="max-w-[375px] w-full rounded-[10px] md:rounded-lg sm:rounded-md bg-white/25 py-2.5 md:py-2 sm:py-1.5 shadow-payment-box flex-center">
                  <div className="base-text bold text-[#606060]">AMOUNT =</div>
                  <div>
                    {/* Commented out discount for consistency */}
                    {/* 
                    <p className="base-text-0 font-medium text-line-through text-accent-gray-light-2">
                      {formatCurrency(Math.round(paymentAmount * 1.17))}
                    </p>
                    */}
                    <div className="text-large-1 font-medium uppercase">
                      <span className="text-danger">
                        {formatCurrency(paymentAmount)}
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

              <div>
                <Line className="h-full w-[1px] bg-black/40" />
              </div>

              {/* Upload section */}
              <div className="max-w-[478px] w-full f-col gap-6 md:gap-5 sm:gap-4">
                <div className="base-text-0 text-left uppercase text-accent-black">
                  <span className="bold">pay through any service</span>
                  <span> to this account, upload payment receipt here</span>
                </div>

                {/* Account details button */}
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

                {/* File upload section */}
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

              {/* DONE button */}
              <div className="fixed bottom-[150px] right-[150px] justify-end items-center mt-1">
                <BlackButton
                  onclickfunction={() => router.push("/client-dashboard")}
                  text="DONE"
                  customClass="text-[29px] font-thin px-[60px] py-[20px] rounded-[8px] shadow-md shadow-gray-400"
                />
              </div>
            </div>
          )}

          {/* Payment Details Modal */}
          {showPopup && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-white w-[95%] max-w-[750px] p-6 rounded-xl relative shadow-xl">
                <button
                  className="absolute top-4 right-4 text-gray-500"
                  onClick={() => setShowPopup(false)}>
                  <FaTimes size={20} />
                </button>

                <h2 className="text-center text-2xl leading-[100%] tracking-normal uppercase font-[400] mb-6">
                  PAYMENT <span className="font-bold">DETAILS</span>
                </h2>

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

                <div className="flex flex-row gap-6 w-full">
                  {/* Within Pakistan */}
                  <div className="w-1/2 bg-[#f5f5f5] rounded-xl p-4 flex flex-col justify-between min-h-[250px]">
                    <h3 className="text-sm mb-2 flex justify-between w-full opacity-60">
                      <span>TRANSACTION</span>
                      <span className="text-black-600 font-semibold">
                        Within Pakistan
                      </span>
                    </h3>

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

      <footer className="w-full bg-accent-gray py-3 mt-10">
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

export default PaymentFull2;
