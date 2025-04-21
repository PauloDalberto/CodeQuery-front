'use client'

import { LayoutSidebar } from "@/components/shared/layout-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Message = {
  sender: "user" | "ai";
  content: string;
};

export default function ChatAi() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulação de resposta da IA
    const aiMessage: Message = {
      sender: "ai",
      content: `Resposta da IA para: "${input}"`,
    };

    // Simulando delay
    setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  return (
    <LayoutSidebar title="Chat com IA">
      <Button
        variant="link"
        className="p-6 mt-6 justify-start"
        onClick={() => router.back()}
      >
        ← Voltar para seleção
      </Button>

      <div className="p-6 flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-muted text-foreground self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Input
            className="h-14"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button  onClick={handleSend} className="h-14">Enviar</Button>
        </div>
      </div>
    </LayoutSidebar>
  );
}
