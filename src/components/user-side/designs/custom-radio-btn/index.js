import React from "react";

const CustomRadioBtn = ({ text, selected, onChange }) => {
  return (
    <label
      className="relative flex items-center gap-2 md:gap-1 text-xl xl:text-base sm:text-sm cursor-pointer  "
      htmlFor={`option_${text}`}>
      <input
        id={`option_${text}`}
        type="radio"
        name="type"
        className="hidden peer"
        checked={selected === text}
        onChange={() => onChange(text)}
      />
      <span className="block w-6 h-6 xl:w-5 xl:h-5 lg:w-4 lg:h-4  border-2 border-[#4D4D4D] rounded-full peer-checked:bg-[#7D7D7D]"></span>
      <p class="inp-label">{text}</p>
    </label>
  );
};

export default CustomRadioBtn;
