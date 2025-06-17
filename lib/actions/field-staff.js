'use server';
import * as admin from "firebase-admin";
import { checkAuthentication } from "./common";




export async function submitDailyVisitReport(token, reportData) {
  await checkAuthentication(token); // Ensure user is authenticated

  const db = admin.firestore();

  try {
    const docRef = await db.collection("daily_visits").add({
      ...reportData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting report:", error);
    return { success: false, error: error.message };
  }
}

// export async function getDailyVisitReports(token) {
//   await checkAuthentication(token); // Ensure user is authenticated
//   try {
//     const db = admin.firestore();
//     // const snapshot = await db.collection("daily_visits").orderBy("createdAt", "desc").get();
//     const snapshot = await db.collection("daily_visits")?.get();
//     console.log(snapshot);

//     let reports = {};
//     snapshot.forEach((doc) => {
//       reports[doc.id] = doc.data();
//       // .push({ id: doc.id, ...doc.data() });
//     });
//     console.log(reports);

//     return { success: true, reports: reports };
//   } catch (error) {
//     console.error("Error fetching reports:", error);
//     return { success: false, error: error.message };
//   }
// }
export async function getDailyVisitReports(token) {
  await checkAuthentication(token); // Ensure user is authenticated

  try {
    const db = admin.firestore();
    const snapshot = await db.collection("daily_visits").get();

    const reports = [];

    snapshot.forEach((doc) => {
      reports.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Serialize the reports array before returning
    const serializedReports = JSON.parse(JSON.stringify(reports));

    return { success: true, reports: serializedReports };
  } catch (error) {
    console.error("Error fetching reports:", error);
    return { success: false, error: error.message };
  }
}


