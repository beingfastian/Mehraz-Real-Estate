"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const DesSelSelect = ({
  options,
  selectedOption,
  selectHandler,
  className = "",
  placeholder = "Select City",
  mobilePlaceholder = "",
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Run only in client
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getDisplayText = () => {
    const selected = options.find(o => o.value === selectedOption);
    if (selected) return selected.label;
    return isMobile && mobilePlaceholder ? mobilePlaceholder : placeholder;
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full overflow-hidden rounded-full bg-white shadow-md 
                   border border-gray-200 hover:border-gray-300 transition-colors h-[50px] md:h-[60px] lg:h-[67px]">
        {/* Label */}
        <span
          className="flex-1 flex justify-start items-center 
                         px-4 md:px-6 
                         text-sm md:text-xl lg:text-[30px] 
                         font-normal text-black/65 
                         overflow-hidden text-ellipsis whitespace-nowrap">
          {getDisplayText()}
        </span>

        {/* Chevron */}
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

      {expanded && (
        <div
          className="absolute top-full right-0 mt-2 w-full 
                     bg-white rounded-2xl border border-gray-300 
                     shadow-lg z-50 overflow-hidden">
          <div className="max-h-[50vh] overflow-y-auto py-2">
            {options.map(({ label, value }, index) => (
              <button
                key={value}
                onClick={() => {
                  selectHandler(value);
                  setExpanded(false);
                }}
                className={`w-full text-left px-4 md:px-6 
                           py-3 md:py-4 
                           text-[14px] md:text-[20px] text-black/80 
                           hover:bg-black/5 
                           ${
                             index !== options.length - 1
                               ? "border-b border-black/10"
                               : ""
                           } 
                           ${
                             selectedOption === value
                               ? "font-semibold"
                               : "font-medium"
                           }`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DesSelSelect;
