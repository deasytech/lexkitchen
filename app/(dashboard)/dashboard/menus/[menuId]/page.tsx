import MenuDetails from "@/components/dashboard/lists/menu"

const Page = ({ params }: { params: { menuId: string } }) => {
  return (
    <MenuDetails menuId={params.menuId} />
  )
}

export default Page