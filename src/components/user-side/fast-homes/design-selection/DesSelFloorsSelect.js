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
          className=" flex items-stretch rounded-full overflow-hidden border border-[#282828] border-opacity-60  h-[80px] lg:h-[70px] md:h-[50px] sm:h-[40px]  w-full ">
          <span
            className="bg-white text-[#000000a6] py-3 sm:py-2  text-large flex-1 flex justify-center items-center
          ">
            {options.find(option => option.value === selectedOption)?.label}
          </span>
          <span className="bg-[#E2E2E2] flex items-center justify-center px-4 sm:px-3 border-l border-[#282828] border-opacity-60 min-w-[71px] h-full sm:min-w-[44px]">
            <FaChevronDown
              size={28}
              className="w-7 sm:w-5 h-auto text-[#767676]"
            />
          </span>
        </button>
        {expanded && (
          <div className="w-max min-w-full absolute bottom-0 translate-y-full right-0 bg-white shadow-btn rounded-2xl border-2 border-accent-1-base py-2 pl-2 pr-1 z-[10] overflow-hidden">
            <div
              className="w-full text-black/70 grid grid-cols-1 gap-2.5 max-h-[33vh] overflow-y-auto pr-1 py-2"
              ref={dropdownRef}>
              {options?.map(({ label, value }, index) => {
                let labelArr = [];
                if (value !== "") {
                  labelArr = label.split(",").map(str => str.trim());
                }
                return (
                  <label
                    className={`flex items-center gap-3 p-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] border border-black/10 rounded-full cursor-pointer hover:bg-black hover:bg-opacity-5`}
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
