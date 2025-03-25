"use client";

import { useState } from "react";
import { FirstStep } from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";
import { Header } from "../_components/Header";

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const FormSteps = [FirstStep, SecondStep][currentStep];
  return (
    <div>
      <Header />
      <div className="w-screen flex justify-center  mt-[91px]">
        <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
  );
};

export default ProfilePage;
