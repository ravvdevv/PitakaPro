"use client"
import type React from "react"
import { LogOut, MoveUpRight, Settings, FileText } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface MenuItem {
  label: string
  value?: string
  href: string
  icon?: React.ReactNode
  external?: boolean
}

interface Profile01Props {
  name: string
  role: string
  subscription?: string
}

// Initial profile data, either from localStorage or default
const getInitialProfile = (): Profile01Props => {
  if (typeof window !== 'undefined') {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      try {
        return JSON.parse(storedProfile);
      } catch (e) {
        console.error("Failed to parse profile from localStorage", e);
        localStorage.removeItem("profile"); // Clear corrupted data
      }
    }
  }
  return {
    name: "Raven",
    role: "Owner",
  };
};

export default function Profile01() {
  const [profile, setProfile] = useState<Profile01Props>(getInitialProfile());

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }, [profile]);


  const menuItems: MenuItem[] = [
    {
      label: "Settings",
      href: "#",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      label: "Terms & Policies",
      href: "#",
      icon: <FileText className="w-4 h-4" />,
      external: true,
    },
  ]

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="relative px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-8">
            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{profile.name}</h2>
              <p className="text-zinc-600 dark:text-zinc-400">{profile.role}</p>
            </div>
          </div>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-6" />
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-2 
                                    hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                                    rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
                </div>
                <div className="flex items-center">
                  {item.value && <span className="text-sm text-zinc-500 dark:text-zinc-400 mr-2">{item.value}</span>}
                  {item.external && <MoveUpRight className="w-4 h-4" />}
                </div>
              </Link>
            ))}

            <button
              type="button"
              className="w-full flex items-center justify-between p-2 
                                hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                                rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
