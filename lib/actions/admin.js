// actions/createContactSubmission.ts
"use server";

import * as admin from "firebase-admin";
import { v4 as uuid } from "uuid";
import { getApp } from "./common";

export async function createContactSubmission(data) {
  getApp(); // initialize Firebase Admin if not already
  const db = admin.firestore();

  try {
    const id = uuid();
    const doc = {
      id,
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      street: data?.street || "",
      city: data?.city || "",
      postcode: data?.postcode || "",
      message: data?.message || "",
      createdAt: new Date().toISOString(),
    };

    await db.collection("contact_forms").doc(id).set(doc);

    return { success: true, data: doc };
  } catch (err) {
    console.error("[CONTACT_FORM_ERROR]", err);
    return { success: false, message: "Failed to submit contact form" };
  }
}

export async function getAllContactSubmissions() {
  getApp(); 
  const db = admin.firestore();

  try {
    const snapshot = await db
      .collection("contact_forms")
      .orderBy("createdAt", "desc")
      .get();

    const data = snapshot.docs.map(doc => doc.data());

    return { success: true, data };
  } catch (err) {
    console.error("[GET_CONTACTS_ERROR]", err);
    return { success: false, message: "Failed to fetch contact submissions" };
  }
}