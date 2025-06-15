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
  // let query = db.collection("loans").where("type", type);
  let query = db.collection("loans").where("type","==", type);
  let snapshot = query.get();
  let length = snapshot.size + 1;
  let loanData = getLoanType(type, length);
  data.status = "Received";
  data.date = new Date().toDateString();
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

      return { data: JSON.stringify(data) };
  }
}

export async function getLoanDataByUsername(token, username) {
  await checkAuthentication(token);
  const db = admin.firestore();

  if (!username) {
    throw new Error("Username is required");
  }

  let data = [];
  // const query = db.collection("loans").where("username", "==", username);
  const query = db.collection("loans").where("id_of_connector", "==", username);
  const snapshot = await query.get();

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, data: doc.data() });
  });

  return { data };
}


export async function getLoanByID(token, id) {
  await checkAuthentication(token);
  const db = admin.firestore();
  let query = db.collection("loans").doc(id);
  let snapshot = await query.get();

  return { id: snapshot.id, data: snapshot.data() };
}

export async function setLoanByID(token, id, data) {
  await checkAuthentication(token);
  const db = admin.firestore();

  try {
    await db.collection("loans").doc(id).set(data);
    return { msg: "success" };
  } catch (err) {
    return {
      err: err,
    };
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
    case "Vehicle":
      res = "VL" + String(length).padStart(5, 0);
      break;
    default:
      res = "PL" + String(length).padStart(5, 0);
      break;
  }

  return res;
};


export async function updateLoanStatus(token, id, newStatus) {
   await checkAuthentication(token);

  const db = admin.firestore();
  try {
    const loanRef = db.collection("loans").doc(id);
    const snapshot = await loanRef.get();

    if (!snapshot.exists) {
      return { success: false, message: "Loan not found" };
    }

    await loanRef.update({ status: newStatus });
    return { success: true, message: "Status updated successfully" };
  } catch (error) {
    console.error("Status update error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function saveApplicationData(token, { connectorId, income, paid, unpaid }) {

   await checkAuthentication(token);
  // if (decoded.role !== "Admin") return { success: false };
  const db = admin.firestore();
  await db.collection("dsa_income").add({
    connectorId,
    income: Number(income),
    paid: Number(paid),
    unpaid: Number(unpaid),
    createdAt: new Date(),
  });

  return { success: true, message: "Application data saved successfully" };
} 

export async function getConnectorIncomes(token, connectorId) {
  await checkAuthentication(token);

  if (!connectorId) {
    return { success: false, message: "Connector ID is required" };
  }

  // if (decoded.role !== "Admin" && decoded.role !== "DSA") {
  //   return { success: false, message: "Unauthorized" };
  // }

  try {
    const db = admin.firestore();
    const snapshot = await db
      // .collection("dsa_income")
      .collection("applications")
      .where("connectorId", "==", connectorId)
      .get();

    // const data = [];
    // snapshot.forEach((doc) => {
    //   data.push({ id: doc.id, ...doc.data() });
    // });


     const data = [];
    snapshot.forEach((doc) => {
      const docData = doc.data();

      // Convert Firestore Timestamp to plain string
      const createdAt = docData.createdAt?.toDate?.().toISOString() || null;

      data.push({
        id: doc.id,
        ...docData,
        createdAt, // override with stringified date
      });
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching connector incomes:", error);
    return { success: false, message: "Failed to fetch income data" };
  }
}
