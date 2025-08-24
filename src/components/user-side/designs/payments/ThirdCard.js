import React from "react";

const ThirdCard = ({ step, setStep, totalCost = 0 }) => {
  // Format the total cost with commas for better readability
  const formatCurrency = amount => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("PKR", "PKR ");
  };

  return (
    <div className="min-h-[300px] flex flex-col justify-between md:min-h-[auto]">
      <div>
        <span className="font-bold">Any Concerns?</span> CHAT WITH US
        <hr className="mt-2 mb-4" />
      </div>

      <div className="md:flex justify-between">
        <div className="bg-[#EFEFEF] text-xl text-center md:text-start md:bg-white w-full shadow-lg border border-gray-300 rounded-2xl p-4">
          <div className="mb-2">
            <span className="font-bold">Total Cost</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(totalCost)}
          </div>
          {totalCost > 0 && (
            <div className="text-sm text-gray-600 mt-2">
              Based on selected services
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThirdCard;
