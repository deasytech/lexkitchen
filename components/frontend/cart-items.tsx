"use client"

import useCart from "@/lib/hooks/use-cart"
import { dollars } from "@/lib/utils";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";

const CartItems = () => {
  const cart = useCart();

  return (
    <>
      {cart.cartItems.length === 0 ? (
        <p className="text-body-bold">No item in cart</p>
      ) : (
        <div>
          {cart.cartItems.map((item) => (
            <div key={item.item._id} className="w-full flex max-lg:flex-col max-sm:gap-3 hover:bg-gray-300 px-6 py-5 justify-between items-center max-sm:items-start">
              <div className="flex items-center">
                <Image
                  src={item.item.media[ 0 ]}
                  alt={item.item.title}
                  width={100}
                  height={100}
                  className="rounded-lg w-32 h-32 object-cover"
                />
                <div className="flex flex-col gap-3 ml-4">
                  <p className="text-body-bold">{item.item.title}</p>
                  {item.size && (
                    <p className="text-small-medium">{item.size}</p>
                  )}
                  <p className="text-small-medium">{dollars.format(item.item.price)}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <MinusCircle
                  className="hover:text-red-500 cursor-pointer"
                  onClick={() => cart.decreaseQuantity(item.item._id)}
                />
                <p className="text-body-bold">{item.quantity}</p>
                <PlusCircle className="hover:text-red-500 cursor-pointer" onClick={() => cart.increaseQuantity(item.item._id)} />
              </div>

              <Trash className="hover:text-red-500 cursor-pointer" onClick={() => cart.removeItem(item.item._id)} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default CartItems