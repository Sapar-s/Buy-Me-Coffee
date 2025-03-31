"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export const AddCoverImg = () => {
  const [image, setImage] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const deleteImage = () => {
    setImage(null);
  };
  return (
    <>
      {image ? (
        <div className="w-full relative ">
          <Image
            alt=""
            src={image}
            height={319}
            width={1000}
            className="w-full h-[319px] "
          />{" "}
          <Button
            onClick={deleteImage}
            className="absolute top-2 right-2 rounded-full w-9 h-9 cursor-pointer "
          >
            <X />
          </Button>
        </div>
      ) : (
        <div className="w-full h-[319px] bg-secondary flex items-center justify-center ">
          <label
            htmlFor="coverImage"
            className=" flex items-center justify-center gap-2 py-2 px-4 rounded-md cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 text-[14px] font-[500] "
          >
            <Camera className="w-4 h-4 " /> Add a cover image
            <Input
              id="coverImage"
              onChange={handleFileChange}
              className="hidden"
              type="file"
            />
          </label>
        </div>
      )}
    </>
  );
};
