"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Copy } from "lucide-react";
import { useUser } from "../_context/UserContext";

export const UserProfile = () => {
  const { users } = useUser();

  console.log("users => ", users);
  return (
    <>
      {users?.map((user) => {
        return (
          <div
            key={user.id}
            className="w-full flex flex-col gap-3 p-6 border-border border-[1px] rounded-lg "
          >
            <div className="w-full flex justify-between items-start ">
              <div className="flex gap-3 items-center ">
                <Avatar>
                  <AvatarImage src={user.profile.avatarImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center items-start gap-1 ">
                  <h4 className="text-[16px] font-[700] leading-[24px] ">
                    {user.profile.name}
                  </h4>
                  <h5 className="text-[14px] font-[400] leading-[20px] ">
                    {user.profile.socialmediaurl}
                  </h5>
                </div>
              </div>
              <Button className="gap-2 h-10 flex ">
                <Copy />
                <p>Share page link</p>
              </Button>
            </div>
            <div className="py-4 ">
              <div className="w-full border-b-[1px] "></div>
            </div>
            <div className="w-full flex flex-col gap-6 items-start ">
              <div className="w-full gap-4 flex items-center ">
                <h4 className="text-[20px] font-[600] leading-[28px] ">
                  Earnings
                </h4>
                <Select>
                  <SelectTrigger className="w-[175px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full ">
                <h1 className="text-[36px] font-[700] leading-[40px] ">
                  $
                  {user.donationsReceived
                    ? user.donationsReceived[0].amount
                    : 0}
                </h1>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
