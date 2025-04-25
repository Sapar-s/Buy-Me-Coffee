"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type ProfileContextType = {
  userId: number | null;
  getSuccessMessage: () => void;
  successMessage: string | null;
};

const profileContext = createContext<ProfileContextType | null>(null);

export const useProfile = () => {
  return useContext(profileContext);
};

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getSuccessMessage = async () => {
    if (!userId || userId <= 0) {
      console.warn("Invalid userId", userId);
      return;
    }
    try {
      const res = await axios.get(`/api/success-page?userId=${userId}`);

      setSuccessMessage(res.data.successMessage[0]?.successmessage || "");
    } catch (error) {
      console.log("error", error);
      toast.error("Мэдээллийг авахад алдаа гарлаа!");
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id !== null) {
      const parsedId = Number(id);
      if (!isNaN(parsedId) && parsedId > 0) {
        setUserId(parsedId);
      }
    }
  }, []);

  return (
    <profileContext.Provider
      value={{
        getSuccessMessage: getSuccessMessage,
        userId: userId,
        successMessage: successMessage,
      }}
    >
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
