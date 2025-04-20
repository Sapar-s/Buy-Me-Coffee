"use client";

import React from "react";
import { Header } from "../../_components/Header";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@/app/_context/UserContext";

const SuccessPage = () => {
  const params = useParams();
  const profileId = Number(
    Array.isArray(params.profileId)
      ? params.profileId[0]
      : params.profileId || ""
  );
  console.log("profileId", profileId);
  const { users } = useUser()!;
  return (
    <div>
      <Header />
      <div className="w-full  flex items-center justify-center ">
        <div className="mt-70 flex flex-col items-center ">
          <div className="w-[696px] p-6 flex flex-col gap-6 items-center ">
            <div className="w-full flex flex-col items-center gap-5 ">
              <div className="p-[17.7px] w-[64px] h-[64px] rounded-full flex items-center justify-center bg-[#18BA51] ">
                <CircleCheck className="text-white " />
              </div>
              <h4 className="text-[16px] font-[600] text-center ">
                Donation Complete !
              </h4>
            </div>
            <div className="w-[510px] min-h-[80px] rounded-md flex flex-col px-3 py-2 border border-border ">
              {users?.map((user) => {
                if (user.id !== profileId) return null;
                console.log("user", user);
                return (
                  <>
                    <div className="flex gap-2 ">
                      <Avatar className="w-[32px] h-[32px] ">
                        <AvatarImage src={user.profile?.avatarImage} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h4 className="text-[14px] font-[500] ">
                        {user.profile?.name}:
                      </h4>
                    </div>
                    <p className="text-[14px] font-[400] ">
                      {user.profile?.successMessage}
                    </p>
                  </>
                );
              })}
            </div>
          </div>
          <Link href={"/explore"}>
            <Button className="cursor-pointer ">Return to explore</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
