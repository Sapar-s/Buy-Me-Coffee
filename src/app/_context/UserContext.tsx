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
  // signUp: (username: string, email: string, password: string) => void;
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

  // const signUp = async (username: string, email: string, password: string) => {
  //   try {
  //     await fetch("/api/sign-up", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         email: email,
  //         password: password,
  //       }),
  //     });
  //   } catch (error) {
  //     console.log("error", error);
  //     alert("error in signup user");
  //   }
  // };

  useEffect(() => {
    getUser();
    // signUp();
  }, []);

  return (
    <userContext.Provider value={{ users: users }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
