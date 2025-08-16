"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa6";

const DesSelFloorsSelect = ({
  options,
  selectedOptions = [],
  selectHandler,
  className = "",
  placeholder = "Select Floors",
}) => {
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleOption = value => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter(option => option !== value)
      : [...selectedOptions, value];
    selectHandler(newSelectedOptions);
  };

  const displayText =
    selectedOptions.length > 0
      ? selectedOptions.length === 1
        ? options.find(o => o.value === selectedOptions[0])?.label
        : `${selectedOptions.length} floors selected`
      : placeholder;

  return (
    <div
      className={`relative ${className} max-w-[323px] lg:max-w-[252px] sm:max-w-[185px] xs:max-w-[150px] w-full flex justify-center lg:justify-end`}>
      {/* Main Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full overflow-hidden rounded-full bg-white shadow-md h-[67px] border border-gray-200">
        <span className="flex-1 flex justify-start items-center px-6 text-[30px] font-normal text-black/65 overflow-hidden text-ellipsis whitespace-nowrap">
          {displayText}
        </span>
        <span className="flex items-center justify-center min-w-[71px] bg-[#e2e2e2] border-l border-gray-300 h-full rounded-tr-full rounded-br-full">
          {expanded ? (
            <FaChevronUp size={24} className="text-black" />
          ) : (
            <FaChevronDown size={24} className="text-black" />
          )}
        </span>
      </button>

      {/* Dropdown */}
      {expanded && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-full bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl z-[100] overflow-hidden">
          {/* Restored Dropdown Header */}
          <div className="text-center py-3 border-b border-gray-100 bg-white/90">
            <span className="font-semibold text-base">Select Floors</span>{" "}
            <span className="text-gray-500 text-base">You Want</span>
          </div>

          <div className="max-h-[30vh] overflow-y-auto py-2 px-3">
            {options?.map(({ label, value }) => {
              const isSelected = selectedOptions.includes(value);
              return (
                <div
                  key={value}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? "bg-[#E5CD86]/20" : "hover:bg-gray-100/80"
                  }`}
                  onClick={() => toggleOption(value)}>
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all ${
                        isSelected
                          ? "border-[#E5CD86] bg-[#E5CD86]"
                          : "border-gray-400 bg-white"
                      }`}>
                      {isSelected && (
                        <FaCheck size={12} className="text-white" />
                      )}
                    </span>
                    <span className="text-xl xl:text-base sm:text-sm">
                      {label}
                    </span>
                  </div>
                  <span className="text-black/50 text-md xl:text-sm">
                    FLOOR
                  </span>
                </div>
              );
            })}
          </div>

          {/* Restored Dropdown Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-white/90">
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-black">For More Floors,</span>{" "}
              You Can Tell Us After Home Selection
            </p>
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-200/80 rounded-full cursor-pointer hover:bg-gray-300/80 transition-colors"
              onClick={() => setExpanded(false)}>
              <FaChevronUp className="text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesSelFloorsSelect;
