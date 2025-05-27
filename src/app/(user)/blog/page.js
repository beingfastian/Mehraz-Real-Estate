"use client";
import React, { useState } from "react";
import { FaHeart, FaChevronLeft, FaComment } from "react-icons/fa";
import { FaRegHeart, FaRegComment } from "react-icons/fa6";
import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Image from "next/image";

const Blog = () => {
  const imgurl =
    "https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?cs=srgb&dl=pexels-sebastians-731082.jpg&fm=jpg";
  const imgurl1 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODtzeDZWkwEn1F3aW_mWETKJfMc99ApYpzA&s";
  const imgurl2 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFg9lIo9D1LEh4_4p0V9LvFk2LKj4WvjqsYw&s";
  const imgurl3 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNKFV17gJrHDM4f6kscuSQSsrmD0Gc8xeqUQ&s";
  const imgurl4 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCY2Lip_gobYp9YRMltd4uvGfeGXLhSL9kgQ&s";

  const cards = [
    { id: 1, img: imgurl, title: "Beautiful Architecture" },
    { id: 2, img: imgurl1, title: "Modern Designs" },
  ];

  const visibleCount = 2; // Number of cards visible at a time
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  // Get currently visible cards
  const visibleCards = cards.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${imgurl})` }}>
      <div className="flex flex-col items-center text-center px-4 py-8">
        <h1 className="text-white text-4xl md:text-5xl font-bold bg-opacity-50 p-4 mt-5 rounded ">
          <p className="inline font-thin">MEHRAZ </p> ARCHITECTURE BLOGS
        </h1>
        <p className="   text-xl text-gray-700 bg-transparent">
          Explore All The Possible Feels, Wonders Architecture Can <br />
          Do In Your Life
        </p>

        <Link href="/AddBlog">
          <button
            className={`block w-full font-proxima-nova uppercase rounded bg-gradient-to-b from-accent-gold-lighter to-accent-gold-light shadow-btn relative z-[1] px-16 py-4 mt-5 text-xl font-medium mb-12 before:bg-white before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 before:rounded-sm hover:text-accent-gold hover:from-accent-gold hover:to-accent-gold hover:before:opacity-100  before:transition-opacity before:duration-300 duration-300`}>
            EXPLORE BLOGS
          </button>
        </Link>
        <p className="border-b-2  border-white  font-thin  w-1/2 mb-6"></p>

        <div className="flex flex-wrap justify-center items-center gap-5 mb-8">
          <button className="  px-14 py-1 rounded-full border border-white bg-white text-black shadow">
            All
          </button>
          <button className="px-14 py-1 rounded-full border border-white bg-transparent text-white shadow">
            Trees
          </button>
          <button className="px-14 py-1 rounded-full border border-white bg-transparent text-white shadow">
            Plants
          </button>
          <button className="px-14 py-1 rounded-full border border-white bg-transparent text-white shadow">
            Flowers
          </button>
          <FiChevronRight
            size={40}
            className="bg-[#A3A5A6]  mr-5 p-2   rounded-full shadow-lg  sm:-translate-x-6"
          />
        </div>

        <div className="relative flex items-center mb-8">
          {/* Left Navigation Button */}
          <FiChevronLeft
            onClick={handlePrev}
            size={55}
            className="bg-[#A3A5A6]  mr-5 p-2   rounded-full shadow-lg  sm:-translate-x-6"
          />

          <div className="flex justify-center gap-4 overflow-x-auto">
            {/* Display cards based on screen size */}
            {/* <div className="flex md:flex-wrap justify-center gap-4 w-full">
              {getVisibleCards().map(card => (
                <div
                  key={card.id}
                  className="border-2 border-white rounded-lg bg-transparent shadow-lg text-center w-72 flex-shrink-0">
                  <Image
                    fill
                    src={card.img}
                    alt={card.title}
                    className="w-full h-40 object-cover rounded-t-md"
                  />
                  <h2 className="text-white text-lg font-semibold p-2">
                    {card.title}
                  </h2>
                  <div className="flex justify-center gap-10 py-2">
                    <FaRegHeart className="text-white cursor-pointer text-2xl hover:scale-110 transition-transform" />
                    <FaRegComment className="text-white cursor-pointer text-2xl hover:scale-110 transition-transform" />
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* <div className="flex justify-center gap-4 overflow-x-auto">  
  <div className="flex flex-wrap justify-center gap-4 w-full">
    {cards.slice(currentIndex, currentIndex + 4).map((card) => (  
      <div  
        key={card.id}  
        className="border-2 border-white rounded-lg p-4 bg-transparent shadow-lg text-center w-full sm:w-[calc(50%-1rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] flex-shrink-0"  
      >  
        <img  
          src={card.img}  
          alt={card.title}  
          className="w-full h-40 object-cover rounded-md mb-4"  
        />  
        <h2 className="text-white text-lg font-semibold mb-4">{card.title}</h2>  
        <div className="flex justify-between items-center">  
          <FaHeart className="text-red-500 cursor-pointer hover:scale-110 transition-transform m-2" />  
          <FaComment className="text-blue-500 cursor-pointer hover:scale-110 transition-transform m-2" />  
        </div>  
      </div>  
    ))}
  </div>
</div>   */}

          {/* Right Navigation Button */}
          <FiChevronRight
            size={55}
            onClick={handleNext}
            className="bg-[#A3A5A6]  ml-5 p-2   rounded-full shadow-lg  sm:-translate-x-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
// import { FaRegHeart, FaRegComment } from "react-icons/fa6";

// export default function Home(){
//   const imgurl = "https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?cs=srgb&dl=pexels-sebastians-731082.jpg&fm=jpg";
//   const imgurl1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODtzeDZWkwEn1F3aW_mWETKJfMc99ApYpzA&s";
//   const imgurl2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFg9lIo9D1LEh4_4p0V9LvFk2LKj4WvjqsYw&s";
//   const imgurl3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNKFV17gJrHDM4f6kscuSQSsrmD0Gc8xeqUQ&s";

//   // Four cards
//   const cards = [
//     { id: 1, img: imgurl, title: "Beautiful Architecture" },
//     { id: 2, img: imgurl1, title: "Modern Designs" },
//     { id: 3, img: imgurl2, title: "Sustainable Homes" },
//     { id: 4, img: imgurl3, title: "Luxury Spaces" }
//   ];

//   // // Visible cards count
//   // const visibleCount = 3;
//   // const [currentIndex, setCurrentIndex] = useState(0);

//   // const handlePrev = () => {
//   //   setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
//   // };

//   // const handleNext = () => {
//   //   setCurrentIndex((prev) => (prev + 1) % cards.length);
//   // };

//   // // To get the currently visible cards in a circular fashion
//   // const getVisibleCards = () => {

//   //   for (let i = 0; i < visibleCount; i++) {
//   //     visible.push(cards[(currentIndex + i) % cards.length]);
//   //   }
//   //   return visible;
//   // };

//   return (
//     <div
//       className="w-full min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${imgurl})` }}
//     >
//       <div className="flex flex-col items-center text-center px-4 py-8 bg-black bg-opacity-40 min-h-screen">
//         <h1 className="text-white text-4xl md:text-5xl font-bold p-4 mt-5 rounded">
//           <span className="font-thin">MEHRAZ </span> ARCHITECTURE BLOGS
//         </h1>
//         <p className="text-xl text-gray-300">Explore All The Possible Feels, Wonders Architecture Can<br/>Do In Your Life</p>
//         <Link href="/AddBlog">
//           <button className="mt-5 mb-12 px-16 py-4 text-xl font-medium uppercase rounded bg-gradient-to-b from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 transition-colors">
//             Explore Blogs
//           </button>
//         </Link>

