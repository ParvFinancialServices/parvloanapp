import { Button } from "@/components/ui/button";
import { DataTable } from "./DataTable";
import { useState } from "react";

export default function Table({ data, columns, filter, filterData }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);

  console.log(filter);

  return (
    <div className="flex flex-col gap-4 w-full">
      <DataTable
        columns={columns}
        data={data}
        filter={filter}
        filterData={filterData}
      />
    </div>
  );
}
