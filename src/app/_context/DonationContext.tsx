"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  giveDontation: () => void;
};

const donationContext = createContext<UserContextType | null>(null);

export const useDonation = () => {
  return useContext(donationContext);
};

const DonationProvider = ({ children }: { children: ReactNode }) => {
  const giveDontation = async () => {
    try {
    } catch (error) {
      console.log("error", error);
      alert("error in giving donation");
    }
  };

  useEffect(() => {
    giveDontation();
  }, []);

  return (
    <donationContext.Provider value={{ giveDontation: giveDontation }}>
      {children}
    </donationContext.Provider>
  );
};

export default DonationProvider;
