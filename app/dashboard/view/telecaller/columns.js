"use client";

import AssignmentDialog from "@/components/common/AssignmentDialog";
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
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: false,
  },
  {
    accessorKey: "doj",
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("doj")}</div>,
    enableColumnFilter: false,
  },
  {
    id: "add_assignment",
    enableHiding: false,
    cell: ({ row }) => {
      return <AssignmentDialog username={row.original.username} />;
    },
    enableColumnFilter: false,
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/admin/edit/profile?username=${row.original.username}&role=Telecaller`}
        >
          <Pencil height="16px" />
        </Link>
      );
    },
    enableColumnFilter: false,
  },
];
