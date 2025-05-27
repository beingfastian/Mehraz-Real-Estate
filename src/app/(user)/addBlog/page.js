// "use client";
// import { motion } from "framer-motion";
// import {
//   DesSelStep2Screen3Header,
//   DesSelStep2Screen3DesignSlideMax,
//   DesSelStep2Screen3DesignSlideMin,
//   DEsignUpadet,
//   UserScreenSpinner,
// } from "@/components";
// import { lazy, useEffect, useState, Suspense } from "react";
// import { FiChevronRight } from "react-icons/fi";
// import useRPS from "@/hooks/useRPS";
// import {
//   getBookmarkedDesigns,
//   setBookmarkedDesigns,
// } from "@/utilities/user-side/design-selection/localStorageBookmarks";

// // const DesSelStep1Screen2ProjectsCarouselMax = lazy(() =>
// //   import("./DesSelStep1Screen2ProjectsCarouselMax"),
// // );



// const DesSelStep1Screen2ProjectsCarouselMax = lazy(() =>
//   import("@/components/user-side/fast-homes/design-selection/DesSelStep1Screen2ProjectsCarouselMax"),
// );



// // const DesSelStep1Screen2ProjectsCarouselMin = lazy(() =>
// //   import("./DesSelStep1Screen2ProjectsCarouselMin"),
// // );

// const DesSelStep1Screen2ProjectsCarouselMin = lazy(() =>
//   import("@/components/user-side/fast-homes/design-selection/DesSelStep1Screen2ProjectsCarouselMin"),
// );



// // const DesSelStep1Screen2ProjectsCarouselMinMobile = lazy(() =>
// //   import("./DesSelStep1Screen2ProjectsCarouselMinMobile"),
// // );

// const DesSelStep1Screen2ProjectsCarouselMinMobile = lazy(() =>
//   import("@/components/user-side/fast-homes/design-selection/DesSelStep1Screen2ProjectsCarouselMinMobile"),
// );

// const allDesigns = [
//   {
//     id: "hajfkajlj214141",
//     area: {
//       id: "4jB5BRiha5F45jcGzTEE",
//       area: 10,
//       category: "UPTO_18",
//       unit: "MARLA",
//     },
//     floors: {
//       id: "GywcLbBL9cjTxRq6GgX9",
//       name: "FIRST",
//     },
//     familyUnit: {
//       id: "GywcLbBL9cjTxRq6GgX9",
//       name: "ONE UNIT",
//     },
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris....",
//     descriptionOp1: "moon",
//     descriptionOp2: "moon",
//     style: {
//       name: "MODERN",
//       budget: "LOW",
//     },
//     image:
//       "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

//     designCost: 10000,
//     constructionCost: 200000000,
//   },
//   {
//     id: "hajfkajlj214142",
//     area: {
//       id: "4jB5BRiha5F45jcGzTEE",
//       area: 15,
//       category: "UPTO_18",
//       unit: "MARLA",
//     },
//     floors: {
//       id: "GywcLbBL9cjTxRq6GgX9",
//       name: "FIRST",
//     },
//     familyUnit: {
//       id: "GywcLbBL9cjTxRq6GgX9",
//       name: "ONE UNIT",
//     },
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris jaej",
//     descriptionOp1:
//       "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris",
//     descriptionOp2:
//       "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis",
//     style: {
//       name: "MODERN",
//       budget: "LOW",
//     },
//     image:
//       "https://images.unsplash.com/photo-1705179116249-a659af885205?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     designCost: 12000,
//     constructionCost: 200000000,
//   },
// ];

// const AddBlog = () => {
//   const { router, pathname, searchParams } = useRPS();
//   const areaParam = searchParams.get("area");
//   const floorParam = searchParams.get("floor");
//   const familyUnitParam = searchParams.get("familyUnit");
//   const requirementsParam = searchParams.get("requirements");

//   // const [allDesigns, setAllDesigns] = useState(null);
//   const [designsToShow, setDesignsToShow] = useState([]);
//   const [designGroups, setDesignGroups] = useState([]);

//   const designView = searchParams.get("designView") || "max";

