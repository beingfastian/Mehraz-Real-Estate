// import { infoIcon } from "@/assets";
// import Image from "next/image";

// const DesSelStep1Screen1InputBox = ({ label, children, isShowInfo }) => {
//   return (
//     <>
//       <div className="flex flex-col lg:flex-row lg:w-full items-center lg:justify-between gap-2 w-full">
//         {/* Label + Info */}
//         <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 md:gap-2">
//           <span className="uppercase text-[#2F2F2F] text-large font-bold text-nowrap xs:text-wrap">
//             {label}
//           </span>

//           {isShowInfo && (
//             <div className="relative group w-6 md:w-4 h-6 md:h-4">
//               <Image
//                 src={infoIcon}
//                 alt="info"
//                 className="w-6 md:w-4 h-6 md:h-4 cursor-pointer"
//               />

//               {/* Tooltip */}
//               <div
//                 className="min-w-[235px] rounded-[15px] bg-white border border-black/20 btn-shadow-btn
//                               absolute -top-[5%] -translate-y-full left-0 -translate-x-full
//                               py-4 px-[17px] f-col gap-1 opacity-0
//                               group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="f-col gap-3">
//                   <div>
//                     <p className="w-[201px] text-[13px] text-left text-[#2f2f2f]">
//                       <span className="w-[201px] text-[13px] font-bold text-left text-[#2f2f2f]">
//                         ONE UNIT
//                       </span>
//                       <span className="w-[201px] text-[13px] text-left text-[#2f2f2f]">
//                         : Integrate Entire House Combined for All Residents
//                       </span>
//                     </p>
//                   </div>

//                   <div>
//                     <p className="w-[201px] text-[13px] text-left text-[#2f2f2f]">
//                       <span className="w-[201px] text-[13px] font-bold text-left text-[#2f2f2f]">
//                         TWO or MORE UNIT
//                       </span>
//                       <span className="w-[201px] text-[13px] text-left text-[#2f2f2f]">
//                         : Separate Floors / Partition for 2/+ Families.
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <p className="w-[201px] opacity-70 text-[13px] text-left text-[#2f2f2f]">
//                   <span className="w-[201px] opacity-70 text-[13px] text-left text-[#2f2f2f]">
//                     (Floors Separated From Entrance)
//                   </span>
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input / Dropdown */}
//         {children}
//       </div>
//     </>
//   );
// };

// export default DesSelStep1Screen1InputBox;

//       <div className="flex flex-col lg:flex-row lg:w-full items-center lg:justify-between gap-2 w-full">
//         {/* Label + Info */}
//         <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 md:gap-2">
//           <span className="uppercase text-[#2F2F2F] text-large font-bold text-nowrap xs:text-wrap">
//             {label}
//           </span>

import { infoIcon } from "@/assets";
import Image from "next/image";

const DesSelStep1Screen1InputBox = ({ label, children, isShowInfo }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center sm:items-start justify-between gap-2">
      {/* Label + Info - Fixed width container */}
      <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 min-w-[100px]">
        <span className="uppercase text-[#2F2F2F] text-large font-bold">
          {label}
        </span>

        {isShowInfo && (
          <div className="relative group w-6 md:w-4 h-6 md:h-4">
            <Image
              src={infoIcon}
              alt="info"
              className="w-6 md:w-4 h-6 md:h-4 cursor-pointer"
            />
            {/* Tooltip (keep existing tooltip code) */}
            <div
              className="min-w-[235px] rounded-[15px] bg-white border border-black/20 btn-shadow-btn 
                              absolute -top-[5%] -translate-y-full left-0 -translate-x-full 
                              py-4 px-[17px] f-col gap-1 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300">
              <div className="f-col gap-3">
                <div>
                  <p className="w-[201px] text-[13px] text-left text-[#2f2f2f]">
                    <span className="w-[201px] text-[13px] font-bold text-left text-[#2f2f2f]">
                      ONE UNIT
                    </span>
                    <span className="w-[201px] text-[13px] text-left text-[#2f2f2f]">
                      : Integrate Entire House Combined for All Residents
                    </span>
                  </p>
                </div>

                <div>
                  <p className="w-[201px] text-[13px] text-left text-[#2f2f2f]">
                    <span className="w-[201px] text-[13px] font-bold text-left text-[#2f2f2f]">
                      TWO or MORE UNIT
                    </span>
                    <span className="w-[201px] text-[13px] text-left text-[#2f2f2f]">
                      : Separate Floors / Partition for 2/+ Families.
                    </span>
                  </p>
                </div>
              </div>

              <p className="w-[201px] opacity-70 text-[13px] text-left text-[#2f2f2f]">
                <span className="w-[201px] opacity-70 text-[13px] text-left text-[#2f2f2f]">
                  (Floors Separated From Entrance)
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input/Dropdown - Fixed width container */}
      <div className="w-full lg:w-[200px] xl:w-[250px]">{children}</div>
    </div>
  );
};

export default DesSelStep1Screen1InputBox;
