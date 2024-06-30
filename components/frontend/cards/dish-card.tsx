import { dollars } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import LikeItem from "@/components/frontend/like-item";

interface DishCardProps {
  dish: TDish;
  updateSignedInUser?: (updatedUser: TUser) => void;
}

const DishCard = ({ dish, updateSignedInUser }: DishCardProps) => {
  return (
    <Link href={`/dishes/${dish._id}`} className="w-[250px] flex flex-col gap-2">
      <Image 
        src={dish.media[ 0 ]} 
        alt={dish.title} 
        width={250} 
        height={250} 
        className="h-[250px] rounded-lg object-cover" 
      />
      <div>
        <p className="text-base-bold">{dish.title}</p>
        <p className="text-base-medium text-gray-400">{dish.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">{dollars.format(dish.price)}</p>
        <LikeItem dishId={dish._id} updateSignedInUser={updateSignedInUser} />
      </div>
    </Link>
  )
}

export default DishCard