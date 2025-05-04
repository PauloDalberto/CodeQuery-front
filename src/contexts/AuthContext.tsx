"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/services/auth/auth";

interface UserData {
  name: string;
  email: string;
}

interface AuthContextData {
  user: UserData | null;
  signIn: (name: string, email: string) => void;
  logout: () => void;
  logged: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [logged, setLogged] = useState(false);
  const router = useRouter();

  function signIn(name: string, email: string) {
    const userData = { name, email };
    setUser(userData);
    setLogged(true);
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email);
    router.replace("/");
  }

  function logout() {
    setUser(null);
    setLogged(false);
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    router.replace("/login");
  }

  useEffect(() => {
    const validateToken = async () => {
      try {
        const profile = await getProfile();
        setUser({ name: profile.name, email: profile.email });
        setLogged(true);
      } catch (err) {
        logout();
        console.log(err)
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, logout, logged }}>
      {children}
    </AuthContext.Provider>
  );
}
