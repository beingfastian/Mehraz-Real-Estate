import React from "react";
import BlackButton from "../../BlackButton";

const ThirdCard = ({ step, setStep }) => {
  return (
    <div className=" min-h-[300px] flex flex-col justify-between md:min-h-[auto] ">
      <div>
        <span className=" font-bold">Any Concerns?</span> CHAT WITH US'
        <hr />
      </div>
      <div className=" md:flex justify-between">
        <div className=" bg-[#EFEFEF] text-xl text-center md:text-start md:bg-white">
          <span className=" font-bold">Total Cost</span>
          <br />
          100000 PKR
        </div>
        <span onClick={() => setStep(prev => prev + 1)}>
          <BlackButton text="NEXT" className="mt-2" />
        </span>
      </div>
    </div>
  );
};

export default ThirdCard;
