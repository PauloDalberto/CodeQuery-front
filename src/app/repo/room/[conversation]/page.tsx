"use client";

import { GitHubRepoSearch } from "@/components/shared/GitHubRepoSearch";
import { LayoutSidebar } from "@/components/shared/layout-sidebar";
import { useConversation } from "@/contexts/ConversationContext";
import { listMessages } from "@/services/ia/rooms";
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
        setLoading(true);
        console.log("Parâmetros da URL:", params);

        // Verifica se os parâmetros obrigatórios estão presentes
        if (!params.conversation || !params.name || !params.username) {
          console.error("Parâmetros faltando!");
          return;
        }

        // Busca as mensagens usando o UUID
        const response = await listMessages(params.conversation as string);

        if (response.messages && response.messages.length > 0) {
          // Redireciona para a página do chat com os parâmetros completos
          router.push(`/repo/room/${params.conversation}/${params.name}/${params.username}/chatAi`);
        } else {
          console.log("Nenhuma mensagem encontrada.");
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
