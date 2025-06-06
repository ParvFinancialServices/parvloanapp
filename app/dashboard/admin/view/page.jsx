"use client";
import React, { useState, useEffect } from "react";
import { useUserState } from "../../store";
import { getLoanData } from "@/lib/actions/loan";

const Page = () => {
  const userState = useUserState();

  useEffect(() => {
    console.log(userState);
    userState.user.getIdToken().then((token) => {
      console.log(token);
      getLoanData(token, "").then((res) => {
        console.log(res);
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

  return "hello";
};


export default Page;