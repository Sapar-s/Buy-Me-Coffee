"use client";

import { useState } from "react";
import { FirstStep } from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";
import { Header } from "../_components/Header";

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [FirstStep, SecondStep][currentStep];

  return (
    <>
      <Header />
      <div className="w-screen flex justify-center mt-[91px]">
        <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </>
  );
};

export default ProfilePage;
