import { generalTickIcon } from "@/assets";
import Image from "next/image";
import React from "react";

const Detail_RadioBtn = ({ main_title, subtitle, id, onChange, checked }) => {
  return (
    <div className="radial_strip " onClick={onChange}>
      {/* <input
        type="radio"
        id={id}
        name="custom-checkbox"
        className="radio_btn"
        onChange={onChange}
        checked={checked}
      /> */}
      <label htmlFor={id} className="radio_btn_lable">
        <Image
          src={generalTickIcon}
          alt="tick"
          className={`${checked ? "block" : "hidden"} w-[51px] h-[38px] md:w-[38px] md:h-[28px] sm:w-[28px] sm:h-[20px] xs:w-[20px] xs:h-[15px]`}
        />
      </label>

      <p className="radial_strip_lable">{main_title}</p>
      <div className="radial_strip_lable_info"> {subtitle}</div>
    </div>
  );
};

export default Detail_RadioBtn;
