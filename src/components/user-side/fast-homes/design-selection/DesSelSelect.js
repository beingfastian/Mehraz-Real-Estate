"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const DesSelSelect = ({
  options,
  selectedOption,
  selectHandler,
  className = "",
  placeholder = "Select City",
}) => {
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full h-[67px] overflow-hidden rounded-full bg-white shadow-sm"
      >
        {/* Left: Label */}
        <span
          className="flex-1 flex justify-center items-center px-6"
          style={{
            fontSize: "30px",
            fontWeight: 400,
            opacity: 0.65,
            color: "#000",
          }}
        >
          {
            options.find((o) => o.value === selectedOption)?.label ||
            placeholder
          }
        </span>

        {/* Right: Chevron */}
        <span
          className="flex items-center justify-center"
          style={{
            width: "71px",
            backgroundColor: "#e2e2e2",
            borderLeft: "1px solid black",
            borderTopRightRadius: "999px",
            borderBottomRightRadius: "999px",
          }}
        >
          <FaChevronDown
            style={{
              fontSize: "24px",
              color: "#000",
            }}
          />
        </span>
      </button>

      {expanded && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-full bg-white rounded-2xl border border-gray-300 shadow-lg z-50 overflow-hidden"
        >
          <div className="max-h-[33vh] overflow-y-auto py-2">
            {options.map(({ label, value }, index) => (
              <button
                key={value}
                onClick={() => {
                  selectHandler(value);
                  setExpanded(false);
                }}
                className={`w-full text-left px-6 py-4 text-black/80 text-[20px] hover:bg-black/5 ${
                  index !== options.length - 1
                    ? "border-b border-black/10"
                    : ""
                } ${
                  selectedOption === value ? "font-semibold" : "font-medium"
                }`}
              >
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
