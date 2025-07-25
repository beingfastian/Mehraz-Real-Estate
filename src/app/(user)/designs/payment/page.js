// "use client";
// import {
//   Advancepayment,
//   Backbutton,
//   PaymentMethod,
//   SecondCard,
//   Services,
//   ThirdCard,
//   UserScreenSpinner,
//   CalculatePayment,
// } from "@/components";
// import { IoChatboxOutline } from "react-icons/io5";
// import { MdOutlinePayment } from "react-icons/md";
// import { fastHomeIcon } from "@/assets";
// import { UButton } from "@/components";
// import {
//   DesignIcon,
//   ConstructionIcon,
//   MeterialsIcon,
//   FurnitureIcon,
// } from "@/components";
// import { FaCheck } from "react-icons/fa6";
// import { motion } from "framer-motion";
// import { RxCross1 } from "react-icons/rx";
// import React, { Suspense, useState } from "react";
// import BlackButton from "@/components/user-side/BlackButton";
// import Image from "next/image";

// const Page = () => {
//   const [step, setStep] = useState(1);
//   const [service1, setService1] = useState([
//     { checked: true, icon: <DesignIcon />, text: "Design" },
//     { checked: false, icon: <ConstructionIcon />, text: "CONSTRUCTION" },
//     { checked: true, icon: <MeterialsIcon />, text: "METERIALS" },
//     { checked: false, icon: <FurnitureIcon />, text: "FURNITURE" },
//   ]);

//   return (
//     <Suspense fallback={<UserScreenSpinner />}>
//       <div className="flex flex-col min-h-screen">
//         <motion.section
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="flex-grow px-8 py-8 sm:px-4">
//           <div className="max-w-8xl w-full mx-auto">
//             {/* Header */}
//             <div className="flex items-start mb-6">
//               <span className="relative z-20">
//                 <Backbutton />
//               </span>
//               <div className="ml-2">
//                 <h1 className="font-bold text-xl">SELECT & PAY</h1>
//                 <div className="flex items-center">
//                   <span className="bg-[#0CD350] flex h-[20px] w-[20px] rounded-full justify-center items-center">
//                     <FaCheck className="text-white text-xs" />
//                   </span>
//                   <span className="text-xs ml-2">Satisfaction Guarantee</span>
//                 </div>
//               </div>
//             </div>

//             {/* Main Grid */}
//             <div className="grid grid-cols-12 gap-6">
//               {/* Left: Services */}
//               <div className="col-span-3 md:col-span-12">
//                 <Services service1={service1} setService1={setService1} />
//               </div>

//               {/* Center: Inputs + Card */}
//               <div className="col-span-6 md:col-span-12 flex flex-col items-center -mt-4">
//                 {/* Area & Floors */}
//                 <div className="flex flex-wrap justify-center gap-4 mb-2">
//                   <div className="flex items-center">
//                     <p>Area</p>
//                     <input
//                       type="number"
//                       className="border rounded-full w-[80px] ml-2 h-[24px] py-0 px-2"
//                     />
//                   </div>
//                   <div className="flex items-center">
//                     <p>Floors</p>
//                     <input
//                       type="number"
//                       className="border rounded-full w-[80px] ml-2 h-[24px] py-0 px-2"
//                     />
//                   </div>
//                 </div>
//                 <p className="text-xs text-center mb-2">
//                   50% Off Ground Floor COST ADDED For Every Floor Above Ground
//                   Floor
//                 </p>

//                 {/* SecondCard */}
//                 <div className="w-full bg-white border p-3 rounded-lg shadow">
//                   <SecondCard />
//                 </div>
//               </div>

//               {/* Right: ThirdCard */}
//               <div className="col-span-3 md:col-span-12">
//                 <div className="w-full bg-white p-3 rounded-lg shadow">
//                   <ThirdCard step={step} setStep={setStep} />
//                 </div>
//               </div>
//             </div>

//             {/* Footer Info & Button */}
//             <div className="mt-6 text-center text-gray-500 text-base font-medium">
//               SELECT ANY FURTHER SERVICES YOU REQUIRE
//             </div>
//             <div className="flex justify-end mr-6">
//               <BlackButton
//                 text="DONE"
//                 onClick={() => setStep(prev => prev + 1)}
//               />
//             </div>
//           </div>
//         </motion.section>

//         {/* Footer Navigation */}
//         <footer className="w-full bg-accent-gray py-3 mt-10">
//           <div className="max-w-[80%] mx-auto grid grid-cols-3 text-white text-sm font-semibold">
//             {/* PROJECT */}
//             <div className="flex justify-center items-center">
//               <span className="flex items-center gap-2 text-[24px] px-6">
//                 <Image
//                   src={fastHomeIcon}
//                   alt="Project Icon"
//                   width={24}
//                   height={24}
//                 />
//                 <button>PROJECT</button>
//               </span>
//             </div>

//             {/* CHAT */}
//             <div className="flex justify-center items-center">
//               <span className="flex items-center gap-2 text-[24px] px-6">
//                 <IoChatboxOutline />
//                 <button>CHAT</button>
//               </span>
//             </div>

//             {/* PAYMENT */}
//             <div className="flex justify-center items-center">
//               <UButton
//                 onClick={null}
//                 className="flex items-center gap-2 text-[#2F2F2F] py-4 px-2"
//                 color="gold-gray"
//                 text={
//                   <span className="flex items-center gap-2 text-[24px] px-6">
//                     <MdOutlinePayment />
//                     <span>Payment</span>
//                   </span>
//                 }
//               />
//             </div>
//           </div>
//         </footer>
//       </div>
//     </Suspense>
//   );
// };

// export default Page;

"use client";
import React from "react";
import { UserScreenSpinner, PaymentFlow } from "@/components";

const Page = () => {
  return (
    <div className="min-h-[100%] w-full flex flex-col">
      <PaymentFlow />
    </div>
  );
};

export default Page;
