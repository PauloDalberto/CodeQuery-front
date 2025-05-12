"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RepoContextProps {
  repo: string | null;
  username: string | null;
  setRepo: (name: string) => void;
  setUsername: (username: string) => void;
}

const RepoContext = createContext<RepoContextProps | undefined>(undefined);

export const RepoProvider = ({ children }: { children: ReactNode }) => {
  const [repo, setRepo] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <RepoContext.Provider value={{ repo, username, setRepo, setUsername }}>
      {children}
    </RepoContext.Provider>
  );
};

export const useRepoContext = () => {
  const context = useContext(RepoContext);
  if (!context) {
    throw new Error("useRepoContext must be used within a RepoProvider");
  }
  return context;
};
