"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { industrialImage, circleCheckIcon } from "@/assets";
import HomeProgramPopup from "./HomeProgramPopup";
import { VideoCarousel } from "@/components";
import useRPS from "@/hooks/useRPS";
import { useState, useEffect } from "react";
import { db, storage } from "@/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import replaceFamilyUnitIdWithDoc from "@/Firebase/user-side/design-selection/replaceFamilyUnitIdWithDoc";
import replaceAreaIdWithDoc from "@/Firebase/user-side/design-selection/replaceAreaIdWithDoc";

export default function DesSelStep2Screen4() {
  const { router, pathname, searchParams } = useRPS();
  const designId = searchParams.get("design");

  const [designData, setDesignData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showHomeProgram, setShowHomeProgram] = useState(false);
  const [showVideoTour, setShowVideoTour] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [materialStart, setMaterialStart] = useState(0);

  const visibleThumbs = 4;
  const [thumbStart, setThumbStart] = useState(0);

  useEffect(() => {
    if (!designId) return;

    const fetchDesignData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "RP_DESIGNS", designId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setDesignData(null);
          return;
        }

        const data = docSnap.data();

        // Fetch main image and other images
        const imageRef = ref(storage, `RP_DESIGNS/${designId}/image`);
        const mainImageUrl = await getDownloadURL(imageRef).catch(() => null);

        // Fetch additional images if they exist
        const images = data.images?.length
          ? data.images
          : mainImageUrl
          ? [mainImageUrl]
          : [];

        const area = await replaceAreaIdWithDoc(data.areaId);
        const familyUnit = await replaceFamilyUnitIdWithDoc(data.familyUnitId);

        setDesignData({
          id: designId,
          area,
          familyUnit,
          budget: data.constructionCost,
          designCost: data.designCost,
          constructionCost: data.constructionCost,
          description: data.description || "No description available.",
          materials: data.materials || [],
          images: images.length ? images : [industrialImage],
        });
      } catch (err) {
        console.error("Error fetching design:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignData();
  }, [designId]);

  const handleNextImage = () => {
    if (mainImageIndex < (designData?.images?.length || 0) - 1)
      setMainImageIndex(mainImageIndex + 1);
  };

  const handlePrevImage = () => {
    if (mainImageIndex > 0) setMainImageIndex(mainImageIndex - 1);
  };

  const handleThumbScroll = direction => {
    if (!designData?.images) return;
    if (direction === "left" && thumbStart > 0) setThumbStart(thumbStart - 1);
    if (
      direction === "right" &&
      thumbStart + visibleThumbs < designData.images.length
    )
      setThumbStart(thumbStart + 1);
  };

  if (loading) {
    return (
      <div className="h-[90%] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading design details...</p>
        </div>
      </div>
    );
  }

  if (!designData) {
    return (
      <div className="h-[90%] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Design not found</p>
          <p className="text-gray-600">
            The selected design could not be loaded.
          </p>
        </div>
      </div>
    );
  }
  const selectDesignHandler = id => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("step", 2);
    newParams.set("screen", 5);
    newParams.set("design", id);
    newParams.delete("designView");
    router.push(`${pathname}?${newParams.toString()}`);
  };
  return (
    <div className="h-[90%] flex">
      {/* Left Half */}
      <div className="w-[60%] bg-white pt-8 pb-12 px-8 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 uppercase">
            {designData.area?.name || "PROJECT TITLE"}
          </h1>

          <div className="flex justify-center gap-4 mb-4 text-sm text-gray-600">
            <span>{designData.familyUnit?.name || "Family Unit"}</span>
            <span>•</span>
            <span>
              Budget: PKR {parseInt(designData.budget || 0).toLocaleString()}
            </span>
          </div>

          <div className="mb-8">
            <div
              className={`text-gray-600 text-sm transition-max-height duration-500 ease-in-out overflow-hidden ${
                showFullText ? "max-h-[1000px]" : "max-h-[140px]"
              }`}>
              <p>{designData.description}</p>
            </div>
            <div className="text-left">
              <span
                onClick={() => setShowFullText(!showFullText)}
                className="text-black-600 text-sm cursor-pointer mt-1 inline-block hover:underline">
                {showFullText ? "Show Less" : "Show More"}
              </span>
            </div>
          </div>

          {/* Only show these elements when text is not expanded */}
          {!showFullText && (
            <>
              <div className="flex justify-between space-x-4 mb-8">
                <button
                  onClick={() => setShowVideoTour(true)}
                  className="bg-[#FFF3E4] text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm flex items-center gap-2 hover:shadow-md transition">
                  <span>↲</span>
                  <span>360 TOUR</span>
                </button>
                <button
                  onClick={() => setShowHomeProgram(true)}
                  className="bg-[#FFF3E4] text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm hover:shadow-md transition">
                  HOME PROGRAM
                </button>
              </div>

              <button className="w-full uppercase text-white hover:text-black bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full text-xl sm:text-base relative z-[1] group overflow-hidden transition-all duration-300 before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 group mb-8">
                <span className="font-normal">View</span>{" "}
                <span className="font-bold"> Materials</span>
              </button>

              {/* Materials Grid */}
              <div className="flex gap-4 items-center mb-8">
                <div className="grid grid-cols-3 gap-x-6 gap-y-6 flex-grow">
                  {designData.materials
                    .slice(materialStart, materialStart + 3)
                    .map((material, index) => (
                      <div
                        key={material.id || index}
                        className="w-[145px] h-[150px] rounded-[10px] relative border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col bg-white">
                        <div className="w-full h-[85px] rounded-[5px] overflow-hidden relative">
                          <Image
                            src={material.image || industrialImage}
                            layout="fill"
                            objectFit="cover"
                            alt={material.name || "Material"}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="mt-1 flex-grow flex flex-col px-1">
                          <h4 className="font-bold text-[15px] uppercase truncate text-[#1f1f1f]">
                            {material.name || "NAME"}
                          </h4>
                          <p className="text-[14px] truncate text-[#2f2f2f]">
                            {material.vendor || "VENDOR"}
                          </p>
                          <p className="text-[14px] mt-auto rounded-full px-2 py-0.5 truncate bg-gray-100 border border-black opacity-80">
                            {material.price || "PRICE"}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                {designData.materials.length > 3 && (
                  <button
                    onClick={() => setMaterialStart(materialStart + 3)}
                    disabled={materialStart + 3 >= designData.materials.length}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>

              <button
                onClick={selectDesignHandler}
                className="w-full uppercase flex-row flex justify-center font-semibold text-white py-2 hover:text-black bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full text-2xl sm:text-base relative z-[1] group overflow-hidden transition-all duration-300 before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 group">
                <Image
                  src={circleCheckIcon}
                  width={24}
                  height={22}
                  className="w-6 h-auto"
                  alt="circle check"
                />
                <span>Get Designed</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Right Half - Image Gallery */}
      <div className="w-[40%] bg-white pt-8 mr-[150px] flex flex-col items-center justify-start">
        <div className="relative w-full h-[70%] rounded-xl overflow-hidden mb-4 flex items-center justify-center">
          <button
            onClick={handlePrevImage}
            disabled={mainImageIndex === 0}
            className="absolute left-2 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft size={24} />
          </button>

          <Image
            src={designData.images[mainImageIndex]}
            alt={`${designData.area?.name || "Design"} View ${
              mainImageIndex + 1
            }`}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />

          <button
            onClick={handleNextImage}
            disabled={mainImageIndex === designData.images.length - 1}
            className="absolute right-2 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex items-center w-full gap-2">
          <button
            onClick={() => handleThumbScroll("left")}
            disabled={thumbStart === 0}
            className="p-1 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft size={20} />
          </button>

          <div className="grid grid-cols-4 gap-2 flex-1">
            {designData.images
              .slice(thumbStart, thumbStart + visibleThumbs)
              .map((img, index) => (
                <div
                  key={index + thumbStart}
                  onClick={() => setMainImageIndex(index + thumbStart)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    index + thumbStart === mainImageIndex
                      ? "border-blue-500 shadow-lg"
                      : "border-transparent hover:border-blue-300"
                  }`}>
                  <Image
                    src={img}
                    alt={`${designData.area?.name || "Design"} Thumbnail ${
                      index + 1
                    }`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
          </div>

          <button
            onClick={() => handleThumbScroll("right")}
            disabled={thumbStart + visibleThumbs >= designData.images.length}
            className="p-1 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {showHomeProgram && (
        <HomeProgramPopup onClose={() => setShowHomeProgram(false)} />
      )}

      {showVideoTour && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-black bg-opacity-90 p-4 relative w-full h-full overflow-hidden shadow-lg pt-[20vh]">
            <button
              onClick={() => setShowVideoTour(false)}
              className="absolute top-4 right-4 bg-gray-100 rounded-full p-1 hover:bg-gray-200 z-50">
              <X size={18} />
            </button>
            <VideoCarousel />
          </div>
        </div>
      )}
    </div>
  );
}
