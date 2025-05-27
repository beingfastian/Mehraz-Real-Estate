import React from "react";

const  AdvancePaymentSelection = ({
  title,
  amount,
  currency,
  isSelected,
  onChange,
  id,
}) => {
  return (
    <div
      className={`w-full h-[49.82px] rounded-full  border border-accent-black/40 pl-14 md:pl-12 sm:pl-4 pr-12 md:pr-10 sm:pr-4 flex items-center gap-11 md:gap-5 sm:gap-3 cursor-pointer ${
        isSelected ? "bg-accent-gold-3" : "bg-white"
      }`}
      style={{ boxShadow: "0px 8px 12px 0 rgba(0,0,0,0.15)" }}
      onClick={onChange}>
      <label className="min-w-[30px] md:min-w-[25px] min-h-[29px] md:min-h-[24px]  rounded-full bg-white border-2 border-accent-black cursor-pointer flex-center">
        <input
          type="radio"
          name="payment-option"
          id={id}
          className="hidden peer"
          checked={isSelected}
          onChange={onChange}
        />
        <div className="small-tick opacity-0 peer-checked:opacity-100 transition-all duration-300"></div>
      </label>
      <div className="w-full flex-between items-center text-nowrap overflow-x-auto">
        <p className="text-large text-left text-accent-black">{title}</p>
        <p className="text-left text-accent-black">
          <span className="normal-text-3 text-left text-accent-black">{amount} </span>
          <span className="base-text text-left text-accent-black">{currency}</span>
        </p>
      </div>
    </div>
  );
};

export default AdvancePaymentSelection;