//   const changeView = newView => {
//     const newSearchParams = new URLSearchParams(searchParams);
//     newSearchParams.set("designView", newView);
//     router.push(`${pathname}?${newSearchParams.toString()}`);
//   };

//   useEffect(() => {
//     if (!designView) {
//       changeView("max");
//     }
//   }, []);

//   useEffect(() => {
//     if (allDesigns) {
//       setDesignsToShow(allDesigns);

//       const groups = [];
//       for (let i = 0; i < designsToShow.length; i += 4) {
//         groups.push(designsToShow.slice(i, i + 4));
//       }
//       setDesignGroups(groups);
//     }
//   }, [allDesigns, designsToShow]);

//   const [maxViewCurrSlide, setMaxViewCurrSlide] = useState(1);

//   const checkLocalStorageBookmarked = id => {
//     const localStorageBookmarkedDesigns = getBookmarkedDesigns();
//     return localStorageBookmarkedDesigns.includes(id);
//   };

//   const bookmarkLocalStorageHandler = id => {
//     const localStorageBookmarkedDesigns = getBookmarkedDesigns();
//     const newBookmarkedDesigns = localStorageBookmarkedDesigns.includes(id)
//       ? localStorageBookmarkedDesigns.filter(
//           bookmarkedId => bookmarkedId !== id,
//         )
//       : [...localStorageBookmarkedDesigns, id];
//     setBookmarkedDesigns(newBookmarkedDesigns);
//   };

//   const selectDesignHandler = id => {
//     const newParams = new URLSearchParams(searchParams);
//     newParams.set("step", 2);
//     newParams.set("screen", 4);
//     newParams.set("design", id);
//     newParams.delete("designView");
//     router.push(`${pathname}?${newParams.toString()}`);
//   };

//   return (
//     <Suspense fallback={<UserScreenSpinner />}>
//       {!allDesigns ? (
//         <UserScreenSpinner />
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="relative w-full h-full min-h-page-user-inner xl:min-h-page-user-inner-xl max-h-page-user-inner max-w-8xl flex flex-col gap-2 lg:gap-1 lg:max-w-xl mx-auto px-4 pt-8 pb-6 xl:py-4 sm:p-2">
//          <div className="flex flex-wrap justify-center items-center gap-5 mb-8">  
//           <button   className= "  px-14 py-2 rounded-full border border-black bg-black text-white shadow">  
//             All  
//           </button>  
//           <button   className="px-14 py-2 rounded-full border border-black bg-transparent text-black shadow">  
//             Trees  
//           </button>  
//           <button    className="px-14 py-2 rounded-full border border-black bg-transparent text-black shadow">  
//             Plants  
//           </button>  
//           <button    className="px-14 py-2 rounded-full border border-black bg-transparent text-black shadow">  
//             Flowers  
//           </button>  
//           <span className="bg-[#EFEFEF] bg-opacity-80 p-2 lg:p-3 rounded-full">
//               <FiChevronRight
//                 className="text-black w-6 h-auto lg:w-5"
//                 size={24}
//               />
//             </span>
//         </div>  
//           {designsToShow.length === 0 ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-lg text-gray-500">No designs found</p>
//             </div>
//           ) : designView === "max" ? (
//             <Suspense fallback={<UserScreenSpinner />}>
//               <DesSelStep1Screen2ProjectsCarouselMax
//                 currentIndex={maxViewCurrSlide}
//                 setCurrentIndex={setMaxViewCurrSlide}>
//                 {designsToShow.map(design => (
//                   <DesSelStep2Screen3DesignSlideMax
//                     key={design.id}
//                     selectDesignHandler={() => {
//                       selectDesignHandler(design.id);
//                     }}
//                     design={design}
//                     isLocalStorageBookmarked={checkLocalStorageBookmarked(
//                       design.id,
//                     )}
//                     bookmarkLocalStorageHandler={() =>
//                       bookmarkLocalStorageHandler(design.id)
//                     }
//                   />
//                 ))}
//               </DesSelStep1Screen2ProjectsCarouselMax>
//             </Suspense>
//           ) : (
//             designView === "min" && (
//               <>
//                 {/* 3 slides carousel for descktop */}
//                 <Suspense fallback={<UserScreenSpinner />}>
//                   <DesSelStep1Screen2ProjectsCarouselMin>
//                     {/* {designsToShow.map((design, index) => (
//                       <DEsignUpadet
//                         key={design.id}
//                         design={design}
//                         selectDesignHandler={() => {
//                           selectDesignHandler(design.id);
//                         }}
//                         seeMoreHandler={() => {
//                           // index + 1 is because in the max designView, the last slide is cloned to the 0th index and the first slide is cloned to the last index to produce a infinite carousel effect
//                           setMaxViewCurrSlide(index + 1);
//                           changeView("max");
//                         }}
//                         isLocalStorageBookmarked={checkLocalStorageBookmarked(
//                           design.id,
//                         )}
//                         bookmarkLocalStorageHandler={() =>
//                           bookmarkLocalStorageHandler(design.id)
//                         }
//                       />
//                     ))} */}
//                   </DesSelStep1Screen2ProjectsCarouselMin>
//                 </Suspense>
//                 {/* 4 slides grid carousel for mobile and tablet */}
//                 <Suspense fallback={<UserScreenSpinner />}>
//                   <DesSelStep1Screen2ProjectsCarouselMinMobile>
//                     {designGroups?.map((group, groupIndex) => (
//                       <div key={groupIndex}>
//                         <div className="px-1 grid grid-cols-2 gap-2 mb-2">
//                           {/* {group?.map((design, designIndex) => (
//                             <DEsignUpadet
//                               key={design.id}
//                               design={design}
//                               seeMoreHandler={() => {
//                                 setMaxViewCurrSlide(
//                                   groupIndex * 4 + designIndex + 1,
//                                 );
//                                 changeView("max");
//                               }}
//                               isLocalStorageBookmarked={checkLocalStorageBookmarked(
//                                 design.id,
//                               )}
//                               bookmarkLocalStorageHandler={() =>
//                                 bookmarkLocalStorageHandler(design.id)
//                               }
//                               selectDesignHandler={() => {
//                                 selectDesignHandler(design.id);
//                               }}
//                             />
//                           ))} */}
//                         </div>
//                       </div>
//                     ))}
//                   </DesSelStep1Screen2ProjectsCarouselMinMobile>
//                 </Suspense>
//               </>
//             )
//           )}
//         </motion.div>
//       )}
//     </Suspense>
//   );
// };

