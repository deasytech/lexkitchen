"use client";

import { dollars } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<TOrderColumn>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/orders/${row.original._id}`}
          className="hover:text-red-500"
        >
          {row.original._id}
        </Link>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "dishes",
    header: "Dishes",
  },
  {
    accessorKey: "totalAmount",
    header: "Total ($)",
    cell: ({ row }) => <p>{dollars.format(row.original.totalAmount)}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];