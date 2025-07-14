import React from "react";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
const BlackButton = ({
  loading = false,
  onclickfunction = () => toast.success("Function Not Defined!"),
  text = "Next",
  customClass = "", // add this line
}) => {
  return (
    <button
      type="button"
      disabled={loading}
      className={`py-2.5 px-8 sm:px-5 mb-2 text-sm text-white font-bold focus:outline-none
        ${loading ? "bg-white border-gray-800" : "bg-[#323232]"}
        border border-white hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-100
        dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800
        dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-white hover:border-gray-800
        ${customClass}`} // apply extra class
      onClick={onclickfunction}>
      {loading ? <Spinner size="sm" className="border-white" /> : text}
    </button>
  );
};


export default BlackButton;
