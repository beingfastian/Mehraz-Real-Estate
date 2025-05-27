import Common_btn from "@/components/common/Btns/Common_btn";
import CustomRadioTile from "@/components/common/CustomRadioTile/Radio_btn";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import useRPS from "@/hooks/useRPS";
import React, { useState } from "react";

const Plot_info = () => {
  const [plotType, setPlotType] = useState(1);
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("feet");
  const [dimensions, setDimensions] = useState({
    width: "",
    length: "",
    width2: "",
    length2: "",
  });
  const [area, setArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("sq-ft");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const { router, pathname, searchParams } = useRPS();
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
    setAreaUnit("sq-ft");
    setPreferredLocation("");
    setBudgetRange("");
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
        case "areaUnit":
          setAreaUnit(value);
          break;
        case "preferredLocation":
          setPreferredLocation(value);
          break;
        case "budgetRange":
          setBudgetRange(value);
          break;
        default:
          break;
      }
    }
  };

  const submitHandler = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 6);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <PageWrapper>
      <div className="plot_cotainer plot_container_max_width">
        <div className="relative translate-y-1/4 max-w-[366px] sm:max-w-[170px] w-full mx-auto rounded-full bg-accent-black">
          <p className="extra-large text-center text-white">
            <span className="bold">PLOT </span>
            <span>INFO</span>
          </p>
        </div>
        <div className="f-col gap-2 md:gap-1.5 sm:gap-1">
          <CustomRadioTile
            title={"already have a plot"}
            id={1}
            checked={plotType === 1}
            onChange={() => handlePlotTypeChange(1)}
          />
          {plotType === 1 && (
            <form className="plot_type_detail_container px-12 lg:px-8 md:px-6 sm:px-4 py-6 lg:py-5 md:py-4 sm:py-3">
              <div className="plot_detail_field_container">
                <p className="plot_detail_input_lable">LOCATION</p>
                <div className="plot_detail_input_container">
                  <input
                    className="plot_detail_input"
                    placeholder="341'543'3243'232'324'4"
                    name="location"
                    value={location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="plot_detail_field_container">
                <div className="f-col md:flex-row md:!justify-between md:items-center w-auto md:w-full gap-1 flex-wrap">
                  <p className="plot_detail_input_lable">dimension</p>
                  <div className="flex items-center gap-1">
                    <p className="base-text text-center text-accent-black">
                      UNIT
                    </p>

                    <div className="w-[97px] h-[30px] flex items-center justify-center rounded-[5px] border border-black/60 overflow-hidden">
                      <select
                        className="w-full h-full bg-transparent p-0 text-center text-black/60 bold outline-none cursor-pointer focus:border-black/60 focus:ring-0"
                        name="unit"
                        value={unit}
                        onChange={handleInputChange}>
                        <option value="feet">FEET</option>
                        <option value="meters">METERS</option>
                        <option value="yards">YARDS</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="plot_detail_input_container w-full">
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-2 place-items-center sm:gap-0 sm:gap-y-3 ">
                    <div className="f-col gap-2 sm:w-[80%]">
                      <label
                        htmlFor="dimension.width"
                        className="plot_detail_input__sub_label">
                        width
                      </label>
                      <input
                        className="plot_detail_input"
                        name="dimension.width"
                        value={dimensions.width}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="f-col gap-2 sm:w-[80%]">
                      <label
                        htmlFor="dimension.length"
                        className="plot_detail_input__sub_label">
                        length
                      </label>
                      <input
                        className="plot_detail_input"
                        name="dimension.length"
                        value={dimensions.length}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="f-col gap-2 sm:w-[80%]">
                      <label
                        htmlFor="dimension.width2"
                        className="plot_detail_input__sub_label">
                        width 2
                      </label>
                      <input
                        className="plot_detail_input"
                        name="dimension.width2"
                        value={dimensions.width2}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="f-col gap-2 sm:w-[80%]">
                      <label
                        htmlFor="dimension.length2"
                        className="plot_detail_input__sub_label">
                        length 2
                      </label>
                      <input
                        className="plot_detail_input"
                        name="dimension.length2"
                        value={dimensions.length2}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
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
                    type="text"
                    className="buy_plot_form_input_input"
                    placeholder="Auto-Filled"
                    name="area"
                    value={area}
                    onChange={handleInputChange}
                  />
                  <select
                    className="appearance-none bg-transparent border border-transparent text-base bold text-accent-black py-2 px-4 rounded-r-lg leading-tight no-outline uppercase"
                    name="areaUnit"
                    value={areaUnit}
                    onChange={handleInputChange}>
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
                    placeholder="Enter"
                    name="preferredLocation"
                    value={preferredLocation}
                    onChange={handleInputChange}
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
                    type="text"
                    className="buy_plot_form_input_input placeholder:uppercase"
                    placeholder="Enter"
                    name="budgetRange"
                    value={budgetRange}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        <Common_btn text={"done"} handler={submitHandler} />
      </div>
    </PageWrapper>
  );
};

export default Plot_info;
