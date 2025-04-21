"use client"

import { GitHubRepoSearch } from "@/components/shared/GitHubRepoSearch"
import { LayoutSidebar } from "@/components/shared/layout-sidebar"

export default function Home() {
  return (
    <LayoutSidebar title="Pesquisar Usuários">
      <GitHubRepoSearch />
    </LayoutSidebar>
  )
}