// export default AddBlog;




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

  const handleButtonClick = (index) => {
    setCurrentImage(index % images.length);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
     
      <div className="flex flex-wrap mt-5 justify-center items-center gap-5 mb-8">
        <button
          className="px-14 py-2 rounded-full border border-black bg-black text-white shadow"
          onClick={() => handleButtonClick(0)}
        >
          All 
        </button>
        <button
          className="px-14 py-2 rounded-full border border-black bg-transparent text-black shadow"
          onClick={() => handleButtonClick(1)}
        >
          Trees
        </button>
        <button
          className="px-14 py-2 rounded-full border border-black bg-transparent text-black shadow"
          onClick={() => handleButtonClick(2)}
        >
          Plants
        </button>
        <button
          className="px-14 py-2 rounded-full border border-black bg-transparent text-black shadow"
          onClick={() => handleButtonClick(3)}
        >
          Flowers
        </button>

        <button
              onClick={prevImage}
              className="   text-black bg-[#A3A5A6]  p-3 rounded-full shadow-lg z-10 sm:-translate-x-6"
            >
              <FaChevronRight  />
            </button>


        {/* <button>
        <FaChevronRight size={22}  onClick={() => handleButtonClick(2)} className="text-black bg-[#A3A5A6]  " />

 
        </button> */}
      </div>

    
      <button
              onClick={prevImage}
              className="absolute  ml-[230px] top-1/2 transform -translate-y-1/2 text-black bg-[#A3A5A6]  p-3 rounded-full shadow-lg z-10 sm:-translate-x-6"
            >
              <FaChevronLeft  />
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
              className="absolute mr-[230px] right-0 top-1/2 transform -translate-y-1/2 text-black bg-[#A3A5A6] p-3 rounded-full shadow-lg z-10 sm:translate-x-6"
            >
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
            <MdOutlineShare className="text-white hover:text-green-500 cursor-pointer"  />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
