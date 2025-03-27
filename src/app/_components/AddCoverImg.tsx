import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import React from "react";

export const AddCoverImg = () => {
  return (
    <div className="w-full h-[319px] bg-secondary flex items-center justify-center ">
      <Button>
        <Camera />
        Add a cover image
      </Button>
    </div>
  );
};
