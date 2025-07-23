"use client";

import { Suspense } from "react";
import { UserScreenSpinner } from "@/components";
import useRPS from "@/hooks/useRPS";

import DesSelStep0 from "./DesSelStep0";
import DesSelStep1Sec from "./DesSelStep1Sec";
import DesSelStep2Sec from "./DesSelStep2Sec";
import DesSelStep3Sec from "./DesSelStep3Sec";

const DesSelClientPage = ({
  cities,
  styles,
  step1DataFetchError,
  areas,
  floors,
  familyUnits,
  step2DataFetchError,
}) => {
  const { router, pathname, searchParams } = useRPS();

  const step = searchParams.get("step");
  const screen = searchParams.get("screen");

  const changeStepScreen = (newStep, newScreen) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newStep) newSearchParams.set("step", newStep);
    if (newScreen) newSearchParams.set("screen", newScreen);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const renderStepComponent = () => {
    switch (step) {
      case "0":
        if (screen === "0") {
          return (
            <DesSelStep0 nextStepHandler={() => changeStepScreen("1", "0")} />
          );
        }
        break;
      case "1":
        return (
          <DesSelStep1Sec
            screen={screen}
            changeStepScreen={changeStepScreen}
            cities={cities}
            styles={styles}
            step1DataFetchError={step1DataFetchError}
          />
        );
      case "2":
        return (
          <DesSelStep2Sec
            screen={screen}
            changeStepScreen={changeStepScreen}
            areas={areas}
            floors={floors}
            familyUnits={familyUnits}
            step2DataFetchError={step2DataFetchError}
          />
        );
      case "3":
        return (
          <DesSelStep3Sec
            screen={screen}
            changeStepScreen={changeStepScreen}
            areas={areas}
            floors={floors}
            familyUnits={familyUnits}
            step2DataFetchError={step2DataFetchError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<UserScreenSpinner />}>
      {renderStepComponent()}
    </Suspense>
  );
};

export default DesSelClientPage;
