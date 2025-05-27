"use client";
import React from "react";
import Image from "next/image";
// import "flowbite";
// import "flowbite/dist/flowbite.min.js";
import DesignCarouselMain from "../designs/DesignCarouselMain";
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

const Carousel = () => {
  return (
    <div className="flex items-end">
      <DesignCarouselMain slidesCount={design.images.length}>
        {design.images.map((image, index) => (
          <div
            key={index}
            className="h-[30vh] md:h-[20vh] sm:h-[20vh] min-h-[150px] max-h-[300px] lg:h-[40vh] xs:h-[25vh] rounded-xl overflow-hidden">
            <Image
              src={image}
              width={500}
              height={200}
              alt={design.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </DesignCarouselMain>
    </div>
  );
};

export default Carousel;

{
  /* <div
        id="controls-carousel"
        className="relative w-full bg-gray-500"
        data-carousel="static">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7D2U_EzDkySg66XmfnOgPS-lDbuGOmBXv4Q&s"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
          <div
            className="hidden duration-700 ease-in-out"
            data-carousel-item="active">
            <img
              src="https://i.etsystatic.com/40317824/r/il/339134/4827441773/il_570xN.4827441773_887m.jpg"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://i.etsystatic.com/40317824/r/il/339134/4827441773/il_570xN.4827441773_887m.jpg"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://i.etsystatic.com/40317824/r/il/339134/4827441773/il_570xN.4827441773_887m.jpg"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://i.etsystatic.com/40317824/r/il/339134/4827441773/il_570xN.4827441773_887m.jpg"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div> */
}
