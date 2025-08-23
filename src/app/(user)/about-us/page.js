"use client";

import { useState } from "react";
import Image from "next/image";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

import img1 from "@/assets/images/user-side/blog poster 1.png";
import img2 from "@/assets/images/user-side/Group 97654.png";
import img3 from "@/assets/images/user-side/Group 97655.png";
import img4 from "@/assets/images/user-side/Group 97649.png";

// Service images only (titles already written inside them)
import s1 from "@/assets/images/user-side/Group 676.png";
import s2 from "@/assets/images/user-side/Group 675.png";
import s3 from "@/assets/images/user-side/Group 97650.png";
import s4 from "@/assets/images/user-side/Group 97653.png";
import s5 from "@/assets/images/user-side/Group 674.png";
import s6 from "@/assets/images/user-side/Group 97652.png";
import s7 from "@/assets/images/user-side/Group 97651.png";
import s8 from "@/assets/images/user-side/Group 740.png";

export default function AboutMehraz() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const images = [img1, img2, img3, img4];
  const services = [s1, s2, s3, s4, s5, s6, s7, s8];
  const affiliations = Array(26).fill("CLIMATE FINANCE PK"); // mock affiliations

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevService = () => {
    setCurrentServiceIndex(prevIndex =>
      prevIndex === 0 ? services.length - 3 : prevIndex - 1,
    );
  };

  const nextService = () => {
    setCurrentServiceIndex(prevIndex =>
      prevIndex + 3 >= services.length ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="w-full min-h-full bg-white">
      <div className="relative container mx-auto px-5 py-4">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 text-center mb-2">
          ABOUT <span className="text-black">MEHRAZ</span>
        </h1>

        <div className="border-b border-gray-300 w-full pb-4">
          <div className="flex flex-row justify-between gap-8 pt-3">
            {/* Image & Slider */}
            <div className="w-full lg:w-[45%]">
              <Image
                src={images[currentImageIndex]}
                alt="Building"
                width={800}
                height={500}
                className="w-full h-[380px] sm:h-[480px] object-cover rounded-lg"
              />

              {/* Thumbnails */}
              <div className="flex flex-nowrap items-center overflow-x-auto scrollbar-hide gap-4 mt-6">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg cursor-pointer border-2 overflow-hidden ${
                      index === currentImageIndex
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}>
                    <Image
                      src={img}
                      alt="Thumbnail"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="flex-shrink-0 flex items-center">
                  <AiOutlineRight
                    className="text-xl sm:text-2xl text-gray-700 cursor-pointer bg-white rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition"
                    onClick={nextImage}
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-[45%]">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-3 leading-snug">
                <b>BUILD YOUR DREAM.</b> <br />
                <span className="text-gray-800">SHAPE THE FUTURE.</span>
              </h2>
              <p className="text-gray-600 mb-6 text-justify leading-relaxed">
                At Mehraz, we are transforming the way architecture and
                construction come to life. By combining innovation with seamless
                digital solutions, we make designing and building your dream
                space easier, smarter, and more accessible. Whether it’s
                crafting modern homes, designing stunning interiors, or managing
                full-scale construction, Mehraz ensures efficiency,
                transparency, and excellence in every project.
              </p>
              <p className="italic text-gray-500">
                With a commitment to quality and a vision for the future, we
                empower you to bring your ideas to reality—effortlessly and with
                confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Affiliations & Services */}
        <div className="flex flex-row justify-between gap-6 pt-3">
          {/* Affiliations */}
          <div className="w-full lg:w-[48%]">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 uppercase">
              Affiliations ({affiliations.length})
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              {affiliations.slice(0, 4).map((affiliation, index) => (
                <div
                  key={index}
                  className="flex flex-col cursor-pointer items-center justify-center px-3">
                  <Image
                    src="/images/climate.png"
                    alt={affiliation}
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                  <p className="text-sm font-medium text-gray-700 text-center mt-px">
                    Climate <br /> Finance PK
                  </p>
                </div>
              ))}
              <AiOutlineRight className="text-xl sm:text-2xl text-gray-700 cursor-pointer bg-white rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition" />
            </div>
          </div>

          {/* Services */}
          <div className="w-full lg:w-[48%]">
            <h3 className="text-2xl font-bold text-gray-800 mb-3 uppercase">
              Services
            </h3>
            <div className="flex items-center gap-2">
              {/* Left button */}
              <AiOutlineLeft
                className="text-xl sm:text-2xl text-gray-700 cursor-pointer bg-white rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition"
                onClick={prevService}
              />

              {/* Service cards */}
              <div className="flex justify-between items-center gap-4 w-full">
                {services
                  .slice(currentServiceIndex, currentServiceIndex + 3)
                  .map((service, index) => (
                    <div
                      key={index}
                      className="relative h-[100px] w-1/3 rounded-lg overflow-hidden group">
                      <Image
                        src={service}
                        alt={`Service ${index}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                    </div>
                  ))}
              </div>

              {/* Right button */}
              <AiOutlineRight
                className="text-xl sm:text-2xl text-gray-700 cursor-pointer bg-white rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition"
                onClick={nextService}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
