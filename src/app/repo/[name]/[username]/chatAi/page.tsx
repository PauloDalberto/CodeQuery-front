'use client'

import { LayoutSidebar } from "@/components/shared/layout-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatAiApi } from "@/services/ia/ia";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatAi() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const response = await chatAiApi(input);

    const userMessage: Message = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiMessage: Message = {
      sender: "ai",
      content: response.reply,
    };

    setMessages((prev) => [...prev, aiMessage]);
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
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 ">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${ 
                msg.sender === "user" ? "justify-end" : "justify-start" 
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl text-sm max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Input
            className="h-14 w-full"
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
