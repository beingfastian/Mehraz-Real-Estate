import React, { Suspense, useEffect, useState } from "react";
import UserScreenSpinner from "../UserScreenSpinner";
import { motion } from "framer-motion";
import {
  blackCouch,
  blackFinish,
  blackLeaf,
  blackwall,
  boyIcon,
  buyMaterialDarkIcon,
  residentialImage,
} from "@/assets";
import Backbutton from "@/components/Backbutton";
import Image from "next/image";
import { searchIcon, messageIcon, tickIcon } from "@/assets";
import UButton from "../UButton";
import DesignCarouselSmall from "../designs/DesignCarouselSmall";
import DesignCarouselMain from "../designs/DesignCarouselMain";
import BlackButton from "../BlackButton";

// temp data
const defaultDesign = {
  id: "hajfkajlj214141",
  title: "Design Title",
  area: {
    id: "4jB5BRiha5F45jcGzTEE",
    area: 10,
    category: "UPTO_18",
    unit: "MARLA",
  },
  floors: {
    id: "GywcLbBL9cjTxRq6GgX9",
    name: "FIRST",
  },
  familyUnit: {
    id: "GywcLbBL9cjTxRq6GgX9",
    name: "ONE UNIT",
  },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionOp1: "moon",
  descriptionOp2: "moon",
  style: {
    name: "MODERN",
    budget: "LOW",
  },
  images: [
    "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  imagesOp1: [
    "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  imagesOp2: [
    "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  designCost: 10000,
  constructionCost: 200000000,
  op1Name: "first",
  op2Name: "second",
  materials: [
    {
      image:
        "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "marble",
      vendor: "vendor",
      price: "1500 PKR/CFT",
    },
    {
      image:
        "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "marble",
      vendor: "vendor",
      price: "1500 PKR/CFT",
    },
    {
      image:
        "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "marble",
      vendor: "vendor",
      price: "1500 PKR/CFT",
    },
    {
      image:
        "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "marble",
      vendor: "vendor",
      price: "1500 PKR/CFT",
    },
  ],
  programs: [
    {
      category: "bedroom",
      quantity: 3,
      subCategories: [
        {
          space: "main bedroom",
          size: "12 by 6 feet",
        },
        {
          space: "second bedroom",
          size: "10 by 6 feet",
        },
        {
          space: "third bedroom",
          size: "10 by 5 feet",
        },
      ],
    },
    {
      category: "bathroom",
      quantity: 3,
      subCategories: [
        {
          space: "main bathroom",
          size: "6 by 6 feet",
        },
        {
          space: "second bathroom",
          size: "6 by 6 feet",
        },
        {
          space: "third bathroom",
          size: "6 by 6 feet",
        },
      ],
    },
    {
      category: "kitchen",
      quantity: 1,
      subCategories: [
        {
          space: "kitchen",
          size: "12 by 6 feet",
        },
      ],
    },
  ],
};
const MaterialSelectionPage = ({ setStep }) => {
  const borderColor = "#00000033";
  const [design, setDesign] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  // numbers for testing
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const fetchDesignData = async () => {
    // TODO: Fetch design data from server
    setDesign(defaultDesign);
  };
  const materials = [
    {
      icon: blackwall,
      alt: "black wall icon",
      heading: "Building",
      content: "Grey Structure",
    },
    {
      icon: blackFinish,
      alt: "Finish icon",
      heading: "FINISH",
      content: "Interior",
    },
    {
      icon: blackCouch,
      alt: "Couch icon",
      heading: "FINISH",
      content: "& Decor",
    },
    {
      icon: blackLeaf,
      alt: "Leaf icon",
      heading: "LANDSCAPE",
      content: "& Decor",
    },
  ];
  const headers = [
    {
      heading: "DURABLE",
      subheading: "LOW-MAINTENANCE",
    },
    {
      heading: "ECO-FRIENDLY",
      subheading: "HEALTHY LIFE",
    },
    {
      heading: "ECONOMIC",
      subheading: "PRICES YOU'LL LOVE",
    },
  ];
  useEffect(() => {
    fetchDesignData();
  }, []);
  // console.log(headers);
  return (
    <Suspense fallback={UserScreenSpinner}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] sm:p-0">
        {" "}
        <div className="max-w-8xl w-auto min-h-[500px] max-h-page-user-inner mx-auto px-4 pt-8 h-[80vh] flex flex-col">
          <div className="top-bar flex">
            <div className="left-side">
              <span onClick={() => setStep(prev => prev - 1)}>
                <Backbutton />
              </span>
            </div>
            <div className=" right-side">
              <div className=" upper-bar flex justify-center items-center">
                <span>
                  <Image
                    src={buyMaterialDarkIcon}
                    priority={true}
                    height={70}
                    width={70}
                    alt="building"
                  />
                </span>
                <div className="flex items-center flex-wrap gap-2">
                  {headers.map((value, index) => {
                    return (
                      <>
                        <span
                          className=" flex flex-col justify-center items-center"
                          key={index}>
                          <p className=" text-[25px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px] text-light-text">
                            {value.heading}
                          </p>
                          <span className=" text-light-text text-[15px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px]">
                            {value.subheading}
                          </span>
                        </span>
                        .
                      </>
                    );
                  })}
                  <div className=" relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className=" text-[20px] w-[300px] h-[52px] rounded-[50px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black border border-1 border-black"
                    />
                    <Image
                      src={searchIcon}
                      alt="Search Icon"
                      className="w-[34px] h-[34px] opacity-60 absolute top-1/2 left-[90%] transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <button class="w-[137px] h-[44px]  rounded-[6px] opacity-90 text-black border border-1 border-black flex justify-start items-center">
                      <Image
                        src={boyIcon}
                        alt="boy icon here"
                        className="mr-[4px]"
                      />
                      FILTER
                    </button>
                    <UButton
                      text={
                        <span className=" flex justify-around items-center">
                          <Image
                            src={messageIcon}
                            className="mr-[10px]"
                            alt="message icon here "
                          />
                          <span>GET</span>
                          <span className="font-bold ml-[2px]">ASSIST</span>
                        </span>
                      }
                      className="px-[17px] py-[11px] hover:text-black"
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="bottom-bar"></div>
            </div>
          </div>

          <div className="Material-contaibner relative flex-1">z
            <div
              className={`left-side absolute h-[80%] top-1/2 transform -translate-y-1/2 rounded-full flex justify-around items-center flex-col w-[58px] hover:min-w-[200px] hover:w-auto hover:rounded-lg border border-1 border-[${borderColor}] bg-[#ffffff] z-10`}>
              {materials?.map((value, index) => {
                return (
                  <div
                    className={`rounded-full bg-bg-dull border border-1 border-[${borderColor}] w-full overflow-hidden flex`}>
                    <Image
                      src={value.icon}
                      alt={value.alt}
                      height={100}
                      width={100}
                      className={`h-[55px] w-[55px] p-1`}
                    />
                    <div className="flex flex-col justify-center items-center">
                      <p className=" text-sm font-medium">{value?.heading}</p>
                      <span className=" text-xxs">{value?.content}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="right-carousel sm:w-full w-[90%] ml-auto ">
              <div className="h-full w-full md:order-first sm:order-first order-last">
                <DesignCarouselMain slidesCount={design?.images?.length}>
                  {design?.images.map((value, index) => {
                    return (
                      <div
                        key={index}
                        className="h-[50vh] min-h-[400px] max-h-[auto] lg:h-[40vh] sm:h-[30vh] xs:h-[25vh] rounded-xl  overflow-hidden !flex justify-center items-start flex-wrap border borde-1">
                        {numbers.map((value, index2) => (
                          <div
                            key={index2}
                            className="w-[150px] h-[150px] p-2 pb-4 rounded-lg">
                            <div className="w-full h-20 rounded-md overflow-hidden sm:h-20 relative">
                              <Image
                                src={residentialImage}
                                width={100}
                                height={100}
                                alt={`Material ${value}`} // Use the number in the alt text
                                className="w-full h-full object-cover sm:h-[100px]"
                              />
                              <Image
                                src={tickIcon}
                                width={35}
                                height={35}
                                alt={`Material ${value}`} // Use the number in the alt text
                                className=" absolute top-[3px] right-0"
                              />
                            </div>
                            <div className="bg-[#EFEFEF] text-sm text-[#2f2f2f] uppercase">
                              <div className="p-2 pb-0">
                                <h4 className="font-bold">Material {value}</h4>
                                <h4>Vendor {value}</h4>{" "}
                                {/* Placeholder content */}
                              </div>
                              <h5 className="border bg-white border-[#2f2f2f] rounded-full px-1 py-0.5 text-center text-[#2f2f2f] text-xs translate-y-1/2">
                                Price ${value * 10}{" "}
                                {/* Example price calculation */}
                              </h5>
                            </div>
                          </div>
                        ))}
                        {/* </div> */}
                      </div>
                    );
                  })}
                </DesignCarouselMain>
              </div>
            </div>
          </div>
          <div className=" flex justify-end items-center mt-1">
            {/* <p className=" text-light-text text-xl">
              <span className=" font-bold">SELECT ANY FOR DETAIL / ORDERS</span>
              <span className=" font-normal">FREE DELIVERY</span>
            </p> */}

            <BlackButton onclickfunction={() => setStep(prev => prev + 1)} />
          </div>
        </div>
      </motion.section>
    </Suspense>
  );
};

export default MaterialSelectionPage;
