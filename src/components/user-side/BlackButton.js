import React from "react";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
const BlackButton = ({
  loading = false,
  onclickfunction = function name() {
    toast.success("Function Not Defined!");
  },
  text = "Next",
}) => {
  return (
    <>
      <button
        type="button"
        disabled={loading}
        className={`py-2.5 px-8 sm:px-5  mb-2 text-sm text-white  focus:outline-none  ${
          loading ? "bg-white border-gray-800" : "bg-[#323232]"
        }   border border-white hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800 dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-white hover:border-gray-800 font-bold`}
        onClick={onclickfunction}>
        {loading ? <Spinner size={"sm"} className={"border-white"} /> : text}
      </button>
    </>
  );
};

export default BlackButton;
