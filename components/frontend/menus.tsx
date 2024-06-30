import Image from "next/image";
import Link from "next/link";

import { getMenus } from "@/lib/actions"

const Menus = async () => {
  const menus = await getMenus();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Menus</p>
      <div className="flex flex-wrap justify-center gap-8">
        {menus.length > 0 ? menus.map((menu: TMenu) => (
          <Link key={menu._id} href={`/menus/${menu._id}`}>
            <Image 
              src={menu.image} 
              alt={menu.title} 
              width={400} 
              height={200} 
              className="rounded-lg border border-gray-500" 
            />
          </Link>
        )) : (<p className="text-body-bold">No menus found!</p>)}
      </div>
    </div>
  )
}

export default Menus