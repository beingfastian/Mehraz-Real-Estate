"use client";
import { Suspense, useState } from "react";
import { UserScreenSpinner, UserProtectedRoute } from "@/components";
import DesSelStep3Screen0 from "../../myprojects/DesSelStep3Screen0";
import Section1 from "../../myprojects/Section1";
import Provide from "../../myprojects/WhatWeProvide";
import InitPayment from "../../myprojects/initialPayment";
import InitPayment2 from "../../myprojects/initialPayment2";
import {
  InitialPayment3,
  InitialPayment4,
  Payment2,
  PaymentAdvance2,
  PaymentFull2,
} from "@/components";

const DesSelStep3Sec = ({
  cities,
  styles,
  step1DataFetchError,
  screen,
  changeStepScreen,
}) => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentType, setPaymentType] = useState(null); // 'all', 'design', 'construction', 'materials', 'furniture'

  return (
    <>
      {screen === "0" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep3Screen0 changeStepScreen={changeStepScreen} />
        </Suspense>
      ) : screen === "1" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <UserProtectedRoute>
            <Section1 />
          </UserProtectedRoute>
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
      ) : screen === "5" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <InitialPayment3 />
        </Suspense>
      ) : screen === "6" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <InitialPayment4
            setPaymentAmount={setPaymentAmount}
            setPaymentType={setPaymentType}
          />
        </Suspense>
      ) : screen === "7" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <Payment2 paymentAmount={paymentAmount} paymentType={paymentType} />
        </Suspense>
      ) : screen === "8" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <PaymentAdvance2 paymentAmount={paymentAmount} />
        </Suspense>
      ) : screen === "9" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <PaymentFull2 paymentAmount={paymentAmount} />
        </Suspense>
      ) : null}
    </>
  );
};

export default DesSelStep3Sec;
