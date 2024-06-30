"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import Delete from "@/components/custom-ui/delete";
import { fancyDate } from "@/lib/utils";

export const columns: ColumnDef<TMenu>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/menus/${row.original._id}`}
        className="hover:text-red-500"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "dishes",
    header: "Dishes",
    cell: ({ row }) => <p>{row.original.dishes.length}</p>,
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