"use client"

import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, CreditCard, Wallet, Target } from "lucide-react"
import { HelpDialog } from "@/components/dashboard-ui/help-dialog"
import { SettingsDialog } from "@/components/dashboard-ui/settings-dialog"

function NavItem({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-secondary group"
    >
      <Icon className="h-4 w-4 mr-3 flex-shrink-0 group-hover:text-primary transition-colors" />
      <span className="truncate">{children}</span>
    </Link>
  )
}

export default function Sidebar() {
  return (
    <nav className="hidden lg:flex lg:flex-col lg:w-64 border-r border-border">
      <div className="h-full flex flex-col">
        <div className="h-20 px-6 flex items-center justify-between border-b border-border">
          <Link
            href="/"
            className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity"
          >
            <div className="flex-shrink-0">
              <Image
                src="/pitaka-pro-logo.png"
                alt="PitakaPro Logo"
                width={56}
                height={56}
                className="object-contain dark:invert"
              />
            </div>
            <span className="text-xl font-bold text-foreground">PitakaPro</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-4">
          <div className="space-y-1">
            <NavItem href="/dashboard" icon={LayoutDashboard}>
              Overview
            </NavItem>
            <NavItem href="/dashboard/transactions" icon={Wallet}>
              Transactions
            </NavItem>
            <NavItem href="/dashboard/accounts" icon={CreditCard}>
              Accounts
            </NavItem>
            <NavItem href="/dashboard/goals" icon={Target}>
              Goals
            </NavItem>
          </div>
        </div>

        <div className="px-4 py-6 border-t border-border space-y-2">
          <SettingsDialog />
          <HelpDialog />
        </div>
      </div>
    </nav>
  )
}

