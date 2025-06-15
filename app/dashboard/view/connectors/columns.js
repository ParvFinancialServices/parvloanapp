"use client";


import { Button } from "@/components/ui/button";
import { multiValueFilter } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { Pencil } from "lucide-react";
import Link from "next/link";


export const columns = [
  {
    accessorKey: "role",
    header: "Type",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
  },
  {
    accessorKey: "username",
    header: "Username",
    enableColumnFilter: false,
  },
  {
    accessorKey: "full_name",
    header: "Name",
    enableColumnFilter: false,
  },
  {
    accessorKey: "date_of_joining",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Joining
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date_of_joining")}</div>,
    enableColumnFilter: false,
  },
  // {
  //   accessorKey: "guardian_name",
  //   header: ({ column }) => {
  //     return (
  //       ''
  //     );
  //   },
  // },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/admin/profile?username=${row.original.username}&role=DSA`}
        >
          <Pencil height="16px" />
        </Link>
      );
    },
    enableColumnFilter: false,
  },
];
