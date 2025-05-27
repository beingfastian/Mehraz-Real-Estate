import React from "react";

const CustomRadioTile = ({ title, isInfo, checked, onChange }) => {
  return (
    <div
      className="max-w-[445px] w-full mx-auto bg-primary-cta rounded-full h-[3.1rem] md:h-[2.5rem] sm:h-[2.2rem] flex px-7 justify-between items-center cursor-pointer"
      onClick={onChange}>
      <div className="w-[1.8rem] h-[1.8rem] md:w-[1.5rem] md:h-[1.5rem] sm:w-[1.2rem] sm:h-[1.2rem] bg-accent-1-base rounded-full flex justify-center items-center cursor-pointer ">
        <div
          className={`w-4 md:w-3 sm:w-2.5 h-4 md:h-3 sm:h-2.5 rounded-full ${
            checked ? "bg-accent-black" : "bg-transparent"
          }`}></div>
      </div>

      <p className="text-large font-semibold text-left text-white uppercase">
        {title}
      </p>
      {isInfo && (
        <div>
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[25px] h-[25px]"
            preserveAspectRatio="none">
            <path
              d="M13 0.5C10.5277 0.5 8.11099 1.23311 6.05538 2.60663C3.99976 3.98015 2.39761 5.93238 1.45151 8.21646C0.505416 10.5005 0.257874 13.0139 0.74019 15.4386C1.2225 17.8634 2.41301 20.0907 4.16117 21.8388C5.90933 23.587 8.13661 24.7775 10.5614 25.2598C12.9861 25.7421 15.4995 25.4946 17.7835 24.5485C20.0676 23.6024 22.0199 22.0002 23.3934 19.9446C24.7669 17.889 25.5 15.4723 25.5 13C25.5 11.3585 25.1767 9.73303 24.5485 8.21646C23.9203 6.69989 22.9996 5.3219 21.8388 4.16116C20.6781 3.00043 19.3001 2.07969 17.7835 1.45151C16.267 0.823322 14.6415 0.5 13 0.5ZM13 23C11.0222 23 9.08879 22.4135 7.4443 21.3147C5.79981 20.2159 4.51809 18.6541 3.76121 16.8268C3.00433 14.9996 2.8063 12.9889 3.19215 11.0491C3.57801 9.10929 4.53041 7.32746 5.92894 5.92893C7.32746 4.53041 9.10929 3.578 11.0491 3.19215C12.9889 2.8063 14.9996 3.00433 16.8268 3.7612C18.6541 4.51808 20.2159 5.79981 21.3147 7.4443C22.4135 9.08879 23 11.0222 23 13C23 15.6522 21.9464 18.1957 20.0711 20.0711C18.1957 21.9464 15.6522 23 13 23Z"
              fill="white"></path>
            <path
              d="M13 9.25C13.6904 9.25 14.25 8.69036 14.25 8C14.25 7.30964 13.6904 6.75 13 6.75C12.3096 6.75 11.75 7.30964 11.75 8C11.75 8.69036 12.3096 9.25 13 9.25Z"
              fill="white"></path>
            <path
              d="M13 10.5C12.6685 10.5 12.3505 10.6317 12.1161 10.8661C11.8817 11.1005 11.75 11.4185 11.75 11.75V18C11.75 18.3315 11.8817 18.6495 12.1161 18.8839C12.3505 19.1183 12.6685 19.25 13 19.25C13.3315 19.25 13.6495 19.1183 13.8839 18.8839C14.1183 18.6495 14.25 18.3315 14.25 18V11.75C14.25 11.4185 14.1183 11.1005 13.8839 10.8661C13.6495 10.6317 13.3315 10.5 13 10.5Z"
              fill="white"></path>
          </svg>
        </div>
      )}
      {/* B3TL69&br!h_*Mw */}
    </div>
  );
};

export default CustomRadioTile;
