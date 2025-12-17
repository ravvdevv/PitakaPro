"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CreditCard, Wallet, Target, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/accounts", icon: CreditCard, label: "Accounts" },
  { href: "/dashboard/transactions", icon: Wallet, label: "Transactions" },
  { href: "/dashboard/goals", icon: Target, label: "Goals" },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href} className="flex flex-col items-center justify-center w-full h-full">
              <Icon
                className={cn(
                  "h-6 w-6 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs mt-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
