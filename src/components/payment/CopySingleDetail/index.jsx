import React from "react";
import { copyIcon } from "@/assets";
import Image from "next/image";
const CopySingleDetail = ({ title, value }) => {
  return (
    <div className="w-full py-[9px] lg:py-[8px] md:py-[6px] sm:py-[5px] px-6 lg:px-[20px] md:px-[15px] sm:px-[10px] pl-[35px] opacity-95 rounded-[20px] lg:rounded-2xl md:rounded-xl sm:rounded-lg bg-white border border-accent-black/25 flex items-center justify-between">
      <div className="f-col justify-between">
        <p className="opacity-70 base-text-0 text-black">{title}</p>
        <p className="normal-text text-accent-black text-wrap break-all">{value}</p>
      </div>
      <button
        //   onClick={() =>
        //     copyToClipboard(bankDetails.localAccount, "local")
        //   }
        className="min-w-[52px] min-h-[52px] lg:min-w-[40px] lg:min-h-[40px] md:min-w-[30px] md:min-h-[30px] sm:min-w-[20px] sm:min-h-[20px] rounded-full bg-[#efefef]/50 shadow-copy relative flex-center">
        <Image
          src={copyIcon}
          alt="copy"
          className="w-[25px] h-[28px] md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px]"
        />
        {/* {copyFeedback === "local" && (
        <span className="absolute -top-2 right-0 text-green-600 text-sm">
          Copied!
        </span>
      )} */}
      </button>
    </div>
  );
};

export default CopySingleDetail;
