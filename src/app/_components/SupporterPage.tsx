"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { useUser } from "../_context/UserContext";
import Link from "next/link";
import { useDonation } from "../_context/DonationContext";
import { useEffect } from "react";

export const SupporterPage = ({ profileId }: { profileId: number }) => {
  const { users } = useUser()!;
  const { donationsInfo, getDonationInfo } = useDonation()!;

  useEffect(() => {
    getDonationInfo(profileId);
  }, []);

  return (
    <>
      {users?.map((user) => {
        if (user.id !== profileId) return null;
        return (
          <div
            key={user.id}
            className="w-[632px] flex flex-col items-start gap-5 z-50 bg-background rounded-lg "
          >
            <div className="w-full p-6 items-start flex flex-col gap-2 rounded-lg border-border border ">
              <div className="w-full flex items-start justify-between ">
                <div className="flex items-center gap-3 ">
                  <Avatar>
                    <AvatarImage src={user?.profile?.avatarImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h4 className="text-[20px] leading-[24px] font-[700] ">
                    {user?.profile?.name}
                  </h4>
                </div>
              </div>
              <div className="py-4 w-full ">
                <div className="w-full border-b-[1px] "></div>
              </div>

              <div className="flex flex-col items-start gap-3 ">
                <h4 className="text-[16px] font-[600] leading-[24px] ">
                  About {user?.profile?.name}
                </h4>
                <p className="text-[14px] font-[400] leading-[20px] w-full ">
                  {user?.profile?.about}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-start p-6 gap-3 rounded-lg border-border border ">
              <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
                Social media URL
              </h4>
              {user?.profile?.socialmediaurl && (
                <Link href={user.profile.socialmediaurl} target="_blank">
                  <p className="font-[400] text-[14px] leading-[20px] w-full hover:underline ">
                    {user.profile.socialmediaurl}
                  </p>
                </Link>
              )}
            </div>
            <div className="w-full flex flex-col items-start p-6 gap-3 rounded-lg border-border border ">
              <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
                Recent Supporters
              </h4>
              {donationsInfo?.length === 0 ? (
                <div className="w-full flex flex-col items-center p-6 gap-6 rounded-lg border-border border ">
                  <div className="w-[385px] flex flex-col items-center gap-1  ">
                    <div>
                      <Heart />
                    </div>
                    <h4 className="text-[16px] font-[600] leading-[24px text-center] ">
                      Be the first one to support {user?.profile?.name}
                    </h4>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-4 items-start ">
                  {donationsInfo?.map((donation, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex items-start gap-3 "
                      >
                        <div>
                          <Avatar className="w-10 h-10 ">
                            <AvatarImage src={donation.avatarimage} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="w-full flex flex-col items-start gap-3 ">
                          <h4 className="text-[14px] font-[650] leading-[20px] text-[#000] ">
                            {donation.name}{" "}
                            <span className="text-[14px] font-[500] leading-[20px] text-foreground ">
                              bought ${donation.amount} coffee
                            </span>
                          </h4>
                          <h4 className="text-[14px] font-[400] leading-[20px] ">
                            {donation.specialmessage}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
