import React, { Suspense, useState } from "react";
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

const OrderList = ({ setStep, selectedMaterials }) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const totalCost = selectedMaterials.reduce((acc, mat) => {
  const quantity = Number(mat.quantity) || 1;
  return acc + (mat.rate * quantity);
}, 0);


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
            {/* 🧾 Top Header */}
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
                  <span className="text-light-text text-left text-[15px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px]">
                    WITHIN 2 DAYS
                  </span>
                </span>

                <div className="text-center">
                  <div className="text-[28px] text-light-text font-bold">
                    ORDER LIST
                  </div>
                  <div className="text-[14px] text-light-text">
                    Satisfaction Guranty!
                  </div>
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

            {/* 🧾 Filter & Product List */}
            <div className="flex w-[1350px] mx-auto">
              {/* 🟩 LEFT FILTER BAR */}
              <aside className="w-[180px] min-w-[180px] border-r pr-2 pt-4">
                {["ALL", "TREES", "WOOD", "STONE", "GLASS"].map(
                  (category, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full py-2 mb-2 rounded-full border font-medium ${
                        selectedCategory === category
                          ? "bg-gray-800 text-white border-black font-semibold"
                          : "bg-white text-black border-black hover:text-white hover:bg-gray-800"
                      }`}>
                      {category} (9)
                    </button>
                  ),
                )}
              </aside>

<div
  className={`bottom-bar w-full h-[511px] pl-4 ${
    selectedMaterials.length > 1 ? "overflow-y-scroll" : ""
  }`}
>
{selectedMaterials.map((mat, index) => (
  <OrderListCard key={index} material={mat} />
))}

</div>

            </div>

            <hr className="mb-[25px]" />

            {/* 📦 TOTAL + CONFIRM */}
            <div className="flex justify-between items-center bg-white px-6">
<div className="text-[20px] flex items-center w-[550px] h-[46px] rounded-[10px] px-6 shadow-md border border-gray-200 bg-white ml-[400px]">
  <strong>TOTAL COST</strong>
  <span className="ml-4">{totalCost.toLocaleString()} PKR</span>
</div>

              <button
                onClick={() => setStep(prev => prev + 1)}
                className="bg-gradient-to-r from-[#002B5B] to-[#00688B] text-white px-6 py-2 rounded-full text-lg font-semibold">
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
