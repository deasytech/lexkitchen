"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { DataTable } from "@/components/custom-ui/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom-ui/loader";
import { columns } from "@/components/dashboard/columns/dish-columns";

const DishList = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);

  const getDishes = async () => {
    try {
      const res = await fetch("/api/dishes", {
        method: "GET",
      });
      const data = await res.json();
      setDishes(data);
    } catch (err) {
      setLoading(false);
      console.log("[dish_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDishes();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Dish</p>
        <Button className="bg-red-500 text-white" onClick={() => router.push("/dashboard/dishes/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Dish
        </Button>
      </div>
      <Separator className="bg-gray-500 my-4" />
      <DataTable columns={columns} data={dishes} searchKey="title" />
    </div>
  );
}

export default DishList