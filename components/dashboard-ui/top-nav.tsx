"use client"

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../theme-toggle";

export default function TopNav() {
  return (
    <nav className="px-4 sm:px-8 flex items-center justify-between bg-background border-b border-border h-full">
      {/* Mobile Logo */}
      <div className="lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/pitaka-pro-logo.png"
            alt="PitakaPro Logo"
            width={32}
            height={32}
            className="object-contain dark:invert"
          />
          <span className="font-semibold text-lg">PitakaPro</span>
        </Link>
      </div>

      {/* Spacer to push the theme toggle to the right */}
      <div className="flex-grow" />

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
