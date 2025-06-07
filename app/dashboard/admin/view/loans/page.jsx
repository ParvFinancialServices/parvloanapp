"use client";
import { useEffect, useState } from "react";
import { getLoanData } from "@/lib/actions/loan";
import { useUserState } from "@/app/dashboard/store";
import LoanDataTable from "./loan_data_table";
import { columns } from "./columns";

const Page = () => {
  const userState = useUserState();
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(userState);
    userState.user.getIdToken().then((token) => {
      console.log(token);
      getLoanData(token, "").then((res) => {
        console.log(JSON.parse(res.data));
        setData(JSON.parse(res.data));
        // const result = extractTableData(res.data, "");
        // console.log(result);
        // let d = {
        //   connector_id: extractParticularField(list[0], res.data),
        //   connector_name: extractParticularField(list[1], res.data),
        //   type: extractParticularField(list[2], res.data),
        //   status: extractParticularField(list[3], res.data),
        // };
        // console.log(d);
        // setData(result);
        // setFilter(d);
        // setIsLoading(false);
      });
    });
  }, []);

  return (
    <div>
      <LoanDataTable columns={columns} initialData={data} pageSize={10} />
    </div>
  );
};

export default Page;
