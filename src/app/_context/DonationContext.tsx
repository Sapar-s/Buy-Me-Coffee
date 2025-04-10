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
import { usePathname } from "next/navigation";

type UserContextType = {
  giveDonation: (
    amount: string,
    socialURLOrBuyMeACoffee: string,
    message: string,
    profileId: number
  ) => void;
  loading: boolean;
  donationsInfo: receivedDonationsType[] | null;
  getDonationInfo: (userId: number) => void;
};

const donationContext = createContext<UserContextType | null>(null);

export const useDonation = () => {
  return useContext(donationContext);
};

const DonationProvider = ({ children }: { children: ReactNode }) => {
  const [donorId, setDonorId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [donationsInfo, setDonationsInfo] = useState(null);
  const pathname = usePathname();

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

      toast.success(response.data.message);
    } catch (error) {
      console.log("error", error);
      alert("error in giving donation");
    } finally {
      setLoading(false);
    }
  };

  const getDonationInfo = async (userId: number) => {
    try {
      const res = await axios.get(`/api/donation?userId=${userId}`);
      const jsonData = await res.data;
      setDonationsInfo(jsonData);
    } catch (error) {
      console.log("error", error);
      alert("error in getting donation info");
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setDonorId(Number(id));
      getDonationInfo(Number(id));
    }
  }, [pathname]);

  return (
    <donationContext.Provider
      value={{
        giveDonation: giveDonation,
        loading: loading,
        donationsInfo: donationsInfo,
        getDonationInfo: getDonationInfo,
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
