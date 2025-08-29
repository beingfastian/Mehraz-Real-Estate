import React, { useState } from "react";
import Image from "next/image";

const OrderListCard = ({ material }) => {
  const [quantity, setQuantity] = useState(material.quantity || 1);

  const totalCost = (material.rate || 0) * quantity;

  return (
    <div className="flex justify-center items-center flex-col space-y-4 mb-8">
      {/* Main Card */}
      <div className="h-[179px] w-[96%] flex rounded-[10px] border-2 bg-white shadow-lg overflow-hidden">
        {/* Image(s) */}
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
            src={material.image || "https://via.placeholder.com/270x180"}
            alt={material.name || "Material"}
            width={270}
            height={180}
            className="rounded-[6px] border border-black shadow-md object-cover object-center"
          />
            </div>
          ))}
        </div>

        {/* Name, Vendor, Rate */}
        <div className="h-full w-[30%] mx-2 flex flex-col">
          <div className="font-bold text-[24px] my-[10px]">
            {material.name || "Material"}
          </div>
          <div className="font-medium text-[22px] text-[#2F2F2F]">
            {material.vendor || "Unknown Vendor"}
          </div>
          <hr />
          <div className="font-bold text-[#2F2F2F] text-[24px]">RATE</div>
          <div className="mt-2 text-[20px] w-full h-[40px] rounded-[50px] p-2 border border-black text-black font-medium text-left">
            {material.rate} PKR / {material.orderedAs}
          </div>
        </div>

        {/* Order Details */}
        <div className="h-full flex-grow mx-2 flex flex-col w-[90%]">
          <div className="w-full flex justify-between items-center h-[33%]">
            <span className="font-bold text-[24px]">ORDERED AS</span>
            <span className="text-xl text-[#2F2F2F]">
              {material.orderedAs} ({quantity} Qty)
            </span>
          </div>
          <hr />
          <div className="w-full flex justify-between items-center h-[33%]">
            <span className="font-bold text-[24px]">SPECS</span>
            <span className="text-xl text-[#2F2F2F]">
              {material.specs || "No description"}
            </span>
          </div>
          <hr />
          <div className="text-base text-[#2F2F2FCC] h-[33%] overflow-y-auto">
            {material.description ||
              "No additional details available for this material."}
          </div>
        </div>
      </div>

      {/* Quantity + Total & Cost Bar */}
      <div className="w-[96%] flex flex-wrap items-center justify-center gap-4 mt-4">
        {/* Quantity Input */}
        <div className="flex items-center gap-2">
          <div className="text-[20px] font-bold px-4">QUANTITY</div>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="text-[18px] w-[200px] h-[40px] rounded-full px-4 border border-gray-400 text-black font-medium outline-none"
          />
        </div>

        {/* Total + Cost Display */}
        <div className="flex items-center justify-between text-[18px] w-[500px] h-[46px] rounded-[10px] px-12 shadow-md border border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <strong className="font-bold">TOTAL</strong>
            <span className="text-[#2F2F2F]">
              {quantity} × {material.orderedAs}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <strong className="font-bold">COST</strong>
            <span className="text-[#2F2F2F]">
              {totalCost.toLocaleString()} PKR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListCard;
