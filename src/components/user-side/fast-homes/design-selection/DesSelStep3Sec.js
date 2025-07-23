"use client";
import { Suspense } from "react";
import { UserScreenSpinner } from "@/components";

import DesSelStep3Screen0 from "../../myprojects/DesSelStep3Screen0";
import Section1 from "../../myprojects/Section1";

const DesSelStep3Sec = ({
  cities,
  styles,
  step1DataFetchError,
  screen,
  changeStepScreen,
}) => {
  // TODO: Show the error message if there is a step1DataFetchError
  return (
    <>
      {
        screen === "0" ? (
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelStep3Screen0 changeStepScreen={changeStepScreen} />
          </Suspense>
        ) : screen === "1" ? (
          <Suspense fallback={<UserScreenSpinner />}>
            <Section1 />
          </Suspense>
        ) : null
        // (
        //   screen === "2" && (
        //     <Suspense fallback={<UserScreenSpinner />}>
        //       <DesSelStep1Screen2 cities={cities} styles={styles} />
        //     </Suspense>
        //   )
        // )
      }
    </>
  );
};

export default DesSelStep3Sec;
