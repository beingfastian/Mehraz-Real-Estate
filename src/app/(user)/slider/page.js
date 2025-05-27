"use client"
// import { useState } from 'react';

// const CustomSlider = () => {
//   const [value, setValue] = useState(400); // Default value in middle

//   const marks = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  
//   return (
//     <div className="relative w-full max-w-3xl mx-auto pt-8 pb-4">
//       {/* Min/Max Labels */}
//       <div className="flex justify-between mb-1 text-sm text-gray-600">
//         <span>MIN</span>
//         <span>PKP 400 LAH</span>
//         <span>MAX</span>
//       </div>

//       {/* Track */}
//       <div className="relative h-2 bg-gradient-to-r from-[#e0e0e0] to-[#e0e0e0] rounded-full">
//         {/* Marks */}
//         {marks.map((mark) => (
//           <div
//             key={mark}
//             className="absolute w-1 h-3 bg-gray-400 -translate-x-1/2"
//             style={{ left: `${(mark - 50) / 9.5}%` }}
//           />
//         ))}

//         {/* Numbers */}
//         <div className="absolute w-full flex justify-between -bottom-6 text-xs text-gray-500">
//           {marks.map((mark) => (
//             <span
//               key={mark}
//               className="absolute"
//               style={{ left: `${(mark - 50) / 9.5}%`, transform: 'translateX(-50%)' }}>
//               {mark}
//             </span>
//           ))}
//         </div>

//         {/* House Icon */}
//         <div 
//           className="absolute -top-8 transform -translate-x-1/2"
//           style={{ left: `${(value - 50) / 9.5}%` }}>
//           <div className="w-8 h-8 bg-[#E5CD86] rotate-45 border border-black/30 shadow-md" />
//         </div>

//         {/* Slider Input */}
//         <input
//           type="range"
//           min={50}
//           max={1000}
//           step={50}
//           value={value}
//           onChange={(e) => setValue(Number(e.target.value))}
//           className="absolute w-full h-full opacity-0 cursor-pointer"
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomSlider;



import React, { useState } from "react";
// import "./Slider.css";

const PriceSlider = () => {
  const [value, setValue] = useState(400);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="slider-container">
      <div className="price-label min">PKR 100 Lakh</div>
      <div className="slider-wrapper">
        <div className="slider">
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={value}
            onChange={handleChange}
          />
          <div
            className="tooltip"
            style={{
              left: `${((value - 100) / 900) * 100}%`,
            }}
          >
            PKR {value} Lakh
          </div>
        </div>
        <div className="track">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i}>{(i + 1) * 100}</span>
          ))}
        </div>
      </div>
      <div className="price-label max">PKR 1000 Lakh</div>
    </div>
  );
};

export default PriceSlider;
