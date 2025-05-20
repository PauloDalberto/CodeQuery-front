'use client'

import { LayoutSidebar } from "@/components/shared/layout-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRepoContext } from "@/contexts/RepoContext";
import { challengeAiApi } from "@/services/ia/ia";
import { listMessages, uptadeConversation } from "@/services/ia/rooms";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'

interface Messages{
  role: string;
  content: string;
}

export default function ChatAi() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const params = useParams();
  const { repo, username } = useRepoContext();

  useEffect(() => {
    const fetchMessages = async () => {
      const alreadyUpdated = localStorage.getItem(`updated-${params.conversation}`);
      
      if (!alreadyUpdated) {
        await uptadeConversation(params.conversation as string, repo as string, username as string);
        localStorage.setItem(`updated-${params.conversation}`, "true");
      }

      const prevMessages = await listMessages(params.conversation as string);

      const formattedMessages = prevMessages.messages.map((msg: Messages) => ({
        role: msg.role,
        parts: msg.content,
      }));

      setMessages(formattedMessages);
    };

    fetchMessages();
  }, [params.conversation, repo, username]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const responseChat = await challengeAiApi(params.conversation as string, input);

    const userMessage: Message = { role: "user", parts: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiMessage: Message = {
      role: "model",
      parts: responseChat.reply,
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <LayoutSidebar title="Refatoração com IA">

      <div className="p-6 flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 ">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${ 
                msg.role === "user" ? "justify-end" : "justify-start" 
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl text-sm max-w-[70%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                <ReactMarkdown>
                  {msg.parts as string}
                </ReactMarkdown>
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
          <Button onClick={handleSend} className="h-14">Enviar</Button>
        </div>
      </div>
    </LayoutSidebar>
  );
}
