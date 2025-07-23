"use client";
import { Suspense } from "react";
import { UserScreenSpinner } from "@/components";

import DesSelStep2Screen0 from "./DesSelStep2Screen0";
import DesSelStep2Screen1 from "./DesSelStep2Screen1";
import DesSelStep2Screen2 from "./DesSelStep2Screen2";
import DesSelStep2Screen3 from "./DesSelStep2Screen3";
import DesSelStep2Screen4 from "./DesSelStep2Screen4";

import DesSelectionStep2Screen5 from "../plot-selection/some_finals";
import DesSelectionStep2Screen6 from "../plot-selection/Plot_info";
import DesSelectionStep2Screen7 from "../plot-selection/unique-homes/level_selection";
import DesSelectionStep2Screen8 from "../plot-selection/unique-homes/unique_homes";

const DesSelStep1Sec = ({
  screen,
  changeStepScreen,
  areas,
  floors,
  familyUnits,
  step2DataFetchError,
}) => {
  // TODO: Show the error message if there is a step2DataFetchError
  return (
    <>
      {screen === "0" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep2Screen0 changeStepScreen={changeStepScreen} />
        </Suspense>
      ) : screen === "1" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep2Screen1
            areas={areas}
            floors={floors}
            familyUnits={familyUnits}
          />
        </Suspense>
      ) : screen === "2" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep2Screen2
            areas={areas}
            floors={floors}
            familyUnits={familyUnits}
          />
        </Suspense>
      ) : screen === "3" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep2Screen3
            areas={areas}
            floors={floors}
            familyUnits={familyUnits}
          />
        </Suspense>
      ) : screen === "4" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep2Screen4
            areas={areas}
            floors={floors}
            familyUnits={familyUnits}
          />
        </Suspense>
      ) : screen === "5" ? (
        <>
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelectionStep2Screen5 />
          </Suspense>
        </>
      ) : screen === "6" ? (
        <>
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelectionStep2Screen6 />
          </Suspense>
        </>
      ) : screen === "7" ? (
        <>
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelectionStep2Screen7 />
          </Suspense>
        </>
      ) : screen === "8" ? (
        <>
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelectionStep2Screen8 />
          </Suspense>
        </>
      ) : null}
    </>
  );
};

export default DesSelStep1Sec;
