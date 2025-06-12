"use client";

import { Badge } from "@/components/ui/badge";
import { multiValueFilter } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const columns = [
  {
    accessor: "type",
    header: "Type",
    enableColumnFilter: true,
    filterFn: multiValueFilter,
    filterable: true,
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
    accessor: "edit",
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/admin/edit/loan/${row.original.loanid}`}>
          <PencilIcon height="16px" />
        </Link>
      );
    },
    enableColumnFilter: false,
  },
];
