"use client";

import { BankCardType } from "@/util/types";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type BankCardContextType = {
  loading: boolean;
  connectBankCard: (
    country: string,
    firstName: string,
    lastName: string,
    cardNumber: string,
    expires: string,
    year: string,
    cvc: string
  ) => void;
  getBankCard: () => void;
  bankCard: BankCardType | null;
};

const bankCardContext = createContext<BankCardContextType | null>(null);

export const useBankCard = () => {
  return useContext(bankCardContext);
};

const BankCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [bankCard, setBankCard] = useState<BankCardType | null>(null);

  const connectBankCard = async (
    country: string,
    firstName: string,
    lastName: string,
    cardNumber: string,
    expires: string,
    year: string,
    cvc: string
  ) => {
    setLoading(true);
    try {
      const res = await fetch("/api/bank-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: country,
          firstName: firstName,
          lastName: lastName,
          cardNumber: cardNumber,
          expires: expires,
          year: year,
          cvc: cvc,
          userId: localStorage.getItem("userId"),
        }),
      });
      const jsonData = await res.json();
      console.log("jsonData", jsonData);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while connecting the bank card.");
    } finally {
      setLoading(false);
    }
  };

  const getBankCard = async () => {
    if (!userId || userId <= 0) {
      console.warn("Invalid userId", userId);
      return;
    }
    try {
      const res = await axios.get(`/api/bank-card?userId=${userId}`);
      setBankCard(res.data.bankCard[0]);
    } catch (error) {
      console.log("error", error);
      alert("error in get bank card");
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
  }, [userId]);

  useEffect(() => {
    if (userId !== null) {
      getBankCard();
    }
  }, [userId]);

  return (
    <bankCardContext.Provider
      value={{
        loading: loading,
        connectBankCard: connectBankCard,
        getBankCard: getBankCard,
        bankCard: bankCard,
      }}
    >
      {children}
    </bankCardContext.Provider>
  );
};

export default BankCardProvider;
