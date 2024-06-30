"use client"

import Loader from "@/components/custom-ui/loader"
import DishCard from "@/components/frontend/cards/dish-card"
import { getDishDetails } from "@/lib/actions"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useEffect, useState } from "react"

const WishList = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false)
  const [signedInUser, setSignedInUser] = useState<TUser | null>(null)
  const [wishlist, setWishlist] = useState<TDish[]>([])

  const getUser = async () => {
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      setSignedInUser(data)
      setLoading(false)
    } catch (err) {
      console.log("[users_GET", err)
    }
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  const getWishlistDishes = async () => {
    setLoading(true)

    if (!signedInUser) return

    const wishlistDishes = await Promise.all(signedInUser.wishList.map(async (dishId) => {
      const res = await getDishDetails(dishId)
      return res;
    }));

    setWishlist(wishlistDishes)
    setLoading(false)
  }

  useEffect(() => {
    if (signedInUser) {
      getWishlistDishes()
    }
  }, [signedInUser])

  const updateSignedInUser = (updatedUser: TUser) => {
    setSignedInUser(updatedUser)
  }


  return loading ? <Loader /> : (
    <div className="px-10">
      <Image
        src="/images/slides/slide-1.png"
        width={1500}
        height={1000}
        alt="menu"
        className="w-full h-60 object-cover object-top"
      />
      <div className="border-b -mx-10 border-gray-500" />
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist.length === 0 && (
        <p>No items in your wishlist</p>
      )}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((dish) => (
          <DishCard key={dish._id} dish={dish} updateSignedInUser={updateSignedInUser}/>
        ))}
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default WishList