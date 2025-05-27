"use client";
import { AiOutlineClose } from "react-icons/ai";
import DesSelStep1StylesModalCarousel from "./DesSelStep1StylesModalCarousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import { checkCircleIcon } from "@/assets";

const DesSelStep1StylesModal = ({
  isModalOpen = false,
  toggleModal = () => {},
  styles,
  styleCost,
  style,
  step1Screen2FormDataInputHandler,
}) => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [stylesToShow, setStylesToShow] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setStylesToShow(
      styles?.filter(style => styleCost === "" || style.budget === styleCost),
    );
  }, [styles, styleCost]);

  const onStyleClick = id => {
    if (selectedStyle === id) {
      setSelectedStyle(null);
    } else {
      setSelectedStyle(id);
    }
  };
  const onConfirmClick = () => {
    step1Screen2FormDataInputHandler("style", selectedStyle);
    toggleModal();
  };

  useEffect(() => {
    setSelectedStyle(style);
  }, [style]);
  useEffect(() => {
    if (isModalOpen && selectedStyle) {
      const index = stylesToShow.findIndex(s => s.id === selectedStyle);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [isModalOpen, selectedStyle, stylesToShow]);

  return (
    <>
      <div
        onClick={toggleModal}
        className={`${
          isModalOpen
            ? "fixed top-0  flex justify-center items-center bg-black bg-opacity-60  inset-0 z-[9999999] hidden-scrollbar"
            : "hidden"
        }`}>
        <div className="w-full">
          <div className="min-h-full h-full w-full  flex-center">
            <div className="h-full flex-center absolute w-full top-0 p-5">
              <div
                className={`m-auto w-full flex-center  max-w-[1596px] max-auto-width   `}>
                <div
                  className="w-full bg-gradient-to-r from-[#20254A] to-[#154656] pt-12 lg:pt-8 px-10 lg:px-4 pb-6 lg:pb-2  rounded-xl"
                  onClick={e => e.stopPropagation()}>
                  <div className="w-full relative flex flex-col items-center gap-4 lg:gap-2 text-center mb-[53px]">
                    <h3 className="text-white bold extra-large-2">
                      SELECT STYLE
                    </h3>
                    <h4 className="text-[#bababa] opacity-70 normal-text text-balance max-w-[40ch]">
                      {styleCost === "" ? (
                        <>
                          ITS BETTER TO SELECT <b>COST</b> FIRST, SO WE SHOW THE
                          BEST OPTIONS ACCORDING TO YOUR NEED
                        </>
                      ) : (
                        styleCost
                      )}
                    </h4>
                    <button
                      onClick={toggleModal}
                      className="absolute top-0 right-2 lg:right-0 p-2 lg:p-0 rounded-full ">
                      <AiOutlineClose
                        size={40}
                        className="text-white w-10 lg:w-8 h-auto"
                      />
                    </button>
                  </div>
                  {/* For screens over 1024px */}
                  <DesSelStep1StylesModalCarousel selectedIndex={selectedIndex}>
                    {stylesToShow?.map(({ id, name, budget, image }) => (
                      <button
                        key={id}
                        className="lg:px-3 px-2 w-full"
                        onClick={() => onStyleClick(id)}>
                        <div className="h-[300px] lg:h-[280px] md:h-[250px] sm:h-[220px] xs:h-[180px] w-auto relative rounded-[10px] md:rounded-[8px] sm:rounded-[6px] overflow-hidden ">
                          <Image
                            src={image}
                            alt={name}
                            fill
                            priority={true}
                            className="w-full h-full object-cover"
                          />
                          {selectedStyle === id && (
                            <div className="absolute top-0 left-0 w-full h-full bg-black/35 border-2 border-white flex-center rounded-[10px] md:rounded-[8px] sm:rounded-[6px]">
                              <Image
                                src={checkCircleIcon}
                                alt="check"
                                fill
                                className="!w-[60px] !h-[60px] lg:!w-[50px] lg:!h-[50px] md:!w-[40px] md:!h-[40px] !relative "
                              />
                            </div>
                          )}
                        </div>
                        <div className="text-[#fff3e4] text-center mt-6">
                          <h3 className="base-text uppercase">{name}</h3>
                          {/* {styleCost === "" && (
                            <h4 className="text-sm lowercase">{budget}-cost</h4>
                          )} */}
                        </div>
                      </button>
                    ))}
                  </DesSelStep1StylesModalCarousel>

                  <div className="mt-[30px] lg:mt-[20px] ">
                    <button
                      class="flex justify-center items-center common-btn-size  mx-auto rounded bg-white shadow-btn-shadow hover:bg-transparent text-[22px] lg:text-xl md:text-lg sm:text-base xs:text-sm  uppercase text-[#3f3f3f] hover:text-white transition-all duration-300 hover:border-white hover:border-2"
                      onClick={onConfirmClick}>
                      CONFIRM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesSelStep1StylesModal;
