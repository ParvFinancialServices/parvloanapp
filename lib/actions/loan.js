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
  let snapshot = await db.collection("loans").get();
  let length = snapshot.size + 1;
  let loanData = getLoanType(type, length);
  data.status = "VERIFICATION";
  data.date = new Date();
  data.type = type;

  await db.collection("loans").doc(loanData).set(data);
  return {
    loanID: loanData,
  };
}

export async function getLoanData(token, type) {
  await checkAuthentication(token);
  const db = admin.firestore();
  let data = [];
  let query;
  let snapshot;
  switch (type) {
    case "Personal":
      query = db.collection("loans").where("type", "Personal");
      snapshot = await query.get();

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });

      return { data };
    case "Business":
      query = db.collection("loans").where("type", "Business");
      snapshot = await query.get();

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });

      return { data };
    case "Gold":
      query = db.collection("loans").where("type", "Gold");
      snapshot = await query.get();

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });

      return { data };
    default:
      query = db.collection("loans");
      snapshot = await query.get();

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });

      return { data };
  }
}

const getLoanType = (type, length) => {
  let res;
  switch (type) {
    case "Personal":
      res = "PL" + String(length).padStart(5, 0);
      break;
    case "Home":
      res = "HL" + String(length).padStart(5, 0);
      break;
    case "Business":
      res = "BL" + String(length).padStart(5, 0);
      break;
    case "Gold":
      res = "GL" + String(length).padStart(5, 0);
      break;
    default:
      res = "PL" + String(length).padStart(5, 0);
      break;
  }

  return result;
};
