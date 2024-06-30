"use client"

import useCart from "@/lib/hooks/use-cart"
import { cn } from "@/lib/utils"
import { UserButton, useUser } from "@clerk/nextjs"
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [ dropdownMenu, setDropdownMenu ] = useState(false);
  const [ query, setQuery ] = useState("");

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex items-center justify-between bg-white shadow-lg max-sm:px-2">
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={130} height={59} />
      </Link>

      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-red-500 ${pathname === "/" && "text-red-500"
            }`}
        >
          Home
        </Link>
        <Link
          href="/menus"
          className={`hover:text-red-500 ${pathname === "/menus" && "text-red-500"
            }`}
        >
          Menus
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-red-500 ${pathname === "/wishlist" && "text-red-500"
            }`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-red-500 ${pathname === "/orders" && "text-red-500"
            }`}
        >
          Orders
        </Link>
      </div>

      <div className="flex gap-3 border border-gray-300 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-red-500" />
        </button>
      </div>

      <div className="relative flex items-center gap-3">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden">
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>

        <Menu className="cursor-pointer lg:hidden" onClick={() => setDropdownMenu(!dropdownMenu)} />
        {dropdownMenu && (
          <div className="absolute top-10 right-5 flex flex-col gap-2 p-3 rounded-lg border bg-white text-base-bold">
            <Link href="/" className="hover:text-red-500 px-2">Home</Link>
            <Link href={cn(user ? "/wishlist" : "/sign-in")} className="hover:text-red-500 px-2">Wishlist</Link>
            <Link href={cn(user ? "/orders" : "/sign-in")} className="hover:text-red-500 px-2">Orders</Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-red-500 hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}
        {user ? <UserButton afterSignOutUrl="/sign-in" /> : <Link href="/sign-in"><CircleUserRound /></Link>}
      </div>
    </div>
  )
}

export default Navbar