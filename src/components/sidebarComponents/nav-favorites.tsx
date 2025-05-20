"use client"

import {
  ArrowUpRight,
  LinkIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import React from "react"
import { room } from "@/services/ia/rooms"
import Link from 'next/link'
import { useConversation } from "@/contexts/ConversationContext"
import { AlertDialogComponent } from "../dialog/dialogContinue"

export function NavFavorites() {
  const { isMobile } = useSidebar();
  const [rooms, setRooms] = React.useState<{ title: string; uuid: string }[]>([]); 
  const [showDialog, setShowDialog] = React.useState(false); 
  const { setTitle } = useConversation()
  
  React.useEffect(() => {
    async function getRoom() {
     const responseRoom = await room();
     setRooms(responseRoom);
    }

    getRoom();
  }, [])

  const handleDelete = async () => {
    setShowDialog(true);
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Historico</SidebarGroupLabel>
      <SidebarMenu>
        {rooms.map((item) => (
          <SidebarMenuItem key={item.uuid}>
            <SidebarMenuButton 
              onClick={() => setTitle(item.title)}
              asChild
            >
              <Link href={`/repo/room/${item.uuid}`}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <LinkIcon className="text-muted-foreground" />
                  <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowUpRight className="text-muted-foreground" />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span onClick={handleDelete}>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      {showDialog && (
        <AlertDialogComponent 
          isOpen={showDialog} 
          onClose={() => setShowDialog(false)} 
        />
      )}
    </SidebarGroup>
  )
}
