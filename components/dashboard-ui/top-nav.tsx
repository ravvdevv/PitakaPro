"use client"

import { ThemeToggle } from "../theme-toggle"

export default function TopNav() {
  return (
    <nav className="px-4 sm:px-8 flex items-center justify-end bg-background border-b border-border h-full">
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  )
}
