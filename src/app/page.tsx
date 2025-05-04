"use client"

import { LayoutSidebar } from "@/components/shared/layout-sidebar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Pesquisar Usuários";
  
  return (
    <LayoutSidebar title={title}>
      <div className="flex justify-center items-center w-full h-full">
        <Alert className="w-fit">
          <AlertTitle>Crie uma sala</AlertTitle>
          <AlertDescription>
            Para prosseguir, crie uma sala (o botão está na sidebar!)
          </AlertDescription>
        </Alert>
      </div>
    </LayoutSidebar>
  )
}
