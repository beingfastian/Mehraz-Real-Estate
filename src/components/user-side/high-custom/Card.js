"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const Card = ({ data, setStep, hightcustomdetail, setHighCustomDetail }) => {
  const router = useRouter();
  // const addQueryParameter = (category) => {
  //   // Get current path and query parameters
  //   const currentPath = router.pathname;
  //   const currentQuery = router.query;

  //   // Update query parameters with new category
  //   const newQuery = { ...currentQuery, category: 'category' };

  //   // Update the URL with the new query parameters
  //   router.push({
  //     pathname: currentPath,
  //     query: newQuery,
  //   });
  // };
  // function categoryselected(category) {
  //   const currentPath = router.pathname;
  //   const currentQuery = router.query;

  //   // Update query parameters with new category
  //   const newQuery = { ...currentQuery, category: "category" };

  //   // Update the URL with the new query parameters
  //   router.push({
  //     pathname: currentPath,
  //     query: newQuery,
  //   });
  //   setStep(prev => prev + 1);
  // }
  function categoryselected(category) {
    router.push(`?category=${category}`);
    setStep(prev => prev + 1);
    setHighCustomDetail(prev => {
      return { ...prev, category: category };
    });
    // const currentPath = router.asPath; // Extract current path without query
    // console.log("curren tpath is:", currentPath);
    // const currentQuery = new URLSearchParams(window.location.search); // Extract current query parameters
    // // Update query parameters with new category
    // const newQuery = new URLSearchParams(currentQuery);
    // newQuery.set("category", category);
    // console.log("new query is:", newQuery);
    // // Update the URL with the new query parameters
    // console.log(`our path is: ${currentPath}?${newQuery.toString()}`);
    // router.push(`${currentPath}?${newQuery.toString()}`);
    // setStep(prev => prev + 1); // Example state update
  }
  return (
    <div className=" w-[270px] h-[320px] sm:w-[150px] sm:h-[175px] flex justify-center items-center">
      <div
        className="relative w-full h-full hover:w-[90%] hover:h-[90%] duration-200 ease-linear cursor-pointer"
        onClick={() => categoryselected(data?.URL)}>
        <Image
          src={data?.imagesrc}
          alt="Background"
          fill
          className="w-full h-full object-cover !relative"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content on Top of Image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-xl  sm:text-base mb-4">{data?.text}</h1>
          <p className="text-lg md:text-2xl text-center"></p>
        </div>
      </div>
      {/* card content ends  */}
    </div>
  );
};

export default Card;
