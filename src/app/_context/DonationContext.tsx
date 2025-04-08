"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

type UserContextType = {
  giveDonation: (
    amount: string,
    socialURLOrBuyMeACoffee: string,
    message: string,
    profileId: number
  ) => void;
};

const donationContext = createContext<UserContextType | null>(null);

export const useDonation = () => {
  return useContext(donationContext);
};

const DonationProvider = ({ children }: { children: ReactNode }) => {
  const [donorId, setDonorId] = useState<number>(0);
  const giveDonation = async (
    amount: string,
    socialURLOrBuyMeACoffee: string,
    message: string,
    profileId: number
  ) => {
    try {
      const response = await axios.post("/api/donation", {
        amount,
        socialURLOrBuyMeACoffee,
        message,
        profileId,
        donorId,
      });

      console.log("response =>", response);
    } catch (error) {
      console.log("error", error);
      alert("error in giving donation");
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setDonorId(Number(id));
    }
    // giveDonation();
  }, []);

  return (
    <donationContext.Provider value={{ giveDonation: giveDonation }}>
      {children}
    </donationContext.Provider>
  );
};

export default DonationProvider;
