"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/custom-ui/data-table";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom-ui/loader";
import { columns } from "@/components/dashboard/columns/customer-columns";

const CustomerList = () => {
  const router = useRouter();

  const [ loading, setLoading ] = useState(true);
  const [ customers, setCustomers ] = useState([]);

  const getCustomers = async () => {
    try {
      const res = await fetch("/api/customers", {
        method: "GET",
      });
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      setLoading(false);
      console.log("[customer_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Customer</p>
      <Separator className="bg-gray-500 my-4" />
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  );
}

export default CustomerList