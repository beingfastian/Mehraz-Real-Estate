import React, { useCallback } from "react";

const RadioTile = ({
  name,
  value,
  checked,
  onChange,
  label,
  width = "w-[16.25rem] lg:w-[15rem] md:w-[13.75rem] sm:w-[12.5rem]",
  textColor = "text-[#2f2f2f]",
  textSize = "text-xl lg:text-xl md:text-lg sm:text-base",
  icon = null,
  className = "",
 
 
}) => {
  // Function to generate responsive classes
 


  return (
    <label className={`relative ${width} h-full ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        className="peer hidden"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`
          w-full 
          h-full 
          rounded-full 
          bg-dull/75
          peer-checked:bg-accent-gold-lightest
          border 
          border-black/10 
          shadow-btn-shadow 
          px-4 
          md:px-3 
          sm:px-2 
          flex-between 
          sm:gap-1
          cursor-pointer
        `}>
        <div className="w-[1.625rem] md:w-[1.5rem] sm:w-[1.25rem] h-[1.625rem] md:h-[1.5rem] sm:h-[1.25rem] rounded-full bg-white border border-accent-black flex-center">
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[0.83rem] h-[0.75rem] md:w-[0.75rem] md:h-[0.625rem] sm:w-[0.625rem] sm:h-[0.5rem] ${
              checked ? "opacity-100" : "opacity-0"
            }`}
            preserveAspectRatio="none">
            <path
              d="M0.707031 5.29297L4.70703 9.29297"
              stroke="#2F2F2F"
              strokeWidth="2"
            />
            <line
              x1="14.7071"
              y1="0.707107"
              x2="4.70711"
              y2="10.7071"
              stroke="#2F2F2F"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2 md:gap-1">
          {icon && <span className="w-[1.25rem] h-[1.25rem]">{icon}</span>}
          <p className={`${textSize} text-left ${textColor} uppercase text-nowrap`}>
            {label}
          </p>
        </div>
      </div>
    </label>
  );
};

// PropTypes remain the same as in the previous example

export default RadioTile;
