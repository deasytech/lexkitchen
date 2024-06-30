"use client"

import { useEffect, useState } from "react";

import { DataTable } from "@/components/custom-ui/data-table";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom-ui/loader";
import { columns } from "@/components/dashboard/columns/order-columns";

const OrderList = () => {
  const [ loading, setLoading ] = useState(true);
  const [ orders, setOrders ] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "GET",
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setLoading(false);
      console.log("[dish_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-gray-500 my-4" />
      <DataTable columns={columns} data={orders} searchKey="name" />
    </div>
  );
}

export default OrderList