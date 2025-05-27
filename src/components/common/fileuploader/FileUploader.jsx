import React, { useState } from "react";
import Image from "next/image";
import { fileChainIcon } from "@/assets";
const TextareaWithUpload = ({
  style: {
    maxWidth = "max-w-[78.1875rem]",
    height = "h-[6.5rem]",
    borderRadius = "rounded-[1.25rem]",
    borderWidth = "border-2",
    borderColor = "border-[#2f2f2f]/60",
    textareaBorderRadius = "rounded-[1.25rem]",
  },
  textareaPlaceholder = "TELL US ABOUT YOUR NEEDS, what your planned imagination is ...",
  referenceText = "REFERENCE",
  referenceHighlight = "FILE /IMG",
  maxLimitText = "(max lmt)",
  className = "",
}) => {
  return (
    <div
      className={`
      ${maxWidth} 
      mx-auto 
      w-full 
      ${height} 
      ${borderRadius} 
      ${borderWidth} 
      ${borderColor} 
      flex 
      flex-col 
      overflow-hidden
      ${className}
    `}>
      <textarea
        className={`
          ${textareaBorderRadius} 
          w-full 
          h-full 
          no-outline 
          resize-none 
          text-center 
          text-[#2f2f2f]/60 
          placeholder:text-[#2f2f2f]/60
          base-text
        `}
        placeholder={textareaPlaceholder}
      />

      <div className="w-full h-[29px] bg-[#bd9f4b] border border-black/20 flex-center">
        <div className="max-w-[27.4375rem] w-full flex justify-between items-center px-4">
          <p className="opacity-80 text-sm text-center text-white">
            <span>{referenceText} </span>
            <span className="font-bold">{referenceHighlight}</span>
            &nbsp;
            <span className="text-xs">{maxLimitText}</span>
          </p>

          <div className="w-[5.8125rem]  rounded-[0.5628rem] bg-white border border-black/5 shadow-btn-shadow flex-center gap-1 relative overflow-hidden hover:bg-gray-50 transition-colors">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <p className="opacity-60 text-sm text-center text-[#2f2f2f] pointer-events-none">
              attach
            </p>
            <Image
              src={fileChainIcon}
              alt="file chain"
              className="pointer-events-none w-6 h-5 opacity-[0.55] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextareaWithUpload;
