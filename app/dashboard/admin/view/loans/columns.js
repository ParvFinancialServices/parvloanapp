"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { multiValueFilter } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const columns = [
  {
    accessor: "type",
    header: "Type",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
    filterable:true,
  },
  {
    accessor: "loanid",
    header: "Loan ID",
    enableColumnFilter: false,
  },
  {
    accessor: "Name",
    header: "Name",
    enableColumnFilter: false,
  },
  {
    accessor: "date",
    header: "date",
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
    enableColumnFilter: false,
  },
  {
    accessor: "id_of_connector",
    header: "Connector's ID",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
  },
  {
    accessor: "name_of_connector",
    header: "Connector's Name",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
  },
  {
    accessor: "status",
    header: "Status",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
  },
  {
    accessor:"edit",
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/admin/edit/loans?type=${row.original.type}&id=${row.original.loanid}`}
        >
          <Pencil height="16px"/>
        </Link>
      );
    },
    enableColumnFilter: false,
  },
];
