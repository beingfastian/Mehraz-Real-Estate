import BackBtn from "@/components/backBtn";
import React from "react";

const Claim = () => {
  return (
    <div className="page-height bg-claim bg-cover bg-no-repeat bg-center ">
      <div className=" page-height flex-center relative  p-8 sm:p-4  w-full container">
        <div className="absolute top-8 left-8 sm:top-4 sm:left-4">
          <BackBtn />
        </div>

        <div className="f-col items-center justify-center w-full claim-page-gap">
          <p className="extra-large-2 font-bold md:font-semibold text-center text-white">
            DIDN’T FIND WHAT YOU NEED?
          </p>
          <div className="f-col items-center max-w-[46.81rem] md:max-w-[37.5rem] sm:max-w-sm xs:max-w-xs w-full m-auto claim-page-gap">
            <div className="group flex justify-center items-center w-full   p-6 md:p-4 sm:p-3 relative rounded-xl md:rounded-lg sm:rounded-md border-[3px] md:border-2  border-white shadow-btn-shadow hover:border-accent-gold-light cursor-pointer">
              <p className="extra-large-2  text-center uppercase text-white group-hover:text-accent-gold-light">
                GO CUSTOM
              </p>
            </div>
            <div className="flex items-center gap-4 md:gap-3 sm:gap-2 px-11 md:px-9 sm:px-7 w-full">
              <div className="w-full  h-0.5 bg-white rounded-full"></div>
              <p className="extra-large text-center text-white">OR</p>
              <div className="w-full h-0.5 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <div className="h-full rounded-[30px] md:rounded-2xl sm:rounded-md xs:rounded-lg bg-[#efefef]/25 shadow-btn-shadow pt-1.5 pb-4 px-11 md:px-7 sm:px-3">
              <p className="text-[32px] md:text-2xl sm:text-xl text-center text-white">
                Request New Design
              </p>
              <div className="relative flex-col justify-between w-full h-[11.1875rem] md:h-[13rem] sm:h-[16rem] rounded-[1.2rem] md:rounded-2xl sm:rounded-xl overflow-hidden bg-white border border-[#282828]">
                <div className="w-full h-full p-5 md:p-3 pb-9">
                  <textarea
                    className="h-full w-full p-1 opacity-60 placeholder:text-[22px] md:placeholder:text-lg sm:placeholder:text-base placeholder:font-bold md:placeholder:font-semibold placeholder:text-center placeholder:text-accent-black placeholder:uppercase text-xl md:text-lg sm:text-base font-semibold md:font-medium text-center uppercase text-accent-black outline-none border-none  focus:ring-0 resize-none "
                    placeholder="Give your plot size, total floors, family units required or any other requirements..."></textarea>
                </div>
                <div className="absolute bottom-0 left-0 gap-20 sm:gap-1 min-h-[27px] flex-center  w-full  bg-dull">
                  <p className=" opacity-60 text-sm md:text-xs text-center text-accent-black">
                    ADD REFERENCE IMAGE (if any)
                  </p>
                  <div className="relative w-24 md:w-16 sm:w-14 h-[17px] flex-center opacity-60 rounded-[7px] border-2 md:border border-accent-black cursor-pointer bg-transparent hover:bg-gray-300 overflow-hidden">
                    <label
                      htmlFor="file-upload"
                      className="w-full h-full flex items-center justify-center cursor-pointer">
                      <p className="opacity-60 text-sm md:text-xs italic text-center text-accent-black">
                        attach
                      </p>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={e => console.log(e.target.files)} // Handle file selection here
                    />
                  </div>
                </div>
              </div>
              <button className="common-btn-size h-14 md:h-12 mx-auto mt-4 common-btn">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claim;
