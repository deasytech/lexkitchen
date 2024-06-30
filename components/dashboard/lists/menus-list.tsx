"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { DataTable } from "@/components/custom-ui/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom-ui/loader";
import { columns } from "@/components/dashboard/columns/menu-columns";

const MenusList = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  const getMenus = async () => {
    try {
      const res = await fetch("/api/menus", {
        method: "GET",
      });
      const data = await res.json();
      setMenus(data);
      setLoading(false);
    } catch (err) {
      console.log("[menu_GET]", err);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Menus</p>
        <Button className="bg-red-500 text-white" onClick={() => router.push("/dashboard/menus/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Menu
        </Button>
      </div>
      <Separator className="bg-gray-500 my-4" />
      <DataTable columns={columns} data={menus} searchKey="title" />
    </div>
  );
}

export default MenusList