"use server";

import * as admin from "firebase-admin";
import { checkAuthentication } from "./common";

export async function setLoanData(token, data, type) {
  let { decoded } = await checkAuthentication(token);
  console.log("decoded", decoded);
  console.log("data", JSON.stringify(data));
  if (decoded.role !== "Admin" && decoded.role !== "DSA") {
    return false;
  }

  const db = admin.firestore();
  let snapshot = await db.collection("personal_loans").get();
  let length = snapshot.size + 1;
  let loanData = getLoanType(type, length);
  data.status = "VERIFICATION";

  await db.collection(loanData.key).doc(loanData.value).set(data);

  console.log("loanData", loanData);
  return {
    loanID: loanData.value,
  };
}

const getLoanType = (type, length) => {
  let result = {
    key: "",
    value: "",
  };
  switch (type) {
    case "Personal":
      result.key = "personal_loans";
      result.value = "PL" + String(length).padStart(5, 0);
      break;
    case "Home":
      result.key = "home_loans";
      result.value = "HL" + String(length).padStart(5, 0);
      break;
    default:
      result.key = "personal_loans";
      result.value = "PL" + String(length).padStart(5, 0);
      break;
  }

  return result;
};
