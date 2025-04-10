"use client";

import { userType } from "@/util/types";
import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type UserContextType = {
  users: userType[] | null;
  changeProfile: (
    avatarImage: string,
    name: string,
    about: string,
    URL: string,
    id: number
  ) => void;
  logedUser: userType | null;
};

const userContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  return useContext(userContext);
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<userType[] | null>(null);
  const [logedUser, setLogedUser] = useState<userType | null>(null);
  const pathname = usePathname();

  const getUsers = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();

      setUsers(jsonData);

      if (jsonData.error) {
        alert(jsonData.message);
        return;
      }
    } catch (error) {
      console.log("error", error);
      alert("error in getting user");
    }
  };

  const changeProfile = async (
    avatarImage: string,
    name: string,
    about: string,
    URL: string,
    id: number
  ) => {
    const response = await fetch("/api/complete-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatarImage,
        name,
        about,
        socialMediaURL: URL,
        id,
      }),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("amjilttai soligdloo");
    }
    getUsers();
  };

  useEffect(() => {
    getUsers();
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && users) {
      const user = users.find((u) => u.id === Number(storedUserId));
      if (user) setLogedUser(user);
    }
  }, [pathname]);

  return (
    <userContext.Provider
      value={{
        users: users,
        changeProfile: changeProfile,
        logedUser: logedUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
