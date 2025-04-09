"use client";

import { userType } from "@/util/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  users: userType[] | null;
  // signUp: (username: string, email: string, password: string) => void;
};

const userContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  return useContext(userContext);
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<userType[] | null>(null);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      console.log("jsonData=>", jsonData);

      setUsers(jsonData);

      // console.log("get user jsonData", jsonData);
      if (jsonData.error) {
        alert(jsonData.message);
        return;
      }
    } catch (error) {
      console.log("error", error);
      alert("error in getting user");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <userContext.Provider value={{ users: users }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
