"use client";
import { Suspense } from "react";
import { UserScreenSpinner } from "@/components";

import DesSelStep1Screen0 from "./DesSelStep1Screen0";
import DesSelStep1Screen1 from "./DesSelStep1Screen1";
import DesSelStep1Screen2 from "./DesSelStep1Screen2";

const DesSelStep2Sec = ({
  cities,
  styles,
  step1DataFetchError,
  screen,
  changeStepScreen,
}) => {
  // TODO: Show the error message if there is a step1DataFetchError
  return (
    <>
      {screen === "0" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep1Screen0 changeStepScreen={changeStepScreen} />
        </Suspense>
      ) : screen === "1" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep1Screen1 cities={cities} styles={styles} />
        </Suspense>
      ) : (
        screen === "2" && (
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelStep1Screen2 cities={cities} styles={styles} />
          </Suspense>
        )
      )}
    </>
  );
};

export default DesSelStep2Sec;
