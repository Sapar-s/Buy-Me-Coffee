"use client";

import { useState } from "react";
import FirstStep from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const FormSteps = [FirstStep, SecondStep][currentStep];
  const [username, setUserName] = useState<string | null>(null);
  const signUp = async (email: string, password: string) => {
    try {
      await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      router.push("/login");
    } catch (error) {
      console.log("error", error);
      alert("error in signup user");
    }
  };

  return (
    <div>
      <FormSteps
        signUp={signUp}
        setUserName={setUserName}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

export default SignUpPage;
