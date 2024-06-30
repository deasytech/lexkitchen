"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import Delete from "@/components/custom-ui/delete";
import { dollars, fancyDate } from "@/lib/utils";

export const columns: ColumnDef<TDish>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/dishes/${row.original._id}`}
        className="hover:text-red-500"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <p>{row.original.category}</p>,
  },
  {
    accessorKey: "menus",
    header: "Menus",
    cell: ({ row }) => row.original.menus.map((menu) => menu.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => <p>{dollars.format(row.original.price)}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <p>{fancyDate(row.original.createdAt)}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="menu" id={row.original._id} />,
  },
];