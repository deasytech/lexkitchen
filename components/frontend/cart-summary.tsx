"use client"

import useCart from "@/lib/hooks/use-cart"
import { dollars } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const CartSummary = () => {
  const cart = useCart();
  const router = useRouter();
  const { user } = useUser();

  const total = cart.cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0);

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const res = await fetch("/api/checkout", {
          method: "POST",
          body: JSON.stringify({ cartItems: cart.cartItems, customer }),
        });
        const data = await res.json();
        window.location.href = data.url;
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };

  return (
    <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-gray-300 rounded-lg px-4 py-5">
      <p className="text-heading4-bold pb-4">
        Summary <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "Items" : "Item"})`}</span>
      </p>
      <div className="flex flex-col gap-4 justify-between h-full">
        <div className="flex justify-between text-body-semibold">
          <span>Total: </span>
          <span>{dollars.format(total)}</span>
        </div>
        <Button variant="outline" className="hover:bg-red-500 hover:text-white" onClick={handleCheckout}>Proceed to Checkout</Button>
      </div>
    </div>
  )
}

export default CartSummary