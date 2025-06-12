"use client";

import { useUserState } from "@/app/dashboard/store";
import { getLoanByID } from "@/lib/actions/loan";
import { useEffect, useState } from "react";
import BusinessLoan from "./business_loan";
import GoldLoan from "./gold_loan";
import HomeLoan from "./home_loan";
import PersonalLoan from "./personal_loan";
import VehicleLoan from "./vehicle_loan";

export default function Page({ params }) {
  const userState = useUserState();
  const [data, setData] = useState({});

  useEffect(() => {
    userState.user.getIdToken().then((token) => {
      getLoanByID(token, params.id).then((res) => {
        console.log(res);
        setData(res);
      });
    });
  }, []);

  if (data.data) {
    switch (data.data.type) {
      case "Business":
        return <BusinessLoan initialData={data.data} id={data.id} />;
      case "Gold":
        return <GoldLoan initialData={data.data} id={data.id} />;
      case "Home":
        return <HomeLoan initialData={data.data} id={data.id} />;
      case "Personal":
        return <PersonalLoan initialData={data.data} id={data.id} />;
      case "Vehicle":
        return <VehicleLoan initialData={data.data} id={data.id} />;
    }
  }

  return "loading...";
}
