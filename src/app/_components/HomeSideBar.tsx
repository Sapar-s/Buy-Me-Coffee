import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import React from "react";

export const HomeSideBar = () => {
  return (
    <div className="w-[251px] flex flex-col items-start gap-1 ">
      <Button
        variant={"ghost"}
        className="w-[250px] h-[36px] cursor-pointer text-[14px] font-[500] leading-[20px] flex items-center justify-start "
      >
        Home
      </Button>
      <Button
        variant={"ghost"}
        className="w-[250px] h-[36px] cursor-pointer text-[14px] font-[500] leading-[20px]  flex items-center justify-start "
      >
        Explore
      </Button>
      <Button
        variant={"ghost"}
        className="w-[250px] h-[36px] cursor-pointer  flex  justify-start "
      >
        <h4 className="text-[14px] font-[500] leading-[20px] ml-1 ">
          View page
        </h4>

        <ExternalLink />
      </Button>
      <Button
        variant={"ghost"}
        className="w-[250px] h-[36px] cursor-pointer text-[14px] font-[500] leading-[20px] flex items-center justify-start "
      >
        Account settings
      </Button>
    </div>
  );
};
