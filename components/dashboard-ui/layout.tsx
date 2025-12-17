"use client"

import type { ReactNode } from "react"
import Sidebar from "./sidebar"
import TopNav from "./top-nav"
import BottomNav from "./bottom-nav"
import { useTheme } from "next-themes"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme()

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-border bg-background">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-8 bg-background pb-20 lg:pb-8">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}
