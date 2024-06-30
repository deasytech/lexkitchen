"use client"

import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import { navLinks } from '@/lib/constants'

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-red-50 shadow-xl max-lg:hidden">
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={93} height={50} />
      </Link>

      <div className="flex flex-col gap-12">
        {navLinks.map((link) =>
          <Link key={link.label} href={link.url} className={cn("flex gap-4 text-body-medium items-center", pathname === link.url ? "text-red-500" : "")}>
            {link.icon}
            <p>{link.label}</p>
          </Link>
        )}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p>Profile</p>
      </div>
    </div>
  )
}

export default LeftSideBar