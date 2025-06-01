import Image from 'next/image';
import { industrialImage } from "@/assets";

export default function HouseUI() {
  return (
    <div className="h-screen flex">
      {/* Left Half */}
      <div className="w-1/2 bg-white p-8 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">PROJECT TITLE</h1>

          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">OPTIONS</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border border-gray-400 mr-2"></div>
                <span className="text-gray-700">W/ OUTDOOR BALCONY</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border border-gray-400 mr-2"></div>
                <span className="text-gray-700">W/ OUTDOOR BALCONY</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
            <span className="text-blue-600 text-sm cursor-pointer">... more</span>
          </div>

          <div className="flex space-x-4 mb-8">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded">360 TOUR</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded">HOME PROGRAM</button>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded mb-8">VIEW MATERIALS</button>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="h-16 bg-gray-200 rounded mb-2"></div>
                <p className="text-sm font-medium text-gray-800">NAME</p>
                <p className="text-xs text-gray-500">VENDOR</p>
                <p className="text-xs font-medium text-gray-700 mt-1">1500 PKR/CFT</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">GET DESIGNED</h3>
            <p className="text-sm text-gray-600 mb-4">RURGEMISE SERVICE: PKR 10.000</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
              LET'S REALIZE THIS FOR MY HOME
            </button>
          </div>
        </div>
      </div>

      {/* Right Half - Image Gallery */}
      <div className="w-1/2 bg-white p-4 flex flex-col items-center justify-center">
        {/* Main Image */}
        <div className="relative w-full h-[70%] rounded-xl overflow-hidden mb-4">
          <Image
            src={industrialImage}
            alt="Main House View"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        {/* Thumbnails without scroll */}
        <div className="grid grid-cols-4 gap-4 w-full">
          {[1, 2, 3, 4].map((thumb, index) => (
            <div
              key={index}
              className="relative w-full h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer"
            >
              <Image
                src={industrialImage}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
