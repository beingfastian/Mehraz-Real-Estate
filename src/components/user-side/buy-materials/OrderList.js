import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  boyIcon,
  buyMaterialDarkIcon,
  messageIcon,
  searchIcon,
} from "@/assets";
import UButton from "../UButton";
import Backbutton from "@/components/Backbutton";
import UserScreenSpinner from "../UserScreenSpinner";
import OrderListCard from "./OrderListCard";
// initial Values
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

const OrderList = ({ setStep }) => {
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
  // dummy array remove with actual data
  const OrderListItem = [1];
  return (
    <Suspense fallback={UserScreenSpinner}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] sm:p-0">
        <div className="top-bar flex">
          <div className="left-side">
            <span onClick={() => setStep(prev => prev - 1)}>
              <Backbutton />
            </span>
          </div>
          <div className=" right-side flex-1">
            <div className=" upper-bar flex justify-center items-center">
              <span>
                <Image
                  src={buyMaterialDarkIcon}
                  priority={true}
                  height={70}
                  width={70}
                  alt="Materials Icon"
                />
              </span>
              <div className="flex items-center flex-wrap gap-2 justify-between flex-1">
                <span className=" flex flex-col justify-center items-center">
                  <p className=" text-[25px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px] text-light-text">
                    FAST & FREE DELIVERY
                  </p>
                  <span className=" text-light-text text-[15px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px]">
                    WITHIN 2 DAYS
                  </span>
                </span>
                <div className=" text-[32px] text-light-text font-bold">
                  ORDER LIST
                </div>
                <div className="flex justify-center items-center gap-2">
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
            <hr className="mb-[25px]" />
            <div
              className={`bottom-bar w-full h-[511px] ${
                OrderListItem.length > 1 && "overflow-y-scroll"
              }`}>
              {OrderListItem &&
                OrderListItem.map((value, index) => {
                  return <OrderListCard />;
                })}
            </div>
          </div>
        </div>
      </motion.section>
    </Suspense>
  );
};

export default OrderList;
