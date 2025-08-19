"use client";

import Image from "next/image";
import { card5, card6, card7, card8 } from "@/assets";

const FastHomesBoxesElemRight = () => {
  const cards = [card5, card6, card7, card8]; // store in array for easy mapping

  return (
    <div className="space-y-5 block lg:hidden">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="w-24 xl:w-20 h-24 xl:h-20 rounded overflow-hidden">
          <Image
            src={card}
            alt={`Fast Home card ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default FastHomesBoxesElemRight;
