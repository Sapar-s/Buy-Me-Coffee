"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useDonation } from "../_context/DonationContext";
import { Heart } from "lucide-react";

export const RecentTransaction = () => {
  const { donationsInfo } = useDonation()!;
  return (
    <div className="w-full flex flex-col gap-3 items-start ">
      <div className="flex w-full justify-between items-start ">
        <h4 className="text-[16px] font-[600] leading-[24px] ">
          Recent transactions
        </h4>
        <Select>
          <SelectTrigger className="h-[36px] py-2 px-4 border-dashed ">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">
              <div className="flex items-center space-x-2">
                <Checkbox id="one" />
                <label
                  htmlFor="one"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  $1
                </label>
              </div>
            </SelectItem>
            <SelectItem value="b">
              <div className="flex items-center space-x-2">
                <Checkbox id="two" />
                <label
                  htmlFor="two"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  $2
                </label>
              </div>
            </SelectItem>
            <SelectItem value="c">
              <div className="flex items-center space-x-2">
                <Checkbox id="five" />
                <label
                  htmlFor="five"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  $5
                </label>
              </div>
            </SelectItem>
            <SelectItem value="d">
              <div className="flex items-center space-x-2">
                <Checkbox id="ten" />
                <label
                  htmlFor="ten"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  $10
                </label>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {donationsInfo?.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center gap-6 p-6 rounded-lg border-[1px] ">
          <div className="w-[385px] flex flex-col gap-5 items-center">
            <div className="p-[17.7px] rounded-full bg-secondary ">
              <Heart className="w-[28.4px] h-[28.4px] " />
            </div>
            <div className="flex flex-col items-center gap-1 ">
              <h4 className="text-[16px] font-[600] leading-[24px] text-center ">
                You don’t have any supporters yet
              </h4>
              <h4 className="text-[16px] font-[400] leading-[24px] ">
                Share your page with your audience to get started.
              </h4>
            </div>
          </div>
        </div>
      ) : (
        donationsInfo?.map((donationInfo, index) => {
          return (
            <div
              key={index}
              className="w-full flex flex-col gap-4 p-6 items-start rounded-lg border-[1px] "
            >
              <div className="p-3 flex flex-col gap-[10px] w-full rounded-lg ">
                <div className="w-full flex flex-col gap-4 items-start ">
                  <div className="w-full flex justify-between items-center ">
                    <div className="flex gap-3 items-center ">
                      <Avatar>
                        <AvatarImage src={donationInfo?.avatarimage} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center items-start gap-1 ">
                        <h4 className="text-[14px] font-[500] leading-[20px] ">
                          {donationInfo?.name}
                        </h4>
                        <h5 className="text-[12px] font-[400] leading-[16px] ">
                          {donationInfo?.socialmediaurl}
                        </h5>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end w-[258.5px] ">
                      <h4 className="text-[16px] font-[500] leading-[20px] ">
                        +
                        <span className="text-[16px] font-[700] leading-[20px] ">
                          ${donationInfo?.amount}
                        </span>
                      </h4>
                      <h4 className="text-[12px] font-[400] leading-[16px] text-muted-foreground ">
                        10 hours ago
                      </h4>
                    </div>
                  </div>
                  <h4 className="text-[14px] font-[400] leading-[20px] w-full ">
                    {donationInfo?.specialmessage}
                  </h4>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
