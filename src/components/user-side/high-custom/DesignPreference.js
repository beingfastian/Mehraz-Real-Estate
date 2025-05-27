import React from "react";

const DesignPreference = () => {
  return (
    <form>
      <div className="w-full mb-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 relative border rounded-xl overflow-hidden border-[#2F2F2F]">
        <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <textarea
            id="editor"
            rows="8"
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write an article..."
            required></textarea>
        </div>
        <div className="flex bg-[#BD9F4B] items-center justify-between px-3 py-2 border-b dark:border-gray-600 relative top-[1px]">
          <span className=" text-white text-sm w-[70%]">
            REFERENCE <span className=" font-bold">FILE /IMG</span> (MAX LIMIT
            1MP)
          </span>
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600 w-[30%] justify-end">
            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
              <button
                type="button"
                className="p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 bg-white text-sm flex">
                ATTACH
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20">
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
                {/* <span className="sr-only">Attach file</span> */}
              </button>
            </div>
          </div>
          <div
            id="tooltip-fullscreen"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Show full screen
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DesignPreference;
