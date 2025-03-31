"use client";

import { useUser } from "@/app/_context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";

const Explore = () => {
  const { users } = useUser();

  return (
    <div className="w-[957px] flex flex-col p-6 ">
      <div className="w-full flex flex-col gap-6 items-start ">
        <div className="flex flex-col items-start gap-6  ">
          <h4 className="text-[20px] font-[600] leading-[28px] ">
            Explore creators
          </h4>
          <div>
            <Search className="ml-[12px] w-4 h-4 opacity-50 absolute mt-[10px] " />
            <Input
              className="w-[243px] h-[36px] pl-[32px]  "
              placeholder="Search name"
            />
          </div>
        </div>
        {users ? (
          users?.map((user: any, index: number) => {
            return (
              <div
                key={index}
                className="flex w-full p-6 items-start rounded-lg border-[1px] border-border "
              >
                <div className="flex flex-col gap-3 items-start ">
                  <div className="w-full flex justify-between items-center ">
                    <div className="flex gap-3 items-center ">
                      <Avatar>
                        <AvatarImage src="/Profile.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <h4 className="text-[20px] font-[600] leading-[28px] ">
                        {user.profile.name}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1 items-end w-[258.5px] ">
                      <Link href={`/view-profile/${user?.profile?.userId}`}>
                        <Button
                          variant={"secondary"}
                          className="cursor-pointer "
                        >
                          View profile <ExternalLink />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 ">
                    <div className="flex flex-col gap-2 items-start w-full ">
                      <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
                        About {user.profile.name}
                      </h4>
                      <p className="text-[14px] font-[400] leading-[20px] w-full ">
                        {user.profile.about}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 items-start w-full ">
                      <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
                        Social media URL
                      </h4>
                      <h5 className="text-[14px] font-[400] leading-[20px] w-full ">
                        {user.profile.socialMediaURL}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default Explore;
