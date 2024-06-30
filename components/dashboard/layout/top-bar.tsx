"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { navLinks } from "@/lib/constants"

const TopBar = () => {
  const [ dropdownMenu, setDropdownMenu ] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 w-full flex justify-between items-center px-8 py-4 bg-red-50 shadow-xl lg:hidden">
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={93} height={50} />
      </Link>

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) =>
          <Link key={link.label} href={link.url} className={cn("flex gap-4 text-body-medium items-center", pathname === link.url ? "text-red-500" : "")}>
            <p>{link.label}</p>
          </Link>
        )}
      </div>

      <div className="relative flex gap-4 items-center">
        <MenuIcon className="cursor-pointer md:hidden" onClick={() => setDropdownMenu(!dropdownMenu)} />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) =>
              <Link key={link.label} href={link.url} className="flex gap-4 text-body-medium items-center">
                {link.icon}
                <p>{link.label}</p>
              </Link>
            )}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  )
}

export default TopBar