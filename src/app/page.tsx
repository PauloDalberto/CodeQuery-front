"use client"

import { GitHubRepoSearch } from "@/components/shared/GitHubRepoSearch"
import { LayoutSidebar } from "@/components/shared/layout-sidebar"
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Pesquisar Usuários";
  
  return (
    <LayoutSidebar title={title}>
      <GitHubRepoSearch />
    </LayoutSidebar>
  )
}
