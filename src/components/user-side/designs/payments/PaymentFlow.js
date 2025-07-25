"use client";
import React, { useState } from "react";
import { InitialPayment3, InitialPayment4 } from "@/components";

const PaymentFlow = () => {
  const [step, setStep] = useState(1);

  const steps = {
    1: <InitialPayment3 setStep={setStep} />,
    2: <InitialPayment4 setStep={setStep} />,
    // 3: <FutureStep setStep={setStep} />,
  };

  return (
    <div className="min-h-full w-full flex flex-col">
      {steps[step] || <div className="text-center p-8">Invalid step</div>}
    </div>
  );
};

export default PaymentFlow;
