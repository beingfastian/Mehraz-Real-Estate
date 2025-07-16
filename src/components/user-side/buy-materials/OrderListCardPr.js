import React, { useState } from "react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaExpand,
} from "react-icons/fa";

const OrderListCardPr = ({ selectedMaterials = [], onClose }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openPreview = () => {
    setShowPreview(true);
    setCurrentImageIndex(selectedMaterials.length - 1); // Start with latest
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const navigateImage = direction => {
    setCurrentImageIndex(prev => {
      if (direction === "prev") {
        return prev > 0 ? prev - 1 : selectedMaterials.length - 1;
      } else {
        return prev < selectedMaterials.length - 1 ? prev + 1 : 0;
      }
    });
  };

  if (selectedMaterials.length === 0) {
    return (
      <div className="flex justify-center items-center w-[82%] h-[243px] flex-col -ml-[-180px] mt-[-25px]">
        <div className="h-[179px] w-[96%] flex rounded-[10px] border-2 shadow-lg overflow-hidden items-center justify-center">
          <div className="text-[24px] text-gray-500">
            No materials selected yet
          </div>
        </div>
      </div>
    );
  }

  // Get the latest material for the stacked images
  const latestMaterial = selectedMaterials[selectedMaterials.length - 1];
  // Sample images for the stacked animation (could be different angles of same product)
  const stackedImages = [
    latestMaterial.image,
    "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop",
  ];

  return (
    <div className="flex justify-center items-center w-[82%] h-[243px] flex-col -ml-[-180px] mt-[-25px] relative">
      {/* Close button inside OrderListCardPr */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
        aria-label="Close popup">
        <FaTimes className="text-gray-700" />
      </button>

      <div className="h-[179px] w-[96%] flex rounded-[10px] border-2 shadow-lg overflow-hidden bg-white">
        {/* Stacked Images - showing animation with hardcoded images */}
        <div className="relative w-[800px] flex items-center justify-start pl-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 group"
              style={{
                left: `${i * 30}px`,
                zIndex: 10 - i,
              }}>
              <Image
                src={latestMaterial.image}
                alt={`Product view ${i + 1}`}
                width={270}
                height={180}
                className="rounded-[6px] border-[1px] border-black shadow-md object-cover"
                onClick={openPreview}
              />
              {/* Only show expand button on the front-most image */}
              {i === 0 && (
                <button
                  className="absolute bottom-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={openPreview}>
                  <FaExpand size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Material details */}
        <div className="h-full w-[50%] mx-2 flex flex-col">
          <div className="font-bold text-[24px] leading-[24px] my-[10px]">
            {latestMaterial.name}
          </div>
          <div className="font-medium text-[22px] leading-8 text-[#2F2F2F]">
            {latestMaterial.vendor}
          </div>
          <hr />
          <div className="font-bold text-[#2F2F2F] text-[24px]">RATE</div>
          <div className="mt-2 text-[20px] w-full h-[40px] rounded-[50px] p-2 border border-black text-black font-medium text-left">
            {latestMaterial.price}
          </div>
        </div>

        {/* Order Details */}
        <div className="h-full flex-grow mx-2 flex flex-col w-[90%]">
          <div className="w-full flex justify-between items-center h-[33%]">
            <span className="font-bold text-[24px]">ORDERED AS</span>
            <span>
              <span className="text-base text-[#2F2F2FCC]">per</span>
              <span className="text-xl text-[#2F2F2F]"> 10,000 Bricks </span>
              <span className="text-base text-[#2F2F2FCC]">(1 Quantity)</span>
            </span>
          </div>
          <hr />
          <div className="w-full flex justify-between items-center h-[33%]">
            <span className="font-bold text-[24px]">SPECS</span>
            <span>
              <span className="text-xl text-[#2F2F2F]">
                {" "}
                Description here........................{" "}
              </span>
            </span>
          </div>
          <hr />
          <div className="text-base text-[#2F2F2FCC] h-[33%] overflow-y-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            nobis dicta impedit, mollitia perferendis pariatur.
          </div>
        </div>
      </div>

      {/* Preview Modal for all selected materials */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors">
            <FaTimes size={28} />
          </button>

          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 bg-white/20 text-white p-4 rounded-full hover:bg-white/30 transition-colors">
            <FaChevronLeft size={24} />
          </button>

          <div className="relative w-full max-w-4xl h-full max-h-[90vh] flex items-center justify-center">
            <Image
              src={selectedMaterials[currentImageIndex].image}
              alt={selectedMaterials[currentImageIndex].name}
              fill
              className="object-contain p-4"
            />
            <div className="absolute bottom-20 left-0 right-0 text-center text-white px-4">
              <h3 className="text-xl font-bold">
                {selectedMaterials[currentImageIndex].name}
              </h3>
              <p className="text-lg">
                {selectedMaterials[currentImageIndex].vendor}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 bg-white/20 text-white p-4 rounded-full hover:bg-white/30 transition-colors">
            <FaChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 text-white text-center w-full">
            {currentImageIndex + 1} of {selectedMaterials.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListCardPr;
