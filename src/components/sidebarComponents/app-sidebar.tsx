"use client"

import * as React from "react"
import {
  Home,
  MessageCircleQuestion,
  Search,
  Settings2,
} from "lucide-react"

import { NavFavorites } from "@/components/sidebarComponents/nav-favorites"
import { NavMain } from "@/components/sidebarComponents/nav-main"
import { NavSecondary } from "@/components/sidebarComponents/nav-secondary"
import { NavUser } from "@/components/sidebarComponents/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AuthContext } from "@/contexts/AuthContext"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const data = {
  user: {
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logged } = React.useContext(AuthContext);
  const router = useRouter();
  
  return (
    <Sidebar className="border-r-0" {...props}>
      {!logged ? (
        <div className="flex text-center justify-center items-center h-full w-full flex-col gap-4">
          É necessario logar caso queira acessar seu histórico
          <Button onClick={() => router.push('/login')} className="w-[80%]">
            Login
          </Button>
        </div>
      ) : (
        <>
          <SidebarHeader>
            <NavUser avatar={data.user} />
            <NavMain items={data.navMain} />
          </SidebarHeader>
          <SidebarContent>
            <NavFavorites favorites={data.favorites} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </SidebarContent>
          <SidebarRail />
        </>
      )}
      
    </Sidebar>
  )
}
