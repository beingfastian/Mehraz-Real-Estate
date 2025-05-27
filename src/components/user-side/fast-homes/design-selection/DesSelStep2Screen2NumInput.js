"use client";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const DesSelStep2Screen2NumInput = ({
  currencies,
  selectedCurrency,
  selectCurrencyHandler,
  budget,
  setBudget,
  min,
  max,
  inputStep,
}) => {
  const [expanded, setExpanded] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [expanded]);

 

  return (
    <>
      {/* <div
        className={`max-w--mx-auto flex items-center rounded-full border border-[#282828]/60`}>
        <input
          type="number"
          value={budget}
          step={inputStep}
          min={min}
          max={max}
          onChange={e => {
            if (e.target.value > max) e.target.value = max;
            setBudget(e.target.value);
          }}
          className="w-full px-4 py-2 text-1.5xl lg:text-lg text-[2F2F2F]"
          placeholder="Enter..."
          onBlur={e => {
            if (e.target.value < min) setBudget(min);
            if (e.target.value > max) setBudget(max);
          }}
        />
        <div className="relative">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="rounded-r-full bg-[#E2E2E2] flex items-center justify-center gap-2 px-4 border-l border-l-[#282828]/60">
            <span className="text-[#2F2F2F] py-2 text-1.5xl lg:text-lg">
              {
                currencies.find(option => option.value === selectedCurrency)
                  ?.label
              }
            </span>
            <FaChevronDown
              size={28}
              className="w-5 lg:w-3 h-auto text-[#2F2F2F]"
            />
          </button>
          {expanded && (
            <div className="w-max min-w-full absolute bottom-0 translate-y-full right-0 bg-white shadow-btn rounded-2xl border-2 border-accent-1-base py-2 pl-2 pr-1 z-[10] overflow-hidden">
              <div
                className="w-full text-black/70 grid grid-cols-1 max-h-[33vh] overflow-y-auto pr-1 py-2 lg:py-0.5"
                ref={dropdownRef}>
                {currencies?.map(({ label, value }, index) => (
                  <label
                    className={`flex items-center gap-3 p-2 text-xl lg:text-sm cursor-pointer hover:bg-black hover:bg-opacity-5 ${
                      index !== currencies.length - 1
                        ? "border-b border-black border-opacity-10"
                        : ""
                    }`}
                    htmlFor={`option${index}`}
                    key={index}>
                    <input
                      id={`option${index}`}
                      type="checkbox"
                      value={value}
                      checked={selectedCurrency === value}
                      onChange={e => {
                        if (e.target.checked) {
                          selectCurrencyHandler(value);
                        }
                        setExpanded(false);
                      }}
                      className="absolute top-0 left-0 text-accent-1-extra-dark rounded-md peer w-0 h-0 focus:outline-none"
                    />
                    <span className="block w-6 h-6 lg:w-4 lg:h-4 bg-white border-2 border-[#000000cc] rounded-full peer-checked:bg-[#000000cc]"></span>
                    <span className="flex-1 px-1 peer-checked:font-medium peer-focus:outline-2 peer-focus:outline-dashed peer-focus:outline-accent-2-base ">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div> */}

      <div className="max-w-[361px] h-[77px] m-auto custom-border  rounded-[50px] border-accent-gray-light relative">
        <div className="relative w-full h-full flex">
          <input
            type="number"
            className="pl-[41px] rounded-[50px] w-full h-full opacity-60 leading-normal text-large tracking-[0] font-normal text-large text-accent-gray-light no-outline"
            placeholder="Enter..."
            value={budget}
            step={inputStep}
            min={min}
            max={max}
            onChange={e => {
              if (e.target.value > max) e.target.value = max;
              setBudget(e.target.value);
            }}
            onBlur={e => {
              if (e.target.value < min) setBudget(min);
              if (e.target.value > max) setBudget(max);
            }}
          />
          <div className="relative" onClick={() => setExpanded(!expanded)}>
            <div className="pr-2 pl-1 border-l border-solid border-[#282828] rounded-[0px_50px_50px_0px]  h-full  bg-[#e2e2e2] flex-center cursor-pointer relative">
              <div className="font-normal text-[#2e2e2e] text-[28px] tracking-[0] leading-[normal] whitespace-nowrap">
                {
                  currencies.find(option => option.value === selectedCurrency)
                    ?.label
                }
              </div>
              <FaCaretDown className="normal-text" />
            </div>
          </div>
        </div>
        {expanded && (
          <div className="min-w-max  absolute bottom-0 translate-y-full right-0 bg-white shadow-btn rounded-2xl border-2 border-accent-1-base py-2 pl-2 pr-1 z-[10] overflow-hidden">
            <div
              className="w-full text-black/70 grid grid-cols-1 max-h-[33vh] overflow-y-auto pr-1 py-2 lg:py-0.5"
              ref={dropdownRef}>
              {currencies?.map(({ label, value }, index) => (
                <label
                  className={`flex items-center gap-3 p-2 text-xl lg:text-sm cursor-pointer hover:bg-black hover:bg-opacity-5 ${
                    index !== currencies.length - 1
                      ? "border-b border-black border-opacity-10"
                      : ""
                  }`}
                  htmlFor={`option${index}`}
                  key={index}>
                  <input
                    id={`option${index}`}
                    type="checkbox"
                    value={value}
                    checked={selectedCurrency === value}
                    onChange={e => {
                      if (e.target.checked) {
                        selectCurrencyHandler(value);
                      }
                      setExpanded(false);
                    }}
                    className="absolute top-0 left-0 text-accent-1-extra-dark rounded-md peer w-0 h-0 focus:outline-none"
                  />
                  <span className="block w-6 h-6 lg:w-4 lg:h-4 bg-white border-2 border-[#000000cc] rounded-full peer-checked:bg-[#000000cc]"></span>
                  <span className="flex-1 px-1 peer-checked:font-medium peer-focus:outline-2 peer-focus:outline-dashed peer-focus:outline-accent-2-base ">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DesSelStep2Screen2NumInput;
