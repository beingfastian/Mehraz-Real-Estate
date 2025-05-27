"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import DesignPreference from "./DesignPreference";
import { toast } from "react-toastify";
import { db, storage } from "@/Firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "@/context/UserContext";
import BlackButton from "../BlackButton";
import DesSelStep1Screen1InputBox from "../fast-homes/design-selection/DesSelStep1Screen1InputBox";
import DesSelStep1StylesModal from "../fast-homes/design-selection/DesSelStep1StylesModal";
import getStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";
import StyleCarousel from "@/components/StyleCarousel";
import { usePathname } from "next/navigation";

const SpecificDetail = ({
  setStep,
  hightcustomdetail,
  setHighCustomDetail,
}) => {
  const pathname = usePathname();
  let [styles, setStyles] = useState([]);
  let step1DataFetchError = null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const fileInputRef = useRef(null);
  const router = useRouter();
  const [floors, setFloors] = useState("");
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("");
  const [familyUnit, setFamilyUnit] = useState("");
  const [textarea, setTextarea] = useState("");
  const [currency, setCurrency] = useState("pkr");
  const [file, setFile] = useState(null);
  const [styleCost, setStyleCost] = useState("");
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    // Fetch styles data
    getStylesFromDB(["id", "name", "budget", "image"])
      .then(stylesResult => {
        if (isMounted) {
          setStyles(stylesResult);
        }
      })
      .catch(e => {
        step1DataFetchError =
          "An error occurred while fetching data. Please refresh the page.";
        toast.error("Error During Style Loading. Please Reload!");
      });
    setLoading(false);
    // Cleanup function to avoid setting state after unmount
    return () => {
      isMounted = false;
    };
  }, []);
  // get style from db end

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(prevState => !prevState);
      return;
    }
    if (budget == "") {
      toast.error("Please Select Your Budget First!");
      return;
    } else if (budget < 2500000) {
      // styleCost = "LOW";
      setStyleCost("LOW");
    } else if (budget > 2500000 && budget < 5000000) {
      // styleCost = "MEDIUM";
      setStyleCost("MEDIUM");
    } else if (budget > 5000000) {
      // styleCost = "HIGH";
      setStyleCost("HIGH");
    }
    setIsModalOpen(prevState => !prevState);
  };
  // Handle submit function
  const handleSubmit = async () => {
    try {
      if (!auth.user) {
        toast.error("Please Login to countinue");
        return;
      }
      console.log(floors, budget, style, familyUnit, textarea);
      if (
        floors &&
        budget &&
        style &&
        familyUnit &&
        textarea &&
        file &&
        currency
      ) {
        if (!file) return;
        setLoading(true);
        // Generate a unique file name using Date.now()
        const uniqueFileName = `${Date.now()}_${file.name}`;
        // Reference to the storage where the file will be uploaded
        const storageRef = ref(storage, `uploads/highcustom/${uniqueFileName}`);

        try {
          // Upload the file to Firebase Storage
          const uploadResult = await uploadBytes(storageRef, file);
          // Get the download URL after upload is complete
          const downloadURL = await getDownloadURL(uploadResult.ref);
          if (pathname == "/buy-property") {
            handleBuyProperty(downloadURL, uniqueFileName);
            setLoading(false);
            return;
          }
          // Now store the download URL and other data to Firestore
          const docRef = await addDoc(collection(db, "highcustom"), {
            ...hightcustomdetail,
            DesignPreference: {
              floors,
              budget,
              currency: currency,
              style,
              familyUnit,
              textarea,
              reviewed: false,
              referencefile: {
                fileName: uniqueFileName,
                fileURL: downloadURL,
                uploadedAt: new Date(),
              },
            },
            user: auth.user,
            createdAt: Date.now(),
          });
          toast.success("Form Submited Successully!");
          setLoading(false);
          router.push('/');
          return;
        } catch (error) {
          toast.error("Error uploading file or storing data: ", error);
          setLoading(false);
        }
      } else {
        toast.error("Please Fill All required Fields!");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleBuyProperty = async (downloadURL, uniqueFileName) => {
    try {
      console.log("high custom detail is in buy property form submission!", {
        ...hightcustomdetail,
        DesignPreference: {
          floors,
          budget,
          currency: currency,
          style,
          familyUnit,
          textarea,
          reviewed: false,
          referencefile: {
            fileName: uniqueFileName,
            fileURL: downloadURL,
            uploadedAt: new Date(),
          },
        },
        user: auth.user,
        createdAt: Date.now(),
      });

      const docRef = await addDoc(collection(db, "buy-property"), {
        ...hightcustomdetail,
        DesignPreference: {
          floors,
          budget,
          currency: currency,
          style,
          familyUnit,
          textarea,
          reviewed: false,
          referencefile: {
            fileName: uniqueFileName,
            fileURL: downloadURL,
            uploadedAt: new Date(),
          },
        },
        user: auth.user,
        createdAt: Date.now(),
      });
      toast.success("Form Submited Successully!");
      setLoading(false);
      return;
    } catch (error) {
      toast.error("Error uploading file or storing data: ", error);
      setLoading(false);
    }
  };
  const handlestyle = (key, value, name) => {
    setStyle(name);
    console.log("key: ", key, "- value: ", value);
    setHighCustomDetail(prevState => ({
      ...prevState,
      style: value,
    }));
  };
  const handleButtonClick = () => {
    if (file) {
      setFile(null);
      return;
    }
    fileInputRef.current.click();
  };
  const handleFileChange = event => {
    const tempfile = event.target.files[0];

    if (tempfile) {
      setFile(tempfile);
      // console.log("Selected file:", file.name);
    }
  };

  return (
    <>
      {/* back button  */}
      <button
        className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn sm:absolute sm:top-14 sm:left-1 sm:z-10 md:absolute md:top-20 md:left-1 md:z-10 absolute cursor-pointer z-50"
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
        <h1 className="px-5 w-[50%] sm:w-[90%] text-center text-2xl my-4 sm:text-sm md:text-base">
          <span className="font-bold">TELL US A LITTLE MORE </span> <br />
          SO WE CREATE PERFECT DESIGN FOR YOU
        </h1>
        <div className="container1 w-[80%] md:w-[90%] sm:w-full flex flex-col items-center">
          {/* card start */}
          <div className="block p-6 sm:px-[4px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-[100%]">
            <h1 className="text-xl font-bold text-center">
              DESIGN PREFERENCES
              <span className="text-sm font-normal">(optional)</span>
            </h1>
            <div className="flex md:flex-col lg:flex-col">
              <div className="w-[50%] md:w-[100%] lg:w-[100%]">
                <div>
                  <div className="w-full mb-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 relative border rounded-xl overflow-hidden border-[#2F2F2F]">
                    <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                      <textarea
                        id="editor"
                        rows="8"
                        value={textarea}
                        onChange={e => setTextarea(e.target.value)}
                        className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 !outline-none"
                        placeholder={"Your Aspirations, Goals, Needs, Planned Imagination For your Project...".toUpperCase()}
                        required></textarea>
                    </div>
                    <div className="flex bg-[#BD9F4B] items-center justify-between px-3 py-2 border-b dark:border-gray-600 relative top-[1px]">
                      <span className="text-white text-sm w-[70%]">
                        {file ? (
                          file?.name
                        ) : (
                          <>
                            REFERENCE{" "}
                            <span className="font-bold">FILE /IMG</span> (MAX
                            LIMIT 1MP)
                          </>
                        )}
                      </span>
                      <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600 w-[30%] justify-end">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                          <input
                            type="file"
                            id="refernce-file"
                            ref={fileInputRef}
                            className=" hidden"
                            accept=".pdf,.txt,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                          />
                          <button
                            onClick={handleButtonClick}
                            type="button"
                            htmlFor="refernce-file"
                            className="p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 bg-white text-sm flex">
                            {file ? "REMOVE" : "ATTACH"}
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 20">
                              <path
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                              />
                            </svg>
                            {/* <span className="sr-only">Attach file</span> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[50%] md:w-[100%] lg:w-[100%]">
                <div className="flex justify-around items-center">
                  <label
                    htmlFor="area"
                    className="block mb-2 text-gray-900 dark:text-white w-[20%] text-xl sm:text-sm">
                    FLOORS
                  </label>
                  <input
                    type="number"
                    id="area"
                    value={floors}
                    onChange={e => setFloors(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[60%] sm:w-[80%]"
                    placeholder="Enter floors"
                    required
                  />
                </div>
                <div className="flex justify-around items-center mt-2">
                  <label
                    htmlFor="budget"
                    className="block mb-2 text-sm text-gray-900 dark:text-white w-[20%]">
                    <span classNa me="text-xl sm:text-sm">
                      BUDGET
                    </span>
                  </label>
                  <div className="w-[60%] sm:w-[80%] flex relative">
                    <input
                      type="number"
                      id="budget"
                      onChange={e => setBudget(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[80%] sm:w-[80%] flex-grow"
                      value={budget}
                      placeholder="Enter budget"
                      required
                    />
                    <select
                      id="underline_select"
                      className="block py-2.5 px-0 !pr-0 text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer absolute left-[80%] sm:left-[80%] md:left-[80%] lg:left-[80%] border-b-0 sm:w-[57px] w-[50px]"
                      onChange={e => setCurrency(e.target.value)}
                      value={currency}>
                      <option value="pkr">PKR</option>
                      <option value="USD">American Dollar</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-around items-center mt-2">
                  <label
                    htmlFor="style"
                    className="block mb-2 text-sm text-gray-900 dark:text-white w-[20%]">
                    <span className="text-xl sm:text-sm">STYLE</span>
                  </label>
                  <span className=" text-gray-900 text-sm w-[60%] sm:w-[80%] flex justify-center items-center">
                    {/* <DesSelStep1Screen1InputBox label={""}> */}
                    <button
                      onClick={toggleModal}
                      className="text-2xl xl:text-xl py-3 sm:py-2 px-12 sm:px-6 bg-[#8D8E97] rounded-full uppercase text-white shadow-btn font-bold border-2 border-white border-opacity-60 transition-colors duration-300 hover:bg-white hover:text-[#000000a6] hover:border-[#000000a6]">
                      {style == "" ? "CHOOSE" : style}
                      {/* CHOOSE */}
                    </button>
                    {/* {step1Screen2FormData.style === ""
                ? "styles"
                : styles.find(style => style.id === step1Screen2FormData.style)
                .name} */}
                    {/* </DesSelStep1Screen1InputBox> */}
                  </span>
                  {/* <input
                    type="text"
                    id="style"
                    value={style}
                    onChange={e => setStyle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[60%] sm:w-[80%]"
                    placeholder="Enter style"
                    required
                  /> */}
                </div>
                <div className="flex justify-around items-center mt-2">
                  <label
                    className="block mb-2 text-sm text-gray-900 dark:text-white w-[20%]"
                    htmlFor="familyUnit">
                    <span className="text-xl sm:text-sm">FAMILY UNIT</span>
                    <div className="text-[#6F6F6F] md:text-xxs sm:text:xxxs">
                      (APPLIED TO RESIDENTIAL)
                    </div>
                  </label>
                  <input
                    type="text"
                    id="familyUnit"
                    value={familyUnit}
                    onChange={e => setFamilyUnit(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[60%] sm:w-[80%]"
                    placeholder="Enter family unit"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="mt-8">
          <BlackButton
            onclickfunction={handleSubmit}
            loading={loading}
            text={"Get Quote".toUpperCase()}
          />
        </span>
        {/* <button
          type="button"
          className="py-2.5 px-8 me-2 mb-2 text-sm text-white  focus:outline-none bg-gray-800  border border-white hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-800 dark:border-gray-800 dark:hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-white hover:border-gray-800 font-bold mt-1"
          onClick={handleSubmit}>
          Done
        </button> */}
      </div>
      {!loading && isModalOpen && (
        <StyleCarousel
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          styles={styles}
          step1Screen2FormDataInputHandler={handlestyle}
          styleCost={styleCost}
        />
        // styleCost={step1Screen2FormData.styleCost}
      )}
    </>
  );
};

export default SpecificDetail;
