"use client";

import { columns } from "./columns";
import { getLoanData } from "@/api/file_action";
import { useEffect } from "react";
import { useState } from "react";
import { extractParticularField, extractTableData } from "@/lib/utils";
import { useUserState } from "@/app/dashboard/store";
import Table from "@/comp/Table";
import { Button } from "@/components/ui/button";

export default function Page() {
  const userState = useUserState();
  let [data, setData] = useState([]);
  let [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let list = [
    "formData.connectorID",
    "formData.name_of_connector",
    "type",
    "status",
  ];

  let filterData = [
    {
      id: "connector_id",
      value: ["all"],
    },
    {
      id: "connector_name",
      value: ["all"],
    },
    {
      id: "type",
      value: ["all"],
    },
    {
      id: "status",
      value: ["all"],
    },
  ];

  console.log(data);
  

  useEffect(() => {
    userState.user.getIdToken().then((token) => {
      console.log(token);
      getLoanData(token, "Personal").then((res) => {
        console.log(res);
        const result = extractTableData(res.data, "Personal");
        let d = {
          connector_id: extractParticularField(list[0], res.data),
          connector_name: extractParticularField(list[1], res.data),
          type: extractParticularField(list[2], res.data),
          status: extractParticularField(list[3], res.data),
        };
        console.log(result);
        console.log(d);
        setData(result);
        setFilter(d);
        setIsLoading(false);
      });
    });
  }, []);

  // type of loan
  // loan ID
  // name
  // date
  // connector name
  // connector ID
  // view/edit

  function exportTableToExcel(tableId) {
    // Get the table element using the provided ID
    const table = document.getElementById(tableId).cloneNode(true);
    const filterElements = table.querySelectorAll(".filter-element");
    console.log(filterElements);
    filterElements.forEach((e) => {
      console.log(e);
      e.parentElement.removeChild(e);
    });

    // Extract the HTML content of the table
    const html = table.outerHTML;
    console.log(html);

    // Create a Blob containing the HTML data with Excel MIME type
    const blob = new Blob([html], { type: "application/vnd.ms-excel" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element for downloading
    const a = document.createElement("a");
    a.href = url;

    // Set the desired filename for the downloaded file
    a.download = "table.xls";

    // Simulate a click on the anchor to trigger download
    a.click();

    // Release the URL object to free up resources
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container mx-auto p-4 flex flex-col gap-2">
      <div className="flex items-center justify-end gap-4">
        <Button>Filter</Button>
        <Button className="w-fit" onClick={() => exportTableToExcel("myTable")}>
          Download
        </Button>
      </div>
      {!isLoading ? (
        <Table
          columns={columns}
          data={data}
          filter={filter}
          filterData={filterData}
        />
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
