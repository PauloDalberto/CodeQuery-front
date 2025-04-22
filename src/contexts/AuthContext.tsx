"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
}

interface AuthContextData {
  user: UserData | null;
  signIn: (name: string, email: string) => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  function signIn(name: string, email: string) {
    if (email !== "") {
      const userData = { name, email };
      setUser(userData);

      localStorage.setItem("user_name", name);
      localStorage.setItem("user_email", email);
      

      router.replace("/");
    }
  }

  useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    const storedEmail = localStorage.getItem("user_email");

    if (storedName && storedEmail) {
      setUser({ name: storedName, email: storedEmail });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
