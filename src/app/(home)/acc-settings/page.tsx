import { PaymentDetail } from "@/app/_components/PaymentDetail";
import { PersonalInfo } from "@/app/_components/PersonalInfo";
import { SetNewPass } from "@/app/_components/SetNewPass";
import { SuccessPage } from "@/app/_components/SuccessPage";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="w-[650px] flex flex-col items-start gap-8 ml-[75px] ">
      <h3 className="text-[24px] leading-[32px] font-[600] ">My account</h3>
      <PersonalInfo />
      <SetNewPass />
      <PaymentDetail />
      <SuccessPage />
    </div>
  );
};

export default SettingsPage;
