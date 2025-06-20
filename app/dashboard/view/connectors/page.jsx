"use client";

// import { useUserState } from "@/app/dashboard/store";
import { Button } from "@/components/ui/button";
import { get } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { columns } from "./columns";
import Table from "@/components/common/Table";
// import { getConnectorsData } from "@/lib/actions/connector";
import { useUserState } from "@/app/dashboard/store";
import { getConnectorsData } from "@/lib/actions/file_action";
import Spinners from "@/components/common/Spinners";

export const extractTableData = (data, list) => {
  let result = [];
  data.forEach((e) => {
    result.push({
      role: get(e, list[3]),
      username: get(e, list[2]),
      name: get(e, list[0]),
      doj: get(e, list[1]),
      edit: "edit",
    });
  });
  console.log(result);
  return result;
};

export default function Page() {
  const userState = useUserState();
  let [data, setData] = useState([]);
  let [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let filterData = [];

  let list = [
    "info.sections[0].fields[0].value",
    "info.sections[1].fields[0].value",
    "username",
    "role",
  ];

  useEffect(() => {
    userState.user.getIdToken().then((token) => {
      console.log(token);
      getConnectorsData(token).then((res) => {
        console.log(res);
        // const result = extractTableData(res.data, list);
        // let d = {
        //   //   connector_id: extractParticularField(list[0], res.data),
        //   //   connector_name: extractParticularField(list[1], res.data),
        //   //   type: extractParticularField(list[2], res.data),
        //   //   status: extractParticularField(list[3], res.data),
        // };
        // console.log(result);
        // console.log(d);
        setData(res?.data);
        // setFilter(d);
        setIsLoading(false);
      });
    });
  }, []);


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
        <div>
          <Spinners/>
        </div>
      )}
    </div>
  );
}
