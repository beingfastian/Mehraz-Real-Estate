import React from "react";
import Image from "next/image";

const OrderListCard = () => {
  return (
    <div className="flex justify-center items-center flex-col space-y-4  mb-8">
      {/* Main Card */}
      <div className="h-[179px] w-[96%] flex rounded-[10px] border-2 bg-white shadow-lg overflow-hidden">
        {/* Stacked Images */}
        <div className="relative w-[800px] flex items-center justify-start pl-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0"
              style={{
                left: `${i * 30}px`,
                zIndex: 10 - i,
              }}>
              <Image
                src="https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop"
                alt="Material"
                width={270}
                height={180}
                className="rounded-[6px] border-[1px] border-black shadow-md object-cover"
              />
            </div>
          ))}
        </div>

        {/* Name, Vendor, Rate */}
        <div className="h-full w-[50%] mx-2 flex flex-col">
          <div className="font-bold text-[24px] leading-[24px] my-[10px]">
            NAME
          </div>
          <div className="font-medium text-[22px] leading-8 text-[#2F2F2F]">
            VENDOR
          </div>
          <hr />
          <div className="font-bold text-[#2F2F2F] text-[24px]">RATE</div>
          <div className="mt-2 text-[20px] w-full h-[40px] rounded-[50px] p-2 border border-black text-black font-medium text-left">
            1500 PKR/CFT
          </div>
        </div>

        {/* Order Details */}
        <div className="h-full flex-grow mx-2 flex flex-col w-[90%]">
          <div className="w-full flex justify-between items-center h-[33%]">
            <span className="font-bold text-[24px]">ORDERED AS</span>
            <span>
              <span className="text-base text-[#2F2F2FCC]">per</span>
              <span className="text-xl text-[#2F2F2F]"> 10,000 Bricks </span>
              <span className="text-base text-[#2F2F2FCC]">(1 Quantity)</span>
            </span>
          </div>
          <hr />
          <div className="w-full flex justify-between items-center h-[33%]">
            <span className="font-bold text-[24px]">SPECS</span>
            <span>
              <span className="text-xl text-[#2F2F2F]">
                {" "}
                Description here........................{" "}
              </span>
            </span>
          </div>
          <hr />
          <div className="text-base text-[#2F2F2FCC] h-[33%] overflow-y-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            nobis dicta impedit, mollitia perferendis pariatur.
          </div>
        </div>
      </div>

      {/* Quantity + Total & Cost Bar */}
      <div className="w-[96%] flex flex-wrap items-center justify-center gap-4 mt-4">
        {/* Quantity Label and Input */}
        <div className="flex items-center gap-2">
          <div className="text-[20px] font-bold px-4">QUANTITY</div>
          <input
            type="number"
            defaultValue={5}
            className="text-[18px] w-[200px] h-[40px] rounded-full px-4 border border-gray-400 text-black font-medium outline-none"
          />
        </div>

        {/* Total + Cost Display */}
        <div className="flex items-center justify-between text-[18px] w-[500px] h-[46px] rounded-[10px] px-12 shadow-md border border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <strong className="font-bold">TOTAL</strong>
            <span className="text-[#2F2F2F]">50,000 BRICKS</span>
          </div>
          <div className="flex items-center gap-4">
            <strong className="font-bold">COST</strong>
            <span className="text-[#2F2F2F]">100,000 PKR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListCard;
