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

export const RecentTransaction = () => {
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
      <div className="w-full flex flex-col gap-4 p-6 items-start rounded-lg border-[1px] ">
        <div className="p-3 flex flex-col gap-[10px] rounded-lg ">
          <div className="w-full flex flex-col gap-4 items-start ">
            <div className="w-full flex justify-between items-center ">
              <div className="flex gap-3 items-center ">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center items-start gap-1 ">
                  <h4 className="text-[14px] font-[500] leading-[20px] ">
                    Guest
                  </h4>
                  <h5 className="text-[12px] font-[400] leading-[16px] ">
                    instagram.com/welesley
                  </h5>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end w-[258.5px] ">
                <h4 className="text-[16px] font-[500] leading-[20px] ">
                  +
                  <span className="text-[16px] font-[700] leading-[20px] ">
                    $1
                  </span>
                </h4>
                <h4 className="text-[12px] font-[400] leading-[16px] text-muted-foreground ">
                  10 hours ago
                </h4>
              </div>
            </div>
            <h4 className="text-[14px] font-[400] leading-[20px] w-full ">
              Thank you for being so awesome everyday! You always manage to
              brighten up my day when I’m feeling down. Although $1 isn’t that
              much money it’s all I can contribute at the moment
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
