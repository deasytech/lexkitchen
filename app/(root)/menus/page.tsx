import Image from "next/image"

const MenuPage = () => {
  return (
    <div className="px-10 max-sm:px-3">
      <Image
        src="/images/slides/slide-1.png"
        width={1500}
        height={1000}
        alt="menu"
        className="w-full h-60 object-cover object-top"
      />
      <div className="border-b -mx-10 border-gray-500" />
      <p className="text-heading3-bold my-10">Menus</p>
    </div>
  )
}

export default MenuPage