"use client";
import { jumpToIcon } from "@/assets";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import {
  DesSelStep1Screen2Select,
  DesSelStep1Screen2InputBox,
  Button,
  DesSelStep1StylesModal,
} from "@/components";
import { useState } from "react";
import useRPS from "@/hooks/useRPS";

const DesSelStep1Screen2JumpToModal = ({
  isModalOpen = false,
  toggleModal = () => {},
  cities = [],
  styles = [],
}) => {
  const { router, pathname, searchParams } = useRPS();

  const defaultStep1Screen3FormData = {
    styleCost: searchParams.get("styleCost") || "",
  };

  const [step1Screen3FormData, setStep1Screen3FormData] = useState(
    defaultStep1Screen3FormData,
  );
  const step1Screen3FormDataInputHandler = (key, value) => {
    setStep1Screen3FormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  const toggleStyleModal = () => setIsStyleModalOpen(prevState => !prevState);

  const applyChangesHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("styleCost", step1Screen3FormData.styleCost);
    router.push(`${pathname}?${newSearchParams.toString()}`);
    router.refresh();
    toggleModal();
  };

  return (
    <>
      <div
        onClick={toggleModal}
        className={`${
          isModalOpen
            ? "fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-[2]"
            : "hidden"
        }`}></div>
      {
        <div
          className={`fixed z-[3] w-full max-w-3xl lg:max-w-xl min-h-[50vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl overflow-hidden px-10 sm:px-4 pb-8 sm:pb-4`}>
          <div className="w-full flex items-center justify-center border-b border-b-black/30">
            <div className="mx-auto flex items-center gap-4 lg:py-2">
              <Image
                src={jumpToIcon}
                width={96}
                height={96}
                alt="Jump to icon"
                className="w-24 lg:w-14 xs:w-12 h-auto opacity-50"
              />
              <span className="text-2xl lg:text-base xs:text-sm text-black/90 uppercase">
                jump to a different...
              </span>
            </div>
            <button onClick={toggleModal} className="p-2 rounded-full ">
              <AiOutlineClose size={28} className="text-[#2F2F2F] w-7 h-auto" />
            </button>
          </div>
          <div className="flex lg:flex-col items-center justify-center gap-8 lg:gap-6 pt-4 pb-20">
            
            {/* Updated Budget Selection with Styled Buttons */}
            <div className="text-center w-full px-6 py-2 mx-auto">
              <h3 className="text-[#2F2F2F]/80 text-[28px] xl:text-lg lg:text-base mb-6">
                STYLE COST
              </h3>

              <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6 lg:gap-4 md:gap-3 sm:gap-3 w-full">
                {["LOW", "MEDIUM", "HIGH"].map(cost => (
                  <button
                    key={cost}
                    onClick={() =>
                      step1Screen3FormDataInputHandler("styleCost", cost)
                    }
                    className={`uppercase text-[26px] font-bold rounded-full shadow-lg relative z-[1] duration-300
                      h-[75px] lg:h-[65px] md:h-[50px] sm:h-[40px] w-full
                      ${
                        step1Screen3FormData.styleCost === cost
                          ? "text-white bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green"
                          : "text-[#21254A] bg-white border-[2px] border-[#21254A]"
                      }`}>
                    {cost}
                  </button>
                ))}
              </div>
            </div>

          </div>
          <div>
            <Button
              color="accent-2"
              text="apply changes"
              isTransitioned={true}
              className="block mx-auto"
              size="base"
              onClick={applyChangesHandler}
            />
          </div>
        </div>
      }
      {isStyleModalOpen && (
        <DesSelStep1StylesModal
          isModalOpen={isStyleModalOpen}
          toggleModal={toggleStyleModal}
          styles={styles}
          styleCost={step1Screen3FormData.styleCost}
          step1Screen2FormDataInputHandler={step1Screen3FormDataInputHandler}
        />
      )}
    </>
  );
};

export default DesSelStep1Screen2JumpToModal;