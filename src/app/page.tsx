"use client"

import { AppSidebar } from "@/components/sidebarComponents/app-sidebar"
import { NavActions } from "@/components/sidebarComponents/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Wand2, MessageSquare, Brain } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>

        <main className="p-6 space-y-6">
          <div >
            <Input
              className="w-full h-16 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              
              className="flex flex-col items-center justify-center h-32"
            >
              <Wand2 className="mb-2" />
              Refatorar
            </Button>
            <Button
              variant="outline"
              
              className="flex flex-col items-center justify-center h-32"
            >
              <MessageSquare className="mb-2" />
              Conversar
            </Button>
            <Button
              variant="outline"
              
              className="flex flex-col items-center justify-center h-32"
            >
              <Brain className="mb-2" />
              Desafios Técnicos
            </Button>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
