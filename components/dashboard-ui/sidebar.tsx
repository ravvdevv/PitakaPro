"use client"

import { useState, useEffect } from "react"
import { LayoutDashboard, CreditCard, Wallet, PieChart, Target, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { HelpDialog } from "@/components/dashboard-ui/help-dialog"
import { SettingsDialog } from "@/components/dashboard-ui/settings-dialog"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  function handleNavigation() {
    setIsMobileMenuOpen(false);
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
        className={`lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-background shadow-md border border-border transition-transform duration-200 ${
          isMobileMenuOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
        }`}
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <nav
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-background transform transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto lg:w-64 border-r border-border shadow-xl lg:shadow-none
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="h-20 px-6 flex items-center justify-between border-b border-border">
            <Link
              href="/"
              className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity"
              onClick={handleNavigation}
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
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-full hover:bg-accent transition-colors"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
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
              <NavItem href="/dashboard/budgets" icon={PieChart}>
                Budgets
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

      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}

