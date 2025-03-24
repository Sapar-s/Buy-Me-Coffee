import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

export const SecondStep = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Link href={"/login"}>
        <Button
          variant={"secondary"}
          className="h-10 absolute top-[32px] right-[80px] "
        >
          Log in
        </Button>
      </Link>
      <div className="w-[407px] flex flex-col items-start rounded-lg ">
        <div className="flex flex-col items-start p-6 gap-[6px] ">
          <h3 className="text-[24px] font-[600] leading-[32px] w-full ">
            Create Your Account
          </h3>
          <h4 className="w-full text-[14px] font-[400] leading-[20px] text-foreground ">
            Choose a username for your page
          </h4>
        </div>
        <div className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full ">
          <div className="flex flex-col items-start gap-2 w-full  ">
            <h5 className="text-[14px] font-[500] leading-[14px]  ">
              Username
            </h5>
            <Input placeholder="Enter username here" />
          </div>
        </div>

        <div className="flex items-start gap-[10px] px-[24px] pb-[24px] w-full ">
          <Button variant="default" className="w-full h-10">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
