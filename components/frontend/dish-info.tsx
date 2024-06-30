"use client"

import { cn, dollars } from "@/lib/utils";
import LikeItem from "./like-item";
import { useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCart from "@/lib/hooks/use-cart";

const DishInfo = ({ dishInfo }: { dishInfo: TDish }) => {
  const [ price, setPrice ] = useState(dishInfo.price);
  const [ selectedSize, setSelectedSize ] = useState<string>(dishInfo.sizes[ 0 ]);
  const [ quantity, setQuantity ] = useState(1);
  const cart = useCart();

  const handlePrice = (size: string) => {
    setSelectedSize(size);
    if (size === "Full Pan") {
      setPrice(dishInfo.price * 2);
    } else {
      setPrice(dishInfo.price);
    }
  }

  return (
    <div className="w-full max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{dishInfo.title}</p>
        <LikeItem dishId={dishInfo._id} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-gray-400">Category:</p>
        <p className="text-small-bold">{dishInfo.category}</p>
      </div>

      <p className="text-heading3-bold">{dollars.format(price)}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-gray-400">Description:</p>
        <p className="text-small-medium leading-6">{dishInfo.description}</p>
      </div>

      {dishInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-gray-400">Sizes:</p>
          <div className="flex gap-3">
            {dishInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={cn("border border-black px-3 py-1 rounded-lg cursor-pointer", selectedSize === size && "bg-black text-white")}
                onClick={() => handlePrice(size)}
              >{size}</p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-gray-400">Quantity</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-500 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle className="hover:text-red-500 cursor-pointer" onClick={() => setQuantity(quantity + 1)} />
        </div>
      </div>

      <Button onClick={() => cart.addItem({ item: dishInfo, quantity, size: selectedSize })}>Add to Cart</Button>
    </div>
  )
}

export default DishInfo