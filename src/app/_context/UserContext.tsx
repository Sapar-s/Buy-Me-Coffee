"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  users: {
    name: string;
    email: string;
    id: string;
  };
};

const userContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  return useContext(userContext);
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<any | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();

      setUsers(jsonData.data);

      console.log("get user jsonData", jsonData);
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
    getUser();
  }, []);

  return (
    <userContext.Provider value={{ users: users }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
