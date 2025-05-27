import React from "react";

const Level_selector = ({
  level,
  value,
  onChange,
  checked,
  first_label,
  second_label,
  sec_label_classname,
}) => {
  return (
    <div className="f-col sm:flex-row gap-0.5 sm:gap-1 sm:justify-between sm:w-full w-auto">
      <div className="flex items-center gap-[2.6875rem] lg:gap-[2.125rem] md:gap-[1.5rem] sm:gap-[0.7rem]">
        <label className="unique-home-selection-lable relative cursor-pointer">
          <input
            type="radio"
            name={level}
            value={value}
            checked={checked}
            onChange={onChange}
            className="absolute opacity-0 peer"
          />
          <div className="unique-home-tile peer-checked:bg-black"></div>
        </label>

        <p className="normal-text-2 font-bold md:font-semibold text-center text-accent-black uppercase">
          {value}
        </p>
      </div>
      <div class="relative w-[13.6875rem] lg:w-[12.5rem] md:w-[11.25rem] sm:w-[10rem] h-11 lg:h-10 md:h-9 sm:h-8 rounded-full bg-white border border-black/10 shadow-btn-shadow flex">
        <div className="flex-1 f-col sm:justify-center w-full ">
          <p class="text-base md:text-sm sm:text-xs font-medium text-center text-[#2f2f2f]/60">
            Changes
          </p>
          <p class="text-base md:text-sm sm:text-xs font-medium text-center text-[#2f2f2f]/90">
            {first_label}
          </p>
        </div>
        <div className="w-[1px] h-full bg-black/30 absolute left-1/2 -translate-x-1/2 top-0"></div>
        <div className="flex-1 f-col sm:justify-center w-full">
          <p class="text-base md:text-sm sm:text-xs font-medium text-center text-[#2f2f2f]/60">
            Changes
          </p>
          <p
            class={`text-base md:text-sm sm:text-xs font-medium text-center text-accent-black opacity-90 ${sec_label_classname}`}>
            {second_label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Level_selector;
