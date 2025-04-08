"use client";

import { useState, useEffect } from "react";
import { FirstStep } from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";
import { Header } from "../_components/Header";
import { useUser } from "../_context/UserContext";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [FirstStep, SecondStep][currentStep];
  const router = useRouter();
  const { users } = useUser()!;
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [currentUserChecked, setCurrentUserChecked] = useState(false);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId"));
    if (users && userId) {
      const foundUser = users.find((user) => user.id === userId);
      if (foundUser) {
        setShouldRedirect(true);
      }
    }
    setCurrentUserChecked(true);
  }, [users]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/");
    }
  }, [shouldRedirect, router]);

  if (!currentUserChecked || shouldRedirect) return null; // redirect хийж байвал хоосон render

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
