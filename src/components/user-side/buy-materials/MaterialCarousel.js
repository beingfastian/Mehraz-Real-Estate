"use client";
import React from "react";
import DesignCarouselMain from "../designs/DesignCarouselMain";
import {
  landpic,
  buildingicon,
  finsih,
  leaf,
  whitewall,
  couch,
} from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MaterialCarousel = ({ selectedMaterial, setSelectedMaterial }) => {
  const materials = [
    {
      icon: whitewall,
      alt: "White wall icon",
      heading: "BUILDING",
      content: "Grey Structure",
    },
    {
      icon: finsih,
      alt: "Finish icon",
      heading: "FINISH",
      content: "Interior",
    },
    {
      icon: couch,
      alt: "Couch icon",
      heading: "FURNITURE",
      content: "& Decor",
    },
    {
      icon: leaf,
      alt: "Leaf icon",
      heading: "LANDSCAPE",
      content: "& Decor",
    },
  ];

  return (
    <DesignCarouselMain slidesCount={1}>
      <div className="w-full h-auto rounded-xl overflow-hidden flex justify-center">
        <div className="w-[90%] sm:w-[85%] p-4 h-auto rounded-2xl flex flex-wrap gap-12 justify-center">
          {materials.map((material, index) => (
            <MaterialCard 
              key={index} 
              material={material}
              isSelected={selectedMaterial === material.heading}
              onClick={() => {
  if (selectedMaterial === material.heading) {
    setSelectedMaterial(null); // Deselect if already selected
  } else {
    setSelectedMaterial(material.heading); // Select new one
  }
}}

            />
          ))}
        </div>
      </div>
    </DesignCarouselMain>
  );
};

const MaterialCard = ({ material, isSelected, onClick }) => {
  const router = useRouter();

  const handleCardClick = () => {
    onClick();
    const heading = material.heading.toLowerCase();
    router.push(
      `/buy-materials?materialcategory=${encodeURIComponent(heading)}`,
    );
  };

  return (
    <div
      className={`w-[190px] h-[190px] xl:w-[150px] xl:h-[150px] lg:w-[120px] lg:h-[120px] sm:h-[110px] sm:w-[110px] 
        flex imagenum cursor-pointer transition-all duration-200 ${isSelected ? 
        'border-4 border-yellow-400 rounded-lg transform scale-105' : 
        'border-2 border-transparent hover:border-gray-300'}`}
      onClick={handleCardClick}
    >
      <div className="relative flex justify-center items-center flex-col w-full h-full bg-cover bg-center">
        <Image
          src={material.icon}
          alt={material.alt}
          width={55}
          height={55}
          className="z-20"
        />
        <div className="z-20 text-white text-center flex flex-col items-center mt-2">
          <span className="font-bold text-xl sm:text-lg">{material.heading}</span>
          <span className="text-sm">{material.content}</span>
        </div>
        <Image
          src={landpic}
          alt="Background Decoration"
          fill
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-black bg-opacity-30 z-15 rounded-md"></div>
        )}
      </div>
    </div>
  );
};

export default MaterialCarousel;