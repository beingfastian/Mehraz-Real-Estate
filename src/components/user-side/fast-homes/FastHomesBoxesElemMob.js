"use client";

import Image from "next/image";
import {
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
} from "@/assets";

const FastHomesBoxesElemMob = () => {
  const Cards = [card1, card2, card3, card4, card5, card6, card7, card8];

  return (
    <div className="hidden lg:flex w-full justify-between">
      <div className="grid grid-cols-4 gap-6 xs:gap-4">
        {Cards.map((card, idx) => (
          <div
            key={idx}
            className="w-16 xs:w-12 h-16 xs:h-12 rounded overflow-hidden">
            <Image
              src={card}
              alt={`Fast Home card ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FastHomesBoxesElemMob;
