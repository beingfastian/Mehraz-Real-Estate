"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
// import "flowbite";
// import "flowbite/dist/flowbite.min.js";
// import DesignCarouselMain from "../designs/DesignCarouselMain";
import DesignCarouselMain from "./DesignScheduleCarousel";

const design = {
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

const ScheduleCarousel = ({ calender }) => {
  // console.log("days array:", calender);
  return (
    <div className="flex items-end">
      <DesignCarouselMain slidesCount={calender.length}>
        {calender.map((val, index) => (
          <div
            key={index}
            className="h-[20vh] md:h-[20vh] sm:h-[30vh] min-h-[150px] max-h-[300px] lg:h-[17vh] xs:h-[25vh] rounded-xl overflow-hidden  !flex justify-center">
            <div className=" w-[90%] sm:w-[100%] h-full  rounded-2xl overflow-hidden flex sm:flex-col">
              {val?.map((val2, index2) => (
                <div
                  className={`flex-1 sm:w-[100%] h-[100%] sm:h-[14%] sm:flex `}
                  key={index}>
                  <div className="bg-black text-[#FFFFFF] text-center text-xl h-[22%] sm:h-[100%] sm:w-[30%] flex justify-center items-center">
                    {val2?.day.slice(0, 3)}
                  </div>
                  <div className="w-[100%] h-[86%] break-words flex justify-center items-center flex-col sm:flex-row bg-[#EFEFEF] hover:bg-[#989a9c] hover:text-white sm:w-[70%]">
                    <span className=" font-bold">{val2?.date.getDate()}</span>
                    <span className=" font-bold"> {val2.month}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* <Image
                     src={image}
                     width={300}
                     height={200}
                     alt={design.title}
                     className="w-full h-full object-cover"
                   /> */}
          </div>
        ))}
      </DesignCarouselMain>
    </div>
  );
};

export default ScheduleCarousel;
