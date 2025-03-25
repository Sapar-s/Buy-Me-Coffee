import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="w-screen flex justify-center ">
      <div className="flex justify-between items-center py-2 px-4 max-w-[1440px] w-full ">
        <div className="max-w-[1280px] w-full flex justify-between items-center ">
          <div className="flex gap-2 items-center ">
            <Coffee className="w-6 h-6 " />
            <h4 className="text-[16px] font-[700] leading-[20px] w-[119px] h-6 ">
              Buy Me Coffee
            </h4>
          </div>
          <Link href={"/login"}>
            <Button
              variant={"secondary"}
              className="h-10 py-2 px-4 cursor-pointer "
            >
              Log out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
