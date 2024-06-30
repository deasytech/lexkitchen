import DishCard from '@/components/frontend/cards/dish-card';
import DishInfo from '@/components/frontend/dish-info';
import Gallery from '@/components/frontend/gallery';
import { getDishDetails, getRelatedDishes } from '@/lib/actions'

const Page = async ({ params }: { params: { dishId: string } }) => {
  const dishDetails = await getDishDetails(params.dishId);
  const relatedDishes = await getRelatedDishes(params.dishId)

  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery dishMedia={dishDetails.media} />
        <DishInfo dishInfo={dishDetails} />
      </div>

      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="text-heading3-bold">Similar Dishes</p>
        <div className="flex flex-wrap gap-16 mx-auto mt-8">
          {relatedDishes?.map((dish: TDish) => (
            <DishCard key={dish._id} dish={dish} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Page