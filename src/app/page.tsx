"use client"

import { GitHubRepoSearch } from "@/components/GitHubRepoSearch"
import { LayoutSidebar } from "@/components/sidebarComponents/layout-sidebar"

export default function Home() {
  return (
    <LayoutSidebar title="Pesquisar Usuários">
      <GitHubRepoSearch />
    </LayoutSidebar>
  )
}
