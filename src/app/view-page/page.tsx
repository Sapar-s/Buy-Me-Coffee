import React from "react";
import { PersonalPage } from "../_components/PersonalPage";
import { DashboardProfile } from "../_components/DashboardProfile";
import { Header } from "../_components/Header";
import { AddCoverImg } from "../_components/AddCoverImg";

const Page = () => {
  return (
    <div>
      <Header />
      <AddCoverImg />
      <div className="w-screen px-[80px] flex gap-5 justify-center mt-[-86px] ">
        <PersonalPage />
        <DashboardProfile />
      </div>
    </div>
  );
};

export default Page;
