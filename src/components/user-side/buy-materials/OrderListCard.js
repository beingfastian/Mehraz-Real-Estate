import React from "react";
import Image from "next/image";

const OrderListCard = ({ order }) => {
  return (
    <div className="w-full flex flex-col items-center mb-6">
      {/* Main Card Row */}
      <div className="flex w-[96%] border shadow-lg rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative w-[250px] h-[230px] flex-shrink-0">
          <Image
            src={order.images[0]}
            alt="Product image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-row items-stretch p-4 gap-6">
          {/* Left Section - Product Info */}
{/* Left Section - Product Info */}
<div className="flex flex-col justify-between w-[25%]">
  <div>
    <h2 className="text-xl font-semibold truncate">{order.name}</h2>
    <p className="text-base text-gray-700 truncate">{order.vendor}</p>
  </div>
</div>


          {/* Divider */}
          <div className="w-px bg-gray-300 mx-2" />

          {/* Middle Section - Order Details */}
          <div className="flex flex-col justify-between w-[35%]">
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-800">ORDERED AS</span>
              <span className="text-sm text-gray-700">{order.orderedAs}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-800">SPECS</span>
              <span className="text-sm text-gray-700 truncate">{order.specs}</span>
            </div>
            <div className="text-sm text-gray-600 max-h-[60px] overflow-y-auto">
              {order.description}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-300 mx-2" />

{/* Right Section - Rate, Quantity & Cost */}
<div className="flex flex-col justify-between w-[35%] items-end">
  {/* RATE Row - Top right */}
  <div className="mb-auto w-full flex justify-between">
    <span className="text-sm font-semibold text-gray-800">RATE</span>
    <span className="text-sm text-gray-700">{order.rate}</span>
  </div>

  {/* QUANTITY above TOTAL */}
  <div className="mb-[10px]">
    <div className="flex items-center gap-2">
      <label className="text-sm font-semibold text-gray-800">QUANTITY</label>
      <input
        type="number"
        defaultValue={order.quantity}
        min="1"
        className="w-[120px] h-[38px] text-sm border border-gray-300 rounded-full px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* TOTAL & COST */}
  <div className="border rounded-md px-4 py-2 bg-gray-50 w-full max-w-[330px]">
    <div className="flex justify-between items-center">
      <div>
        <span className="text-sm font-semibold text-gray-700">TOTAL</span>
        <span className="ml-2 text-sm text-gray-600">
          {order.quantity * 1000} Units
        </span>
      </div>
      <div>
        <span className="text-sm font-semibold text-gray-700">COST</span>
        <span className="ml-2 text-sm text-gray-600">
          {order.totalCost.toLocaleString()} PKR
        </span>
      </div>
    </div>
  </div>
</div>



        </div>
      </div>
    </div>
  );
};

export default OrderListCard;
