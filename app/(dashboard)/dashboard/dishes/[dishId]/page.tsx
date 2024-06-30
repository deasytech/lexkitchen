import DishDetails from "@/components/dashboard/lists/dish"

const DishPage = ({ params }: { params: { dishId: string } }) => {
  return (
    <DishDetails dishId={params.dishId} />
  )
}

export default DishPage