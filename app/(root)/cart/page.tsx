import CartItems from "@/components/frontend/cart-items";
import CartSummary from "@/components/frontend/cart-summary";
import { Separator } from "@radix-ui/react-separator";

const Page = () => {
  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <Separator className="bg-gray-400 my-4 h-0.5" />
        <CartItems />
      </div>

      <CartSummary />
    </div>
  )
}

export default Page