"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { multiValueFilter } from "@/lib/utils";
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
    accessor: "id",
    header: "Loan ID",
    cell:({row})=><div>{row?.id}</div>,
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
    cell: ({ row }) => <div className="lowercase">{row.original.date}</div>,
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
    id: "view",
    header: "View",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/view/loans/${row?.id}`}>
          <Button size={'sm'} variant={"outline"} className={'cursor-pointer'}>View</Button>
        </Link>
      )
    },
  }


];
