"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { receivedDonationsType } from "@/util/types";

type UserContextType = {
  giveDonation: (
    amount: string,
    socialURLOrBuyMeACoffee: string,
    message: string,
    profileId: number
  ) => void;
  loading: boolean;
  donationsInfo: receivedDonationsType[] | null;
};

const donationContext = createContext<UserContextType | null>(null);

export const useDonation = () => {
  return useContext(donationContext);
};

const DonationProvider = ({ children }: { children: ReactNode }) => {
  const [donorId, setDonorId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [donationsInfo, setDonationsInfo] = useState(null);

  const giveDonation = async (
    amount: string,
    socialURLOrBuyMeACoffee: string,
    message: string,
    profileId: number
  ) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/donation", {
        amount,
        socialURLOrBuyMeACoffee,
        message,
        profileId,
        donorId,
      });

      console.log("response =>", response);
      toast.success(response.data.message);
    } catch (error) {
      console.log("error", error);
      alert("error in giving donation");
    } finally {
      setLoading(false);
    }
  };

  const getDonationInfo = async (userId: string) => {
    try {
      const res = await axios.get(`/api/donation?userId=${userId}`);
      const jsonData = await res.data;
      setDonationsInfo(jsonData);
      console.log("jsonData in get donation info=> ", jsonData);
    } catch (error) {
      console.log("error", error);
      alert("error in getting donation info");
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setDonorId(Number(id));
      getDonationInfo(id);
    }
  }, []);

  return (
    <donationContext.Provider
      value={{
        giveDonation: giveDonation,
        loading: loading,
        donationsInfo: donationsInfo,
      }}
    >
      {children}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          className: "sonner",
        }}
      />
    </donationContext.Provider>
  );
};

export default DonationProvider;
