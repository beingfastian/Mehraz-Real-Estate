"use client";
import BackBtn from "@/components/backBtn";
import React, { useCallback, useState } from "react";
import Detail_RadioBtn from "./component/Detail_RadioBtn";
import useRPS from "@/hooks/useRPS";
import Common_btn from "@/components/common/Btns/Common_btn";

const SomeFinals = () => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(false);
  const { router, pathname, searchParams } = useRPS();
  // const selectChangeHandler = useCallback(e => {
  //   setSelected(e.target.id);
  //   setError(false);
  // }, []);

  const submitHandler = () => {
    if (!selected) {
      setError(true);
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 5);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const selectChangeHandler = useCallback(id => {
    setSelected(id);
    setError(false);
  }, []);
  return (
    <div className="bg-white container relative page-top-padding plot_cotainer">
      <div className="relative w-full">
        <div className="absolute top-0 left-0">
          <BackBtn />
        </div>
        <h1 className="extra-large light-primary-clr uppercase text-center font-thin pt-1">
          some finals
        </h1>
      </div>
      <div className="plot_container_max_width plot_cotainer">
        <Detail_RadioBtn
          main_title="Plot for Construction"
          subtitle={
            <p className="radial_strip_lable_info_text">
              <span>provide PLOT </span>
              <span className="font-bold">info</span>
              <span> / </span>
              <span className="font-bold">buy</span>
              <span> plot</span>
            </p>
          }
          id={"first"}
          onChange={() => selectChangeHandler("first")}
          checked={selected === "first"}
        />

        <Detail_RadioBtn
          main_title="Personalize Your Design"
          id={"second"}
          subtitle={
            <p className="radial_strip_lable_info_text">
              <span>tell us </span>
              <span className="font-bold">any changes you need</span>
            </p>
          }
          onChange={() => selectChangeHandler("second")}
          checked={selected === "second"}
        />
        {error && (
          <p className="text-red-500 text-center">Please select an option</p>
        )}
        <div className=" relative w-full f-col gap-2">
          <Common_btn text={"let's go"} handler={submitHandler} />
          <p className="absolute md:relative right-0  top-1/2 text-center -translate-y-1/2 md:top-auto md:translate-y-0 skip-btn">
            SKIP?
          </p>
        </div>
      </div>
    </div>
  );
};

export default SomeFinals;
