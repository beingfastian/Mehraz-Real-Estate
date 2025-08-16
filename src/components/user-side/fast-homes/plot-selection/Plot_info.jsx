import Common_btn from "@/components/common/Btns/Common_btn";
import CustomRadioTile from "@/components/common/CustomRadioTile/Radio_btn";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import useRPS from "@/hooks/useRPS";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/UserContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
import { positivenumbercheck } from "@/components";
import { Spinner } from "@/components";

const Plot_info = () => {
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [plotType, setPlotType] = useState(1);
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("sq-ft");
  const [area, setArea] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [currency, setCurrency] = useState("pkr");
  const [dimensions, setDimensions] = useState({
    width: "",
    length: "",
    width2: "",
    length2: "",
  });

  const { router, pathname, searchParams } = useRPS();
  const categoryName = searchParams.get("category");

  const handlePlotTypeChange = id => {
    setPlotType(id);
    setLocation("");
    setDimensions({
      width: "",
      length: "",
      width2: "",
      length2: "",
    });
    setArea("");
    setUnit("sq-ft");
    setPreferredLocation("");
    setBudgetRange("");
    setCurrency("pkr");
  };

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
        case "unit":
          setUnit(value);
          break;
        case "area":
          setArea(value);
          break;
        case "preferredLocation":
          setPreferredLocation(value);
          break;
        case "budgetRange":
          setBudgetRange(value);
          break;
        case "currency":
          setCurrency(value);
          break;
        default:
          break;
      }
    }
  };

  const handleAlreadyPlotSubmit = () => {
    if (!positivenumbercheck(area)) {
      toast.error("AREA Must be Positive Number");
      return;
    }
    if (area && !unit && location) {
      toast.error("Please Select the Area Unit");
      return;
    }
    if (!area || !unit || !location) {
      toast.error("Please Fill All required Fields");
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 7);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleBuyPlotSubmit = async () => {
    try {
      // if (!auth?.user) {
      //   toast.error("Please Login to continue");
      //   return;
      // }
      if ((area && !unit) || (!currency && preferredLocation && budgetRange)) {
        toast.error("Please Select the Units");
        return;
      }
      if (!area || !unit || !preferredLocation || !currency || !budgetRange) {
        toast.error("Please Fill All required Fields");
        return;
      }

      setLoading(true);
      await addDoc(collection(db, "plotRequests"), {
        plotType: "buy",
        area,
        unit,
        location: preferredLocation,
        currency,
        budget: budgetRange,
        user: auth.user,
        reviewed: false,
        createdAt: Date.now(),
        category: categoryName,
      });

      setLoading(false);
      toast.success(
        "Request sent to Admin! Our team will reach out to you soon.",
      );

      const newParams = new URLSearchParams(searchParams);
      newParams.set("screen", 7);
      router.push(`${pathname}?${newParams.toString()}`);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const submitHandler = () => {
    if (plotType === 1) {
      handleAlreadyPlotSubmit();
    } else {
      handleBuyPlotSubmit();
    }
  };

  return (
    <PageWrapper>
      <div className="plot_cotainer plot_container_max_width relative">
        {/* Back button */}
        <button
          className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn absolute top-0 left-0 z-10"
          onClick={e => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("screen", 5);
            router.push(`${pathname}?${newParams.toString()}`);
          }}>
          <FaChevronLeft size={24} className="w-6 h-auto" />
        </button>

        <div className="relative translate-y-1/4 max-w-[366px] sm:max-w-[170px] w-full mx-auto rounded-full bg-accent-black">
          <p className="extra-large text-center text-white">
            <span className="bold">PLOT </span>
            <span>INFO</span>
          </p>
        </div>

        <div className="f-col gap-2 md:gap-1.5 sm:gap-1 mt-8">
          <CustomRadioTile
            title={"already have a plot"}
            id={1}
            checked={plotType === 1}
            onChange={() => handlePlotTypeChange(1)}
          />

          {plotType === 1 && (
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
            checked={plotType === 2}
            onChange={() => handlePlotTypeChange(2)}
          />

          {plotType === 2 && (
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
                  htmlFor="area"
                  className="buy_plot_form_lable !justify-normal">
                  AREA <span className="text-danger">*</span>
                </label>
                <div className="buy_plot_form_input">
                  <input
                    type="number"
                    min="1"
                    className="buy_plot_form_input_input"
                    placeholder="50"
                    name="area"
                    value={area}
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
                <label
                  htmlFor="preferredLocation"
                  className="buy_plot_form_lable">
                  Location
                  <span className="buy_plot_form_lable_span">PREFERRED</span>
                </label>
                <div className="buy_plot_form_input">
                  <input
                    type="text"
                    className="buy_plot_form_input_input placeholder:uppercase"
                    placeholder="DHA, Lahore"
                    name="preferredLocation"
                    value={preferredLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="buy_plot_field_container">
                <label htmlFor="budgetRange" className="buy_plot_form_lable">
                  Budget range
                  <span className="buy_plot_form_lable_span">(ideal-max)</span>
                </label>
                <div className="buy_plot_form_input">
                  <input
                    type="number"
                    min="1"
                    className="buy_plot_form_input_input placeholder:uppercase"
                    placeholder="100,000"
                    name="budgetRange"
                    value={budgetRange}
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
          handler={submitHandler}
          disabled={loading}
        />
      </div>
    </PageWrapper>
  );
};

export default Plot_info;
