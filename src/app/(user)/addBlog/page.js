"use client";
import React, { useState } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaHeart,
  FaComment,
  FaShare,
} from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";

const AddBlog = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcqgtsGNO_IfzYM6VPS8lNikw4JWE-gsEBjQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0P-8jGLtQjo5Xcy0YxABxzwUQ5Fwgs0ATQ&s",
    "https://static.vecteezy.com/system/resources/previews/023/309/303/non_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg",
    "https://media.istockphoto.com/id/1026205392/photo/beautiful-luxury-home-exterior-at-twilight.jpg?b=1&s=612x612&w=0&k=20&c=FFc1oX54JEIVF4P5613J9Ng7CaN2rmjSU7m1vsnfi1s=",
    "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_640.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0OGLRITKepqfW1UVPArasusCr2aE2K9BpgJZw3E6A6VmkujYygZzJKGQunnPGYafT14&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxkpF0JSo99pnIMD1PGjM87u-_QRLijw_3BNhnuuRqLqLgxEyO-eCgyyS6C7aG5SyiWt4&usqp=CAU",
  ];

  const handleButtonClick = index => {
    setCurrentImage(index % images.length);
  };

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="flex flex-wrap mt-5 justify-center items-center gap-5 mb-8">
        <button
          className="px-14 py-2 rounded-full border border-black bg-black text-white shadow"
          onClick={() => handleButtonClick(0)}>
          All
        </button>
        <button
          className="px-14 py-2 rounded-full border border-black bg-transparent text-black shadow"
          onClick={() => handleButtonClick(1)}>
          Trees
        </button>
        <button
          className="px-14 py-2 rounded-full border border-black bg-transparent text-black shadow"
          onClick={() => handleButtonClick(2)}>
          Plants
        </button>
        <button
          className="px-14 py-2 rounded-full border border-black bg-transparent text-black shadow"
          onClick={() => handleButtonClick(3)}>
          Flowers
        </button>

        <button
          onClick={prevImage}
          className="   text-black bg-[#A3A5A6]  p-3 rounded-full shadow-lg z-10 sm:-translate-x-6">
          <FaChevronRight />
        </button>

        {/* <button>
        <FaChevronRight size={22}  onClick={() => handleButtonClick(2)} className="text-black bg-[#A3A5A6]  " />

 
        </button> */}
      </div>

      <button
        onClick={prevImage}
        className="absolute  ml-[230px] top-1/2 transform -translate-y-1/2 text-black bg-[#A3A5A6]  p-3 rounded-full shadow-lg z-10 sm:-translate-x-6">
        <FaChevronLeft />
      </button>
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-4xl bg-gray-200 shadow-lg rounded-2xl p-6">
          <div className=" mfxs:flex-wr mfmd:flex w-full items-start gap-4 relative">
            <div className="relative mfxs:w-full mfmd:w-2/3">
              <img
                src={images[currentImage]}
                alt="Main Carousel"
                className="w-full h-auto sm:h-64 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Thumbnails Section */}
            <div className=" grid mfxs:grid-row-1  mfmd:grid-cols-3 gap-2 mfxs:w-full mfmd:w-1/3">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className={`w-full h-20 object-cover rounded-lg cursor-pointer ${
                    currentImage === index ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute mr-[230px] right-0 top-1/2 transform -translate-y-1/2 text-black bg-[#A3A5A6] p-3 rounded-full shadow-lg z-10 sm:translate-x-6">
            <FaChevronRight />
          </button>
          {/* Blog Content */}
          <div className="mt-5 text-center">
            <h1 className="text-lg sm:text-xl font-bold">Blog #1</h1>
            <p className="text-gray-700 text-sm leading-6 mt-2 max-h-40 overflow-y-auto sm:text-base">
              My house is a cozy place where I feel safe and happy. It has a
              welcoming door and colorful flowers in the garden. Inside, there's
              a living room where my family plays games and watches TV together.
            </p>
          </div>

          {/* Blog Actions */}
          <div className="flex justify-between items-center mt-5  text-2xl px-4 py-3 bg-gray-500 rounded-lg shadow-inner">
            <a href="#" className="text-blue-500 underline">
              Read More
            </a>
            <div className="flex gap-3">
              <FaHeart className="text-white hover:text-red-500 cursor-pointer" />
              <FaComment className="text-white hover:text-blue-500 cursor-pointer" />
            </div>
            {/* <FaShare  /> */}
            <MdOutlineShare className="text-white hover:text-green-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
