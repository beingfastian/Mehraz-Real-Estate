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

  // Sample order data
  const orders = [
    {
      id: 1,
      images: [
        "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      name: "Marble Tiles",
      vendor: "Stone World",
      rate: "1500 PKR/CFT",
      orderedAs: "10,000 Bricks (1 Quantity)",
      specs: "Premium quality marble with polished finish",
      description: "High durability marble tiles suitable for flooring and walls. Water resistant and easy to clean.",
      quantity: 5,
      totalCost: 7500
    },
    {
      id: 2,
      images: [
        "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      name: "Ceramic Tiles",
      vendor: "Tile Masters",
      rate: "800 PKR/CFT",
      orderedAs: "5,000 Tiles (2 Quantity)",
      specs: "Glossy finish ceramic tiles",
      description: "Modern ceramic tiles with glossy finish. Perfect for bathrooms and kitchens. Scratch resistant.",
      quantity: 10,
      totalCost: 8000
    },
    {
      id: 3,
      images: [
        "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      name: "Wooden Flooring",
      vendor: "Nature Wood",
      rate: "2500 PKR/CFT",
      orderedAs: "3,000 Planks (1 Quantity)",
      specs: "Oak wood flooring",
      description: "Premium quality oak wood flooring with UV coating. Adds warmth to any space.",
      quantity: 3,
      totalCost: 7500
    },
    {
      id: 4,
      images: [
        "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      name: "Granite Countertop",
      vendor: "Stone Solutions",
      rate: "3500 PKR/CFT",
      orderedAs: "2 Slabs (1 Quantity)",
      specs: "Black galaxy granite",
      description: "Premium black galaxy granite for kitchen countertops. Heat resistant and durable.",
      quantity: 2,
      totalCost: 7000
    }
  ];

  const totalCost = orders.reduce((sum, order) => sum + order.totalCost, 0);

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
          <div className="right-side flex-1">
            <div className="upper-bar flex justify-center items-center">
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
                <span className="flex flex-col justify-center items-center">
                  <p className="text-[25px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px] text-light-text">
                    FAST & FREE DELIVERY
                  </p>
                  <span className="text-light-text text-[15px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px]">
                    WITHIN 2 DAYS
                  </span>
                </span>
                <div className="text-[32px] text-light-text font-bold">
                  ORDER LIST
                </div>
                <div className="flex justify-center items-center gap-2">
                  <UButton
                    text={
                      <span className="flex justify-around items-center">
                        <Image
                          src={messageIcon}
                          className="mr-[10px]"
                          alt="message icon here"
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
            
            {/* Order Cards Container with Scroll */}
            <div className="bottom-bar w-full h-[511px] overflow-y-auto">
              {orders.map((order) => (
                <OrderListCard key={order.id} order={order} />
              ))}
            </div>
            
            {/* Total Cost and Confirm Order Section */}
            <div className="mt-6 flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">
                Total Order Cost: <span className="text-primary">{totalCost.toLocaleString()} PKR</span>
              </div>
<button 
  className="bg-black text-white px-8 py-3 rounded-lg text-xl font-bold hover:bg-gray-800 transition-colors"
  onClick={() => alert('Order confirmed!')}
>
  CONFIRM ORDER
</button>
            </div>
          </div>
        </div>
      </motion.section>
    </Suspense>
  );
};

export default OrderList;