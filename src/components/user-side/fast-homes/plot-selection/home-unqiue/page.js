"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa6";
const HomeUnique = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  
  
  const designOptions = [
    {
      id: 1,
      title: "INTERIOR DESIGN",
      price: "125,000 PKR",
      status: "Fully Personalized",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    },
    {
      id: 2,
      title: "INTERIOR DESIGN",
      price: "125,000 PKR",
      status: "Fully Personalized",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    },
    {
      id: 3,
      title: "INTERIOR DESIGN",
      price: "125,000 PKR",
      status: "Fully Personalized",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    },
    {
      id: 4,
      title: "CUSTOM",
      price: "125,000 PKR",
      status: "Fully Personalized",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    },
  ];

  const toggleCardSelection = (id) => {
    setSelectedCards(prev => {
      if (prev.includes(id)) {
        return prev.filter(cardId => cardId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      
      <h1 className="text-3xl font-semibold text-center mb-8">Lets Make Your Home Unique</h1>
      
      <div className="flex justify-center   items-center rounded-full  gap-4 mb-12">
        <div className="relative">
          <input 
            type="radio" 
            id="selected"  
            name="personalize"
            className="peer hidden" 
            defaultChecked
          />
          <label 
            htmlFor="selected"
            className="flex items-center px-6 py-2.5 rounded-full cursor-pointer bg-white shadow-md peer-checked:bg-gray-100 transition-all"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="peer-checked:block hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#000">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <span className="text-gray-700 text-sm font-medium">SELECTED CHANGES</span>
            </div>
          </label>
        </div>
        <div className="relative">
          <input 
            type="radio" 
            id="full" 
            name="personalize"
            className="peer hidden" 
          />
          <label 
            htmlFor="full"
            className="flex items-center px-6 py-2.5 rounded-full cursor-pointer bg-white shadow-md peer-checked:bg-[#FFF5E7] transition-all"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center peer-checked:border-[#edcb87] peer-checked:bg-[#edcb87]">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" 
                     viewBox="0 0 20 20" 
                     fill="currentColor"
                >
                  <path fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 text-sm font-medium">FULL PERSONALIZE</span>
            </div>
          </label>
        </div>
      </div>


      <div className="relative ml-2">
        <button className="absolute -left-8 -top-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 border border-gray-100 hover:bg-gray-50">
          <FaChevronLeft />
        </button>
      </div>


      <div className="relative px-12">
       

        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {designOptions.map((option) => (
            <div 
              key={option.id} 
              className="relative cursor-pointer"
              onClick={() => toggleCardSelection(option.id)}
            >
              <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="relative h-48">
                  <Image
                  fill 
                    src={option.image} 
                    alt={option.title} 
                    className="w-full h-full object-cover !relative"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold text-center">{option.title}</h3>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-center text-sm shadow-lg rounded-full py-2 text-gray-600">{option.status}</p>
                  <p className="text-center text-[#FF0000] shadow-lg rounded-full py-2 font-bold">{option.price}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className={`w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 ${selectedCards.includes(option.id) ? 'border-[#2f2f2f]' : 'border-black'}`}>
                  {selectedCards.includes(option.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#2f2f2f]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  ) : (
                    <div className="w-16 h-16 rounded-full text-black"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-baseline gap-2">
          <span className="text-gray-600">AMOUNT =</span>
          <div className="flex items-baseline gap-2">
            <span className="text-red-500 line-through text-sm">RS.140,000</span>
            <span className="text-[#FF0000] font-bold text-2xl">120,000 PKR</span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="border-t border-gray-200">
         
        </div>
        <p className="text-center  mt-5 text-gray-600 ">
            <span className="bg-white px-4  ">SHARE YOUR REQUIREMENTS</span>
          </p>

        <div className="relative mt-4">
          <textarea 
            className="w-full p-2 text-center rounded-lg focus:outline-none resize-none border-t"
            placeholder="TELL US ABOUT YOUR NEEDS, WHAT YOUR PLANNED IMAGINATION IS ..."
            rows="4"
            style={{
              background: 'linear-gradient(to bottom, white 90%, #BD9F4B 100%)',
            }}
          />
          
          <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center"
            style={{
              background: '#BD9F4B',
              borderBottomLeftRadius: '0.5rem',
              borderBottomRightRadius: '0.5rem'
            }}>
            <div className="flex justify-center gap-32 items-center w-full px-8">
              <span className="text-white font-medium">REFERENCE FILE /IMG (max lmt)</span>
              
             
              <label htmlFor="file-upload" className="cursor-pointer">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    // Handle file selection here
                    const file = e.target.files[0];
                    if (file) {
                      console.log('Selected file:', file.name);
                      // Add your file handling logic here
                    }
                  }}
                />
                <div className="bg-white rounded-lg px-4 py-0.5 flex items-center gap-2">
                  <span className="text-gray-500 font-medium">attach</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >   
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </div>
              </label>

            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button className="bg-gray-800 hover:bg-gray-900 text-white px-12 py-3 rounded text-lg font-medium transition-colors">
          DONE
        </button>
      </div>
    </div>
  );
};

export default HomeUnique;
  









