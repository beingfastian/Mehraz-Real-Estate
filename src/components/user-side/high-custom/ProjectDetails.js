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
import Common_btn from "@/components/common/Btns/Common_btn";
import CustomRadioTile from "@/components/common/CustomRadioTile/Radio_btn";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";

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
  const [unit, setUnit] = useState("sq-ft");
  const [currency, setCurrency] = useState("pkr");
  const [requirement, setRequirement] = useState("");
  const [placetype, setPlaceType] = useState(1);
  const [dimensions, setDimensions] = useState({
    width: "",
    length: "",
    width2: "",
    length2: "",
  });

  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");
  const router = useRouter();

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

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name.includes("dimension")) {
      setDimensions(prevDimensions => ({
        ...prevDimensions,
        [name.split(".")[1]]: value,
      }));
    } else {
      switch (name) {
        case "location":
          setLocation(value);
          break;
        case "location2":
          setLocation2(value);
          break;
        case "unit":
          setUnit(value);
          break;
        case "area":
          setArea(value);
          break;
        case "area2":
          setArea2(value);
          break;
        case "currency":
          setCurrency(value);
          break;
        case "maxBudget":
          setMaxBudget(value);
          break;
        default:
          break;
      }
    }
  };

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
    setStep(prev => prev + 1);
  }

  async function handlebuyplot() {
    try {
      // if (!auth.user) {
      //   toast.error("Please Login to countinue");
      //   return;
      // }
      if ((area2 && !unit) || (!currency && location2 && maxBudget)) {
        toast.error("Please Select the Units");
        return;
      }
      if (!area2 || !unit || !location2 || !currency || !maxBudget) {
        toast.error("please Fill All required Fields");
        return;
      }
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
      setLoading(false);
      toast.success("Detail send to Admin MEHRAZ TEAM will Reach You!");
      setStep(prev => prev + 1);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <PageWrapper>
      <div className="plot_cotainer plot_container_max_width relative">
        {/* Back button */}
        <button
          className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn absolute top-0 left-0 z-10"
          onClick={e => {
            setStep(prev => prev - 1);
          }}>
          <FaChevronLeft size={24} className="w-6 h-auto" />
        </button>

        <div className="relative translate-y-1/4 max-w-[366px] sm:max-w-[170px] w-full mx-auto rounded-full bg-accent-black">
          <p className="extra-large text-center text-white">
            <span className="bold">PROJECT </span>
            <span>DETAILS</span>
          </p>
        </div>

        <div className="f-col gap-2 md:gap-1.5 sm:gap-1 mt-8">
          <CustomRadioTile
            title={"already have a plot"}
            id={1}
            checked={placetype === 1}
            onChange={() => handleprocesschange(1)}
          />

          {placetype === 1 && (
            <form className="plot_type_detail_container px-12 lg:px-8 md:px-6 sm:px-4 py-6 lg:py-5 md:py-4 sm:py-3">
              <div className="plot_detail_field_container">
                <p className="plot_detail_input_lable mr-6">
                  LOCATION <span className="text-danger">*</span>
                </p>
                <div className="plot_detail_input_container">
                  <input
                    className="plot_detail_input"
                    placeholder="DHA, Lahore"
                    name="location"
                    value={location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="plot_detail_field_container">
                <div className="f-col md:flex-row md:!justify-between md:items-center w-auto md:w-full gap-1 flex-wrap mr-6">
                  <p className="plot_detail_input_lable">
                    AREA <span className="text-danger">*</span>
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="base-text text-center text-accent-black">
                      UNIT
                    </p>
                    <div className="w-[97px] h-[30px] flex items-center justify-center rounded-[5px] border border-black/60 overflow-hidden">
                      <select
                        className="w-full h-full bg-transparent p-0 text-center text-black/60 bold outline-none cursor-pointer focus:border-black/60 focus:ring-0"
                        name="unit"
                        value={unit}
                        onChange={handleInputChange}
                        required>
                        <option value="sq-ft">SQ FT</option>
                        <option value="marla">Marla</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="plot_detail_input_container w-full">
                  <input
                    type="number"
                    min="1"
                    className="plot_detail_input"
                    placeholder="50"
                    name="area"
                    value={area}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="w-8/12 h-[1px] bg-accent-black mx-auto flex-center">
          <span className="base-text font-light text-accent-black uppercase bg-white px-2 md:px-1.5 sm:px-1 text-center">
            or
          </span>
        </div>

        <div className="f-col gap-2">
          <CustomRadioTile
            title={"buy plot"}
            isInfo={true}
            id={2}
            checked={placetype === 2}
            onChange={() => handleprocesschange(2)}
          />

          {placetype === 2 && (
            <form className="plot_type_detail_container max-w-[968px] mx-auto px-[3.8125rem] lg:px-[2.5rem] md:px-[1.875rem] sm:px-[1.25rem] py-6 lg:py-5 md:py-4 sm:py-3">
              <p className="text-xl lg:text-lg md:text-base sm:text-sm text-center uppercase text-accent-black/60">
                <span>tell your needs . get your </span>
                <span className="bold">personal agent</span>
                &nbsp;
                <span className="bold">&#x26;</span>
                &nbsp;
                <span className="bold">consultATION</span>
              </p>

              <div className="buy_plot_field_container">
                <label
                  htmlFor="area2"
                  className="buy_plot_form_lable !justify-normal">
                  AREA <span className="text-danger">*</span>
                </label>
                <div className="buy_plot_form_input">
                  <input
                    type="number"
                    min="1"
                    className="buy_plot_form_input_input"
                    placeholder="50"
                    name="area2"
                    value={area2}
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    className="appearance-none bg-transparent border border-transparent text-base bold text-accent-black py-2 px-4 rounded-r-lg leading-tight no-outline uppercase"
                    name="unit"
                    value={unit}
                    onChange={handleInputChange}
                    required>
                    <option value="sq-ft">SQ FT</option>
                    <option value="marla">Marla</option>
                  </select>
                </div>
              </div>

              <div className="buy_plot_field_container">
                <label htmlFor="location2" className="buy_plot_form_lable">
                  Location
                  <span className="buy_plot_form_lable_span">PREFERRED</span>
                </label>
                <div className="buy_plot_form_input">
                  <input
                    type="text"
                    className="buy_plot_form_input_input placeholder:uppercase"
                    placeholder="DHA, Lahore"
                    name="location2"
                    value={location2}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="buy_plot_field_container">
                <label htmlFor="maxBudget" className="buy_plot_form_lable">
                  Budget range
                  <span className="buy_plot_form_lable_span">(ideal-max)</span>
                </label>
                <div className="buy_plot_form_input">
                  <input
                    type="number"
                    min="1"
                    className="buy_plot_form_input_input placeholder:uppercase"
                    placeholder="100,000"
                    name="maxBudget"
                    value={maxBudget}
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    className="appearance-none bg-transparent border border-transparent text-base bold text-accent-black py-2 px-4 rounded-r-lg leading-tight no-outline uppercase"
                    name="currency"
                    value={currency}
                    onChange={handleInputChange}
                    required>
                    <option value="pkr">PKR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </form>
          )}
        </div>

        <Common_btn
          text={
            loading ? (
              <Spinner size={"sm"} className={"border-white"} />
            ) : (
              "Done"
            )
          }
          handler={placetype === 1 ? handlealreadyplot : handlebuyplot}
          disabled={loading}
        />
      </div>
    </PageWrapper>
  );
};

export default ProjectDetails;
