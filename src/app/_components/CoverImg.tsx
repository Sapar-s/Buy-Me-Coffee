import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const CoverImg = ({ profileId }: { profileId: number }) => {
  const [image, setImage] = useState<string | null>(null);

  const getBackgroundImage = async (profileId: number | null) => {
    try {
      const response = await axios.get(`/api/coverImage?userId=${profileId}`);
      const images = response.data.backgroundImage;
      if (images && images.length > 0) {
        setImage(images[0].backgroundimage);
      } else {
        setImage(null);
      }
    } catch (error) {
      console.log("error", error);
      alert("Database-аас зураг авахад алдаа гарлаа!");
    }
  };

  useEffect(() => {
    getBackgroundImage(profileId);
  }, []);
  return (
    <>
      {image ? (
        <div className="w-full h-[319px] flex items-center justify-center">
          <Image
            alt=""
            src={image}
            width={1000}
            height={500}
            className="w-full h-full "
          />
        </div>
      ) : (
        <div className="w-full h-[319px] flex items-center justify-center bg-[#F4F4F5] "></div>
      )}
    </>
  );
};
