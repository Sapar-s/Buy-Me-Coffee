"use client";

import { useState } from "react";
import FirstStep from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const FormSteps = [FirstStep, SecondStep][currentStep];
  return (
    <div>
      <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default SignUpPage;
