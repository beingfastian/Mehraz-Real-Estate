"use client";
import { lazy, Suspense } from "react";
import { UserScreenSpinner } from "@/components";

const DesSelStep2Screen0 = lazy(() => import("./DesSelStep2Screen0"));
const DesSelStep2Screen1 = lazy(() => import("./DesSelStep2Screen1"));
const DesSelStep2Screen2 = lazy(() => import("./DesSelStep2Screen2"));
const DesSelStep2Screen3 = lazy(() => import("./DesSelStep2Screen3"));
const DesSelectionStep2Screen4 = lazy(() =>
  import("../plot-selection/some_finals"),
);
const DesSelectionStep2Screen5 = lazy(() =>
  import("../plot-selection/Plot_info"),
);
const DesSelectionStep2Screen6 = lazy(() =>
  import("../plot-selection/unique-homes/level_selection"),
);
const DesSelectionStep2Screen7 = lazy(() =>
  import("../plot-selection/unique-homes/unique_homes"),
);

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
        <>
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelectionStep2Screen4 />
          </Suspense>
        </>
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
      ) : null}
    </>
  );
};

export default DesSelStep1Sec;
