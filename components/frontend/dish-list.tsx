import { getLastestDishes } from "@/lib/actions"
import DishCard from "./cards/dish-card";

const DishList = async () => {
  const dishes = await getLastestDishes(4);

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Dishes</p>
      {!dishes || dishes.length === 0 ? (
        <p className="text-body-bold">No dishes found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {dishes.map((dish: TDish) => (
            <DishCard key={dish._id} dish={dish} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DishList