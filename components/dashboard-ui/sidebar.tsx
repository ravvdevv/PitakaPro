"use client"

import type React from "react"
import { LayoutDashboard, CreditCard, Wallet, PieChart, Target, Settings, HelpCircle, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-secondary group"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0 group-hover:text-primary transition-colors" />
        <span className="truncate">{children}</span>
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-background shadow-md border border-border"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5" />
      </button>

      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] w-64 bg-background transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:w-64 border-r border-border
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="/"
            className="h-20 px-6 flex items-center border-b border-border gap-3 hover:bg-secondary transition-colors"
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
              <NavItem href="/dashboard/budgets" icon={PieChart}>
                Budgets
              </NavItem>
              <NavItem href="/dashboard/goals" icon={Target}>
                Goals
              </NavItem>
            </div>
          </div>

          <div className="px-4 py-6 border-t border-border space-y-1">
            <NavItem href="#" icon={Settings}>
              Settings
            </NavItem>
            <NavItem href="#" icon={HelpCircle}>
              Help
            </NavItem>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
