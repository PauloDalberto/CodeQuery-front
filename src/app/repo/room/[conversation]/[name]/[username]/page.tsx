"use client"

import { LayoutSidebar } from "@/components/shared/layout-sidebar"
import { Button } from "@/components/ui/button"
import { repoGitHubApi } from "@/services/github/github";
import { useParams, useRouter } from "next/navigation"

export default function RepoPage() {
  const router = useRouter();
  const params = useParams();

  const handleClick =  async () => {
    await repoGitHubApi(params.username as string, params.name as string);
    router.push(`/repo/room/${params.conversation}/${params.name}/${params.username}/chatAi`);      
  }

  return (
    <LayoutSidebar>
      <Button
        variant="link"
        className="p-6 mt-6 justify-start"
        onClick={() => router.back()}
      >
        ← Voltar para seleção
      </Button>

      <div className="p-6">
        <h1 className="flex text-2xl font-bold mb-2">
          Repositório Selecionado: <p className="ml-2">{params.name}</p>
        </h1>

        <div className="flex flex-col gap-4">
          <Button variant="outline" onClick={handleClick}>💬 Conversar com IA</Button>
        </div>
      </div>
    </LayoutSidebar>
  )
}
