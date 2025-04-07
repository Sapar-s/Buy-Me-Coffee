"use client";

import { useState } from "react";
import { FirstStep } from "./components/FirstStep";
import { SecondStep } from "./components/SecondStep";
import { Header } from "../_components/Header";
import { useUser } from "../_context/UserContext";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const FormSteps = [FirstStep, SecondStep][currentStep];
  const router = useRouter();
  const { users } = useUser();
  const userId = localStorage.getItem("userId");
  return (
    <>
      {users?.map((user) => {
        return user.id == userId ? (
          router.push("/")
        ) : (
          <div key={user.id}>
            <Header />
            <div className="w-screen flex justify-center  mt-[91px]">
              <FormSteps
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProfilePage;
