"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/handle-upload";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const AddCoverImg = () => {
  const [image, setImage] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBackgroundImageFile(file);
    setPreviewImage(URL.createObjectURL(file)); // previewImage болгож хадгална
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(Number(id));
    getBackgroundImage(id);
  }, [image]);

  const getBackgroundImage = async (userId: string | null) => {
    try {
      const response = await axios.get(`/api/coverImage?userId=${userId}`);
      const images = response.data.backgroundImage;
      if (images && images.length > 0) {
        setImage(images[0].backgroundimage);
        // setDataBaseImages(images);
      } else {
        setImage(null);
        // setDataBaseImages([]);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Database-аас зураг авахад алдаа гарлаа!");
    }
  };

  const changeCoverHandler = async (userId: number | null) => {
    if (!backgroundImageFile) {
      toast.warning("Шинэ зураг сонгогдоогүй байна!");
      return;
    }

    const imageURL = await uploadImage(backgroundImageFile);

    try {
      await axios.put(`/api/coverImage`, {
        userId: userId,
        imageURL: imageURL,
      });

      toast.success("Зураг амжилттай солигдлоо!");

      // UI-г шинэчлэх
      getBackgroundImage(String(userId));

      // File input state-г цэвэрлэх
      setBackgroundImageFile(null);
    } catch (error) {
      console.log("error", error);
      toast.error("Зураг солиход алдаа гарлаа!");
    }
  };

  const isNewImageSelected = backgroundImageFile !== null;

  const deleteImage = () => {
    setBackgroundImageFile(null);
    setPreviewImage(null);
  };

  return (
    <>
      <>
        {image || previewImage ? (
          <div className="w-full relative">
            <Image
              alt="Cover image"
              src={previewImage || image!}
              height={319}
              width={1000}
              className="w-full h-[319px]"
            />
            {isNewImageSelected ? (
              <div className="absolute top-4 right-20 flex gap-3">
                <Button
                  onClick={() => changeCoverHandler(userId)}
                  variant={"default"}
                  className="text-[14px] h-10 cursor-pointer"
                >
                  Save changes
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={deleteImage}
                  className="cursor-pointer text-[14px] h-10"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant={"default"}
                onClick={() => inputRef.current?.click()}
                className="text-[14px] h-10 cursor-pointer absolute top-4 right-20"
              >
                <Camera className="w-4 h-4" /> Change cover
              </Button>
            )}
          </div>
        ) : (
          <div className="w-full h-[319px] bg-secondary flex items-center justify-center">
            <label
              htmlFor="coverImage"
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-md cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 text-[14px] font-[500]"
            >
              <Camera className="w-4 h-4" /> Add a cover image
            </label>
          </div>
        )}

        {/* Энэ input аль ч тохиолдолд байж байх ёстой */}
        <Input
          id="coverImage"
          onChange={handleFileChange}
          className="hidden"
          type="file"
          ref={inputRef}
        />
      </>
    </>
  );
};
