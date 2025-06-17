// app/actions/telecaller.js
'use server';

import * as admin from "firebase-admin"; 
import { checkAuthentication } from './common';


// export async function fetchTelleCallerDailyReport(token, selectedDate = null) {
//   await checkAuthentication(token);

//   const db = admin.firestore();

//   const date = selectedDate ? new Date(selectedDate) : new Date();

//   const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
//   const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

//   try {
//     const querySnapshot = await db
//       .collection('telecaller_summaries')
//       .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
//       .where('createdAt', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
//       .orderBy('createdAt', 'desc')
//       .get();

//     const reports = [];
//     querySnapshot.forEach((doc) => {
//       reports.push({ id: doc.id, ...doc.data() });
//     });

//     return { success: true, reports };
//   } catch (error) {
//     console.error('Error fetching telecaller reports:', error);
//     return { success: false, error: error.message };
//   }
// }



export async function fetchTelleCallerDailyReport(token, selectedDate = null) {
  await checkAuthentication(token);

  const db = admin.firestore();

  const date = selectedDate ? new Date(selectedDate) : new Date();

  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

  try {
    const querySnapshot = await db
      .collection('telecaller_summaries')
      .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
      .where('createdAt', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
      .orderBy('createdAt', 'desc')
      .get();

    const reports = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // ✅ Convert Timestamp to ISO string or regular Date string
      const createdAt = data.createdAt?.toDate?.().toISOString() || null;

      reports.push({
        id: doc.id,
        ...data,
        createdAt, // Now it's a string
      });
    });

    return { success: true, reports };
  } catch (error) {
    console.error('Error fetching telecaller reports:', error);
    return { success: false, error: error.message };
  }
}

