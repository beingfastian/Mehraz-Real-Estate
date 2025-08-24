"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Card2 = ({
  data,
  setStep,
  hightcustomdetail,
  setHighCustomDetail,
  step1Screen2FormData,
  onPayment,
}) => {
  const router = useRouter();

  function categoryselected(category) {
    if (setStep) {
      router.push(`?category=${category}`);
      setStep(prev => prev + 1);
      setHighCustomDetail &&
        setHighCustomDetail(prev => {
          return { ...prev, category: category };
        });
    }
  }

  // Handle individual payment
  const handlePayment = () => {
    if (onPayment && data?.serviceType && data?.cost) {
      onPayment(data.serviceType, data.cost);
    }
  };

  return (
    <div className="relative w-[270px] h-[320px] sm:w-[150px] sm:h-[175px] flex justify-center items-center">
      <div
        className={`relative w-full h-full ${setStep ? "cursor-pointer" : ""}`}
        onClick={setStep ? () => categoryselected(data?.URL) : undefined}>
        <Image
          src={data?.imagesrc}
          alt="Background"
          fill
          className="w-full h-full object-cover !relative"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Content on Top of Image */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4 space-y-2 text-center">
          {/* Icon */}
          <div>{data?.icon}</div>

          {/* Title */}
          <h1 className="text-xl sm:text-base">{data?.text}</h1>

          {/* Divider Line */}
          <div className="w-1/2 h-[1px] bg-white opacity-30"></div>

          {/* Payment Status */}
          <p className="absoulte bottom-0 text-sm sm:text-xs">
            {!data?.checked ? "Payment Cleared" : "Payment Pending"}
          </p>

          {/* Cost (Only if Payment Pending) */}
          {data?.checked && (
            <div className="bg-white bg-opacity-50 rounded-full px-4 py-1 text-white font-bold text-sm">
              {data?.cost ?? "120000PKR"}
            </div>
          )}
        </div>

        {/* Pay Button (Only if Payment Pending) */}
        {data?.checked && (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation(); // Prevent triggering the card click
              handlePayment();
            }}
            className="text-sm text-black hover:text-white hover:bg-transparent font-bold transition-colors duration-300"
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "120px",
              height: "40px",
              padding: "12px 80.5px",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              border: "1px solid #FFFFFF",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontWeight: 700,
              fontSize: "26px",
              lineHeight: "32px",
              letterSpacing: "0%",
              textTransform: "uppercase",
            }}>
            <span
              style={{
                width: "30px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              PAY
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card2;
