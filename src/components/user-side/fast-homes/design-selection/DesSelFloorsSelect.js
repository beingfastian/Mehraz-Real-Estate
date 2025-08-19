"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa6";

const DesSelFloorsSelect = ({
  options,
  selectedOptions = [],
  selectHandler,
  className = "",
  placeholder = "FLOORS",
  mobilePlaceholder = "FLOORS", // Shorter placeholder for mobile
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Detect click outside
  const handleClickOutside = event => {
    if (
      !dropdownRef.current?.contains(event.target) &&
      !buttonRef.current?.contains(event.target)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // ✅ Detect mobile screen safely
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  // Display text with mobile/desktop placeholder handling
  const displayText = (() => {
    if (selectedOptions.length === 0) {
      return isMobile ? mobilePlaceholder : placeholder;
    }
    if (selectedOptions.length === 1) {
      return options.find(o => o.value === selectedOptions[0])?.label;
    }
    return isMobile
      ? `${selectedOptions.length} selected`
      : `${selectedOptions.length} floors selected`;
  })();

  const toggleOption = value => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter(option => option !== value)
      : [...selectedOptions, value];
    selectHandler(newSelectedOptions);
  };

  return (
    <div
      className={`relative ${className} w-full 
                  max-w-[323px] lg:max-w-[252px] md:max-w-[220px] sm:max-w-[185px] xs:max-w-[150px] 
                  flex justify-center lg:justify-end`}>
      {/* Main Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full overflow-hidden rounded-full bg-white shadow-md 
                   h-[50px] md:h-[60px] lg:h-[67px] 
                   border border-gray-200 hover:border-gray-300 transition-colors">
        <span
          className="flex-1 flex justify-start items-center 
                         px-4 md:px-6 
                         text-sm md:text-xl lg:text-[30px] 
                         font-normal text-black/65 
                         overflow-hidden text-ellipsis whitespace-nowrap">
          {displayText}
        </span>
        <span
          className="flex items-center justify-center 
                         min-w-[40px] md:min-w-[60px] lg:min-w-[71px] 
                         bg-[#e2e2e2] border-l border-gray-300 
                         h-full rounded-tr-full rounded-br-full">
          {expanded ? (
            <FaChevronUp className="text-black size-4 md:size-5 lg:size-6" />
          ) : (
            <FaChevronDown className="text-black size-4 md:size-5 lg:size-6" />
          )}
        </span>
      </button>

      {/* Dropdown */}
      {expanded && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-1 md:mt-2 w-full min-w-[250px] 
                     bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl 
                     border border-gray-200 shadow-xl z-[100] overflow-hidden">
          {/* Dropdown Header */}
          <div className="text-center py-2 md:py-3 border-b border-gray-100 bg-white/95">
            <span className="font-semibold text-sm md:text-base">
              Select Floors
            </span>{" "}
            <span className="text-gray-500 text-sm md:text-base">You Want</span>
          </div>

          {/* Options */}
          <div className="max-h-[50vh] overflow-y-auto py-1 md:py-2 px-2 md:px-3">
            {options?.map(({ label, value }) => {
              const isSelected = selectedOptions.includes(value);
              return (
                <div
                  key={value}
                  className={`flex items-center justify-between 
                              p-2 md:p-3 md:px-4 rounded-lg cursor-pointer transition-colors 
                              ${
                                isSelected
                                  ? "bg-[#E5CD86]/20"
                                  : "hover:bg-gray-100/80"
                              }`}
                  onClick={() => toggleOption(value)}>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span
                      className={`flex items-center justify-center 
                                  w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all 
                                  ${
                                    isSelected
                                      ? "border-[#E5CD86] bg-[#E5CD86]"
                                      : "border-gray-400 bg-white"
                                  }`}>
                      {isSelected && (
                        <FaCheck className="text-white size-3 md:size-[12px]" />
                      )}
                    </span>
                    <span className="text-sm md:text-base lg:text-xl xl:text-base">
                      {label}
                    </span>
                  </div>
                  <span className="text-black/50 text-xs md:text-sm">
                    FLOOR
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dropdown Footer */}
          <div
            className="flex items-center justify-between 
                          px-3 py-2 md:px-4 md:py-3 
                          border-t border-gray-100 bg-white/95">
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-black">For More Floors,</span>{" "}
              You Can Tell Us After Home Selection
            </p>
            <button
              className="flex items-center justify-center 
                         w-8 h-8 md:w-10 md:h-10 
                         bg-gray-200/80 rounded-full cursor-pointer 
                         hover:bg-gray-300/80 transition-colors"
              onClick={() => setExpanded(false)}>
              <FaChevronUp className="text-black size-3 md:size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesSelFloorsSelect;