//         <p className="border-b-2 border-white font-thin w-1/2 mb-6"></p>

//         <div className="flex flex-wrap justify-center items-center gap-5 mb-8">
//           <button className="px-8 py-1 rounded-full border border-white bg-white text-black shadow">All</button>
//           <button className="px-8 py-1 rounded-full border border-white bg-transparent text-white shadow">Trees</button>
//           <button className="px-8 py-1 rounded-full border border-white bg-transparent text-white shadow">Plants</button>
//           <button className="px-8 py-1 rounded-full border border-white bg-transparent text-white shadow">Flowers</button>
//           <FiChevronRight size={32} className="bg-gray-400 p-1 rounded-full shadow hidden sm:block" />
//         </div>

//         <div className="flex items-center justify-center mb-8 w-full">
//           {/* Left Navigation */}
//           <button onClick={handlePrev} className="mr-3">
//             <FiChevronLeft size={48} className="bg-gray-400 p-2 rounded-full shadow hover:scale-110 transition-transform" />
//           </button>

//           {/* Cards Container */}
//           <div className="overflow-hidden w-3/4">
//             <div
//               className="flex gap-4 transition-transform duration-300"
//               style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
//             >
//               {cards.concat(cards).map((card, idx) => {
//                 // We'll have a double array to help with continuous sliding, but only actually render enough
//                 if (idx < cards.length + visibleCount) {
//                   return (
//                     <div
//                       key={idx}
//                       className="border-2 border-white rounded-lg bg-transparent shadow-lg text-center w-72 flex-shrink-0"
//                     >
//                       <img
//                         src={card.img}
//                         alt={card.title}
//                         className="w-full h-40 object-cover rounded-t-md"
//                       />
//                       <h2 className="text-white text-lg font-semibold p-2">{card.title}</h2>
//                       <div className="flex justify-center gap-10 py-2">
//                         <FaRegHeart className="text-white cursor-pointer text-2xl hover:scale-110 transition-transform" />
//                         <FaRegComment className="text-white cursor-pointer text-2xl hover:scale-110 transition-transform" />
//                       </div>
//                     </div>
//                   );
//                 } else {
//                   return null;
//                 }
//               })}
//             </div>
//           </div>

//           {/* Right Navigation */}
//           <button onClick={handleNext} className="ml-3">
//             <FiChevronRight size={48} className="bg-gray-400 p-2 rounded-full shadow hover:scale-110 transition-transform" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
