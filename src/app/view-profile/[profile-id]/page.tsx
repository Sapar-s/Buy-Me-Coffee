"use client";

import React from "react";
import { DashboardProfile } from "../../_components/DashboardProfile";
import { Header } from "../../_components/Header";
import { CoverImg } from "../../_components/CoverImg";
import { SupporterPage } from "@/app/_components/SupporterPage";
import { useParams } from "next/navigation";

const ViewProfile = () => {
  // const { users } = useUser()!;
  const params = useParams();
  const profileId = Number(
    Array.isArray(params["profile-id"])
      ? params["profile-id"][0]
      : params["profile-id"] || ""
  );
  return (
    <div>
      <Header />
      <CoverImg />
      <div className="w-screen px-[80px] flex gap-5 justify-center mt-[-86px] ">
        <SupporterPage profileId={profileId} />
        <DashboardProfile profileId={profileId} />
      </div>
    </div>
  );
};

export default ViewProfile;
