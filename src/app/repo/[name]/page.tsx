"use client"

import { LayoutSidebar } from "@/components/shared/layout-sidebar"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"

export default function RepoPage() {
  const router = useRouter();
  const params = useParams();

  const handleClick = () => {
    router.push(`/repo/${params.name}/chatAi`);
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
        <h1 className="flex text-2xl font-bold mb-2">Repositório Selecionado: <p className="ml-2">{params.name}</p></h1>
        
        <div className="flex flex-col gap-4">
          <Button variant="outline" onClick={handleClick}>🛠 Refatorar com IA</Button>
          <Button variant="outline">💬 Conversar com IA</Button>
          <Button variant="outline">⚔️ Desafio Técnico</Button>
        </div>
      </div>
    </LayoutSidebar>
  )
}
