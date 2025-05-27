import React from "react";
import Image from "next/image";
const OrderListCard = () => {
  return (
    <div className="flex justify-center items-center w-full h-[243px] flex-col mb-[23px] ">
      <div className="h-[179px] w-[96%] flex rounded-[10px]  border-2 shadow-lg overflow-hidden xl:flex-col xl:h-auto">
        <Image
          src="https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={308}
          height={100}
          className="h-full"
          alt="Picture of the author"
        />
        <Image
          src="https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={160}
          height={100}
          className="h-full ml-[19px]"
          alt="Picture of the author"
        />
        <div className=" h-full w-[20%] mx-2 flex flex-col ">
          <div className=" font-bold text-[28px] leading-[24px] my-[10px]">
            NAME
          </div>
          <div className=" font-medium text-[26px] leading-8 text-[#2F2F2F] ">
            VENDOR
          </div>
          <hr />
          <div className=" font-bold text-[#2F2F2F] text-[28px]">RATE</div>

          <div className=" text-[20px] w-full h-[46px] rounded-[50px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black border border-1 border-black mt-auto">
            1500-PKR/CFT
          </div>
        </div>
        <div className=" h-full flex-grow mx-2 flex flex-col ">
          <div className=" w-full flex justify-between items-center h-[33%]">
            {" "}
            <span className=" font-bold text-2xl">ORDERED AS</span>{" "}
            <span>
              <span className="text-base text-[#2F2F2FCC]">per</span>
              {"   "}
              <span className=" text-xl text-[#2F2F2F]">
                {" "}
                10,000 Bricks{"   "}
              </span>
              <span className=" text-base  text-[#2F2F2FCC]">(1Quantity)</span>
            </span>
          </div>
          <hr />
          <div className=" w-full flex justify-between items-center h-[33%]">
            {" "}
            <span className=" font-bold text-2xl">SPACS</span>{" "}
            <span>
              <span className=" text-xl text-[#2F2F2F]">
                {" "}
                Description here........................{"   "}
              </span>
            </span>
          </div>
          <hr />
          <div className="text-base text-[#2F2F2FCC] h-[33%] overflow-y-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            nobis dicta impedit, mollitia perferendis pariatur. Nam nemo quos,
            ipsum beatae architecto incidunt tenetur repellat. Officiis qui nam
            recusandae est illum.
          </div>
        </div>
      </div>
      <div className=" flex  justify-end gap-2 items-center w-[96%] mt-[23px]">
        <div className=" text-[#2F2F2F] font-bold text-3xl">QUANTITY </div>
        <input
          type="text"
          placeholder="Search"
          className=" text-[20px] w-[279px] h-[46px] rounded-[50px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black border border-1 border-black"
        />
        <div className=" total-cost border shadow-lg w-[663px] h-[46px] mt-auto flex justify-between items-center px-6 ">
          <div>
            <span className="text-[#2F2F2F] font-bold text-[21px] leading-5">
              TOTAL
            </span>
            <span className=" ml-5 text-[21px] leading-8 font-normal">
              5000 Bricks
            </span>
          </div>
          <div>
            <span className="text-[#2F2F2F] font-bold text-[21px] leading-5">
              COST
            </span>
            <span className=" ml-5 text-[21px] leading-8 font-normal">
              10,000 PKR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListCard;
