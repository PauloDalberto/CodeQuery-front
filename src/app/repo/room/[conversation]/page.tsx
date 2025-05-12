"use client";

import { GitHubRepoSearch } from "@/components/shared/GitHubRepoSearch";
import { LayoutSidebar } from "@/components/shared/layout-sidebar";
import { useConversation } from "@/contexts/ConversationContext";
import { listMessages, room } from "@/services/ia/rooms";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Conversation() {
  const { title } = useConversation();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMessages = async () => {
      try {
        const roomsData = await room();
        
        setLoading(true);
        console.log("Parâmetros da URL:", params);

        const response = await listMessages(params.conversation as string);

        if(params.conversatiom === roomsData.uuid) {
          if (response.messages && response.messages.length > 0) {
            router.push(`/repo/room/${params.conversation}/chat`);
          } else {
            console.log("Nenhuma mensagem encontrada.");
          }
        } 
        
      } catch (error) {
        console.error("Erro ao verificar mensagens:", error);
      } finally {
        setLoading(false);
      }
    };

    checkMessages();
  }, [params, router]);

  if (loading) {
    return (
      <LayoutSidebar title={title}>
        <p>Carregando...</p>
      </LayoutSidebar>
    );
  }

  return (
    <LayoutSidebar title={title}>
      <GitHubRepoSearch />
    </LayoutSidebar>
  );
}
