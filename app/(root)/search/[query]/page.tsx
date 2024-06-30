import DishCard from '@/components/frontend/cards/dish-card'
import { getSearchedDishes } from '@/lib/actions'

const SearchPage = async ({ params }: { params: { query: string }}) => {
  const searchedDishes = await getSearchedDishes(params.query)

  const decodedQuery = decodeURIComponent(params.query)

  return (
    <div className='px-10 py-5'>
      <p className='text-heading3-bold my-10'>Search results for {decodedQuery}</p>
      {!searchedDishes || searchedDishes.length === 0 && (
        <p className='text-body-bold my-5'>No result found</p>
      )}
      <div className='flex flex-wrap justify-between gap-16'>
        {searchedDishes?.map((dish: TDish) => (
          <DishCard key={dish._id} dish={dish} />
        ))}
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default SearchPage