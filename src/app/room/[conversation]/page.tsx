"use client"

import { GitHubRepoSearch } from "@/components/shared/GitHubRepoSearch";
import { LayoutSidebar } from "@/components/shared/layout-sidebar"
import { useParams } from "next/navigation";

export default function Conversation() {
  const params = useParams();
  const roomName = params?.conversation as string;
  
  return (
    <LayoutSidebar title={roomName}>
      <GitHubRepoSearch />
    </LayoutSidebar>
  )
}
