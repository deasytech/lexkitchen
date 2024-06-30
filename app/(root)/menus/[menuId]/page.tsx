import DishCard from "@/components/frontend/cards/dish-card";
import { getMenuDetails } from "@/lib/actions";
import Image from "next/image";

const MenuDetails = async ({
  params,
}: {
  params: { menuId: string };
}) => {
  const menuDetails = await getMenuDetails(params.menuId);

  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        src={menuDetails.image}
        width={1500}
        height={1000}
        alt="menu"
        className="w-full object-contain"
      />
      <div className="flex flex-col items-center gap-8 px-10">
        <p className="text-heading3-bold text-grey-2">{menuDetails.title}</p>
        <p className="text-body-normal text-grey-2 text-center max-w-[900px]">{menuDetails.description}</p>
        <div className="flex flex-wrap gap-16 justify-center">
          {menuDetails.dishes.map((dish: TDish) => (
            <DishCard key={dish._id} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;

export const dynamic = "force-dynamic";