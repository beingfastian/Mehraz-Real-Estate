"use client";
import { Suspense } from "react";
import { UserScreenSpinner } from "@/components";

import DesSelStep3Screen0 from "../../myprojects/DesSelStep3Screen0";
import Section1 from "../../myprojects/Section1";
import Provide from "../../myprojects/WhatWeProvide";
import InitPayment from "../../myprojects/initialPayment";
import InitPayment2 from "../../myprojects/initialPayment2";

const DesSelStep3Sec = ({
  cities,
  styles,
  step1DataFetchError,
  screen,
  changeStepScreen,
}) => {
  return (
    <>
      {screen === "0" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep3Screen0 changeStepScreen={changeStepScreen} />
        </Suspense>
      ) : screen === "1" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <Section1 />
        </Suspense>
      ) : screen === "2" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <Provide />
        </Suspense>
      ) : screen === "3" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <InitPayment />
        </Suspense>
      ) : screen === "4" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <InitPayment2 />
        </Suspense>
      ) : null}
    </>
  );
};

export default DesSelStep3Sec;
