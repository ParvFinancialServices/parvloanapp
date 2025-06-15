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
    accessorKey: "type",
    header: "Type",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
  },
  {
    accessorKey: "loanid",
    header: "Loan ID",
    enableColumnFilter: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
    enableColumnFilter: false,
  },
  {
    accessorKey: "connector_id",
    header: "Connector's ID",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
  },
  {
    accessorKey: "connector_name",
    header: "Connector's Name",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/admin/edit/loans?type=${row.original.type}&id=${row.original.loanid}`}
        >
          <Pencil height="16px"/>
        </Link>
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <MoreHorizontal />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <Link
        //       href={`/dashboard/admin/edit/loans?type=${row.original.type}&id=${row.original.loanid}`}
        //     >
        //       <DropdownMenuItem>Edit</DropdownMenuItem>
        //     </Link>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
    enableColumnFilter: false,
  },
];
