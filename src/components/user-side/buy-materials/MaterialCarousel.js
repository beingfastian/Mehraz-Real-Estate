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
import { useRouter } from "next/navigation"; // Import from 'next/navigation'

const MaterialCarousel = () => {
  // Define the array of materials with icons, headings, and content
  const materials = [
    {
      icon: whitewall,
      alt: "White wall icon",
      heading: "Building",
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
      heading: "FINISH",
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
        <div className="w-[90%] sm:w-[85%] p-2 h-auto rounded-2xl flex flex-wrap gap-3 justify-center">
          {materials.map((material, index) => (
            <MaterialCard key={index} material={material} />
          ))}
        </div>
      </div>
    </DesignCarouselMain>
  );
};

// Component to render each material card
const MaterialCard = ({ material }) => {
  const router = useRouter(); // Initialize the router

  const handleCardClick = () => {
    // Navigate to the dynamic route with material.heading
    const heading = material.heading.toLowerCase();
    router.push(
      `/buy-materials?materialcategory=${encodeURIComponent(heading)}`,
    );
  };
  return (
    <div
      className="w-[190px] h-[190px] xl:w-[150px] xl:h-[150px] lg:w-[100px] lg:h-[100px] sm:h-[100px] sm:w-[100px] flex imagenum cursor-pointer"
      onClick={handleCardClick}>
      <div className="relative flex justify-center items-center flex-col w-full h-full bg-cover bg-center">
        <Image
          src={material.icon}
          alt={material.alt}
          width={55}
          height={55}
          className="z-20"
        />
        <div className="z-20 text-white text-center flex flex-col items-center">
          <span className="font-bold text-2xl">{material.heading}</span>
          <span className="text-base">{material.content}</span>
        </div>
        <Image
          src={landpic}
          alt="Background Decoration"
          width={500}
          height={300}
          className="absolute top-0 left-0 w-full h-full bg-white z-10"
        />
      </div>
    </div>
  );
};

export default MaterialCarousel;
