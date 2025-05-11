'use client'

import { createContext, useContext, useState } from "react";

type ConversationContextType = {
  title: string
  setTitle: (title: string) => void;
}

const ConversationContext = createContext<ConversationContextType | null>(null);

export const useConversation = () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
}

export const ConversationProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("");

  return (
    <ConversationContext.Provider value={{ title, setTitle }}>
      {children}
    </ConversationContext.Provider>
  );
};