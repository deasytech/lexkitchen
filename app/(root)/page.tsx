import DishList from "@/components/frontend/dish-list";
import Menus from "@/components/frontend/menus";
import Slideshow from "@/components/frontend/slideshow";

export default function Home() {
  return (
    <>
      <Slideshow />
      <Menus />
      <DishList />
    </>
  );
}
