"use client";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/UserContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
import { positivenumbercheck } from "@/components";
import { Spinner } from "@/components";
import BlackButton from "../BlackButton";
const ProjectDetails = ({
  setStep,
  hightcustomdetail,
  setHighCustomDetail,
}) => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [area2, setArea2] = useState("");
  const [location2, setLocation2] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [unit, setUnit] = useState("sqft");
  const [currency, setCurrency] = useState("pkr");
  const [requirement, setRequirement] = useState("");

  const [placetype, setPlaceType] = useState(1);
  const searchParams = useSearchParams(); // Use useSearchParams to get query params
  const categoryName = searchParams.get("category"); // Get specific query parameter
  function handleprocesschange(num) {
    if (placetype == num) return;
    else {
      setPlaceType(num);
      if (num == 1)
        setHighCustomDetail(prev => {
          return { ...prev, alreadyplot: true, buyplot: false };
        });
      else if (num == 2) {
        setHighCustomDetail(prev => {
          return { ...prev, alreadyplot: false, buyplot: true };
        });
      }
    }
  }
  function handlealreadyplot() {
    if (!positivenumbercheck(area)) {
      toast.error("AREA Must be Positive Number");
      return;
    }
    if (area && !unit && location) {
      toast.error("Please Select the Area Unit");
      return;
    }
    if (!area || !unit || !location) {
      toast.error("please Fill All required Fields");
      return;
    }
    setHighCustomDetail(prev => {
      return {
        ...prev,
        unit: unit,
        area: area,
        location: location,
        alreadyplot: true,
        buyplot: false,
      };
    });
    // db intraction start

    // db intraction end
    setStep(prev => prev + 1);
  }
  async function handlebuyplot() {
    try {
      if (!auth.user) {
        toast.error("Please Login to countinue");
        return;
      }
      if ((area2 && !unit) || (!currency && location2 && maxBudget)) {
        toast.error("Please Select the Units");
        return;
      }
      if (!area2 || !unit || !location2 || !currency || !maxBudget) {
        toast.error("please Fill All required Fields");
        return;
      }
      // try {
      // Now store the download URL and other data to Firestore
      setLoading(true);
      const docRef = await addDoc(collection(db, "highcustom"), {
        ...hightcustomdetail,
        area: area2,
        unit: unit,
        location: location2,
        currency: currency,
        budget: maxBudget,
        alreadyplot: false,
        buyplot: true,
        user: auth.user,
        reviewed: false,
        createdAt: Date.now(),
      });
      // console.log("dec Ref is:", docRef);
      // console.log("doc key is: ", docRef.id);
      setLoading(false);
      toast.success("Detail send to Admin MEHRAZ TEAM will Reach You!");
      setStep(prev => prev + 2);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  const router = useRouter();

  useEffect(() => {}, [categoryName]);
  return (
    <>
      {/* back button  */}
      <button
        className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn sm:absolute sm:top-14 sm:left-1 sm:z-10 md:absolute md:top-20 md:left-1 md:z-10 absolute z-50"
        onClick={e => {
          setStep(prev => prev - 1);
        }}>
        <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
      </button>
      <span className="text-3xl text-[#6A6A6A] relative left-[10%] sm:justify-center sm:top-0 sm:left-0 inline sm:flex md:block md:w-[100%] md:left-[0px] md:text-center">
        STEP 1/2
      </span>
      {/* back button end  */}
      <div className="h-full w-full flex flex-col items-center relative top-[-10%] sm:top-[0%] md:top-[0%]">
        <h1 className=" px-5 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-800 w-64 sm:w-fit text-center text-white text-2xl my-4">
          <span className=" font-bold">Plot</span> Info
        </h1>
        <div className="container1 w-[70%] md:w-[90%] sm:w-full flex flex-col items-center">
          <div className="flex items-center px-5 py-1 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-800 w-64 sm:w-fit text-center">
            <input
              id="already-have-plot"
              type="radio"
              value=""
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => handleprocesschange(1)}
              checked={placetype == 1 ? true : false}
            />
            <label
              htmlFor="already-have-plot"
              className="w-full ms-2 font-medium dark:text-gray-300  text-white text-xl sm:text-base">
              <span className="font-bold">Already</span> have an Plot
            </label>
          </div>
          {/* card start */}

          {placetype == 1 && (
            <div className="block p-6 sm:px-[2px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-[100%]">
              <form>
                <div className=" flex justify-around items-center relative">
                  <label
                    htmlFor="area"
                    className=" mb-2 text-gray-900 dark:text-white w-[20%] text-xl sm:text-base flex items-center">
                    AREA <span className="text-red-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="Number"
                    min="1"
                    id="area"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[70%] sm:w-[80%]"
                    placeholder="50sq ft"
                    onChange={e => setArea(e.target.value)}
                    required
                  />
                  {/* area type selection start  */}
                  <select
                    id="underline_select"
                    className="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer absolute left-[85%] sm:left-[80%] md:left-[80%] lg:left-[80%] border-b-0  p-[0px] sm:w-[57px] w-[90px]"
                    onChange={e => setUnit(e.target.value)}>
                    <option value="sq-ft" selected>
                      SQ FT
                    </option>
                    <option value="marla">Marla</option>
                  </select>
                  {/* area selection end  */}
                </div>
                <div className=" flex justify-around items-center mt-2">
                <label
                    htmlFor="location"
                    className=" mb-2 text-gray-900 dark:text-white w-[20%] text-xl sm:text-base flex items-center">
                    Location <span className="text-red-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[70%] sm:w-[80%]"
                    placeholder="DHA, Lahore"
                    onChange={e => setLocation(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
          )}

          {/* card end  */}
        </div>
        <div className="or w-[50%] mx-auto flex items-center my-5">
          <span className="border-b border-gray-500 border-solid w-[50%]"></span>
          OR
          <span className="border-b border-gray-500 border-solid w-[50%]"></span>
        </div>
        <div className="container2 w-[70%] sm:w-full flex flex-col items-center">
          <div className="flex items-center px-5 py-1 border border-gray-200 dark:border-gray-700 rounded-full bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green w-64 sm:w-fit text-center">
            <input
              id="buy-plot"
              type="radio"
              value=""
              name="buy-plot"
              onChange={() => handleprocesschange(2)}
              checked={placetype == 2 ? true : false}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="buy-plot"
              className="w-full ms-2 font-medium dark:text-gray-300  text-white text-xl sm:text-base">
              <span className="font-bold">Buy</span> Plot
            </label>
          </div>{" "}
          {placetype == 2 && (
            <div className="block p-6 sm:px-[2px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-[100%]">
              <div>
                <div className=" flex justify-around items-center relative">
                  <label
                    htmlFor="area"
                    className="block mb-2 text-gray-900 dark:text-white w-[20%] text-xl sm:text-base">
                    AREA <span className="text-red-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    id="area"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[70%] sm:w-[80%]"
                    placeholder="50sq ft"
                    onChange={e => setArea2(e.target.value)}
                    required
                  />
                  {/* area type selection start  */}
                  <select
                    id="underline_select"
                    className="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer absolute left-[85%] sm:left-[80%] md:left-[80%] lg:left-[80%] border-b-0  p-[0px] sm:w-[57px] w-[90px]"
                    onChange={e => setUnit(e.target.value)}>
                    <option value="sq-ft" selected>
                      SQ FT
                    </option>
                    <option value="marla">Marla</option>
                  </select>
                  {/* area selection end  */}
                </div>
                <div className=" flex justify-around items-center mt-2">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm  text-gray-900 dark:text-white w-[20%]">
                    <span className=" flex justify-between items-center">
                      <span className="text-xl sm:text-base">
                        LOCATION&nbsp;
                      </span>
                      <span className=" text-[#2F2F2F]  text-xs">
                        PREFFERED
                      </span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[70%] sm:w-[80%]"
                    placeholder="DHA, Lahore"
                    onChange={e => setLocation2(e.target.value)}
                    required
                  />
                </div>
                <div className=" flex justify-around items-center mt-2 relative">
                  <label
                    htmlFor="budget"
                    className="block mb-2 text-sm  text-gray-900 dark:text-white w-[20%]">
                    <span className=" flex justify-between items-center">
                      <span className="text-xl sm:text-base">
                        BUDEGET RANGE&nbsp;
                      </span>
                      <span className=" text-[#2F2F2F]  text-xs">
                        (IDEAL - MAX){" "}
                      </span>
                    </span>
                  </label>
                  <input
                    type="Number"
                    min="1"
                    id="budget"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[70%] sm:w-[80%]"
                    placeholder="100,000"
                    onChange={e => setMaxBudget(e.target.value)}
                    required
                  />
                  {/* area type selection start  */}
                  <select
                    id="underline_select"
                    className="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer absolute left-[85%] sm:left-[80%] md:left-[80%] lg:left-[80%] border-b-0  p-[0px] sm:w-[57px] w-[90px]"
                    onChange={e => setCurrency(e.target.value)}>
                    <option value="pkr" selected>
                      PKR
                    </option>
                    <option value="USD">American Dollar</option>
                  </select>
                  {/* area selection end  */}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <button
          type="button"
          className={`py-2.5 px-8 me-2 mb-2 text-sm text-white  focus:outline-none ${
            loading ? "bg-white border-gray-800" : "bg-gray-800"
          }  border border-white hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800 dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-white hover:border-gray-800 font-bold my-7`}
          disabled={loading}
          onClick={() =>
            placetype == 1 ? handlealreadyplot() : handlebuyplot()
          }>
          {loading ? (
            <Spinner size={"sm"} className={"border-white"} />
          ) : (
            "Done"
          )}
        </button> */}
        <span className="mt-8">
          <BlackButton
            onclickfunction={placetype == 1 ? handlealreadyplot : handlebuyplot}
            loading={loading}
            text={"Next"}
          />
        </span>
      </div>
    </>
  );
};

export default ProjectDetails;
