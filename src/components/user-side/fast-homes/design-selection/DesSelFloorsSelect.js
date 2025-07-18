"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const DesSelFloorsSelect = ({
  options,
  selectedOption,
  selectHandler,
  className = "",
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
      <div
        className={`relative ${className} max-w-[323px] lg:max-w-[252px] sm:max-w-[185px] xs:max-w-[150px] w-full  flex justify-center lg:justify-end`}>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className=" flex w-full overflow-hidden rounded-full bg-white shadow-sm border border-[#28282899] h-[67px] ">
          <span
            className="flex-1 flex justify-center items-center px-6 text-[30px] font-normal text-black/65
          ">
            {options.find(option => option.value === selectedOption)?.label}
          </span>
          <span className="flex items-center justify-center min-w-[71px] bg-[#e2e2e2] border-l border-black h-full rounded-tr-full rounded-br-full">
            <FaChevronDown size={28} className="text-black text-[24px]" />
          </span>
        </button>
        {expanded && (
          <div className="absolute top-full right-0 mt-2 w-full bg-white rounded-2xl border border-gray-300 shadow-lg z-[10] overflow-hidden">
            <div
              className="max-h-[30vh] overflow-y-auto py-2"
              ref={dropdownRef}>
              {options?.map(({ label, value }, index) => {
                let labelArr = [];
                if (value !== "") {
                  labelArr = label.split(",").map(str => str.trim());
                }
                return (
                  <label
                    className={`flex items-center gap-3 px-6 py-4 border-b border-black/10 cursor-pointer hover:bg-black/5 rounded-none ${
                      selectedOption === value ? "font-semibold" : "font-medium"
                    }`}
                    htmlFor={`option${index}`}
                    key={index}>
                    <input
                      id={`option${index}`}
                      type="checkbox"
                      value={value}
                      checked={selectedOption === value}
                      onChange={e => {
                        if (e.target.checked) {
                          selectHandler(value);
                        }
                        setExpanded(false);
                      }}
                      className="absolute top-0 left-0 text-accent-1-extra-dark rounded-md peer w-0 h-0 focus:outline-none"
                    />
                    <span className="block w-6 h-6 xl:w-5 xl:h-5 bg-white border-2 border-[#000000cc] rounded-full peer-checked:bg-[#000000cc]"></span>
                    <span className="flex-1 grid grid-cols-2 items-center px-1 peer-checked:font-medium peer-focus:outline-2 peer-focus:outline-dashed peer-focus:outline-accent-2-base ">
                      <span className="text-xl xl:text-base sm:text-sm">
                        {`${
                          labelArr.length === 0
                            ? label
                            : `${labelArr.length} Floor`
                        }`}
                      </span>
                      <span className="flex flex-col text-lg xl:text-sm">
                        {labelArr.length > 0 &&
                          labelArr.map((str, index) => (
                            <>
                              <span key={index}>{str}</span>
                              {index !== labelArr.length - 1 && (
                                <hr className="w-full border-black/10" />
                              )}
                            </>
                          ))}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DesSelFloorsSelect;
