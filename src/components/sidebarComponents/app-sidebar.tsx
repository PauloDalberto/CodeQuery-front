"use client"

import * as React from "react"
import {
  Home
} from "lucide-react"

import { NavFavorites } from "@/components/sidebarComponents/nav-favorites"
import { NavMain } from "@/components/sidebarComponents/nav-main"
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
import { DialogComponent } from "../dialog/dialog"

const data = {
  user: {
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
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
            <DialogComponent />
          </SidebarHeader>
          <SidebarContent>
            <NavFavorites  />
          </SidebarContent>
          <SidebarRail />
        </>
      )}
      
    </Sidebar>
  )
}
