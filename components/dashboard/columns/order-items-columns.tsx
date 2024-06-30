"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<TOrder>[] = [
  {
    accessorKey: "dish",
    header: "Dish",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/dishes/${row.original.dish._id}`}
          className="hover:text-red-500"
        >
          {row.original.dish.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];