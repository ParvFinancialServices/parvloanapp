"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { multiValueFilter } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { Pencil } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
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
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/admin/profile?username=${row.original.username}`}
        >
          <Button variant="outline" className={'cursor-pointer'} size="sm">
           View Profile 
          </Button>
        </Link>
      );
    },
    enableColumnFilter: false,
  },
];
