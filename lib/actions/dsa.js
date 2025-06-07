"use server";

import { db, storage } from "@/lib/firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { getApp } from "./common";
import { sendMail } from "./mail";
import * as admin from "firebase-admin";
import * as crypto from "crypto";
import { redirect } from "next/navigation";

export async function createDSAAccount(data) {
  getApp();
  let db = admin.firestore();
  let snapshot = await db.collection("creds").where("role", "==", "DSA").get();
  let length = snapshot.size + 1;

  let username = "DSA" + length;
  let salt = crypto.randomBytes(16).toString("hex");
  let pass = data.full_name.slice(0, 3) + data.phone_no.slice(0, 3);
  let email = data.email;
  let password = crypto
    .pbkdf2Sync(pass, salt, 10, 16, "sha512")
    .toString("hex");
  data.salt = salt;
  data.password = password;
  data.username = username;
  data.role = "DSA";
  data.status = "pending";
  data.date = new Date().toISOString();

  await db.collection("creds").doc(username).set(data);

  let res = sendMail("dsa_success", {
    username: username,
    password: pass,
    email: email,
  });

  if (res.err) {
    return {
      err: "Unexpected error occured",
    };
  } else {
    redirect("/login");
  }
}

export async function submitDSAForm(formData) {
  try {
    const uploadFile = async (file, fieldName) => {
      const storageRef = ref(
        storage,
        `dsa_forms/${fieldName}-${uuidv4()}-${file.name}`
      );
      const bytes = await file.arrayBuffer();
      const blob = new Uint8Array(bytes);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      return url;
    };

    // Upload all files and replace file with URL
    const fileFields = [
      "aadhar",
      "pan",
      "photo",
      "bank_doc",
      "education_certificate",
    ];
    const uploadedFiles = {};

    for (const field of fileFields) {
      if (formData[field]) {
        uploadedFiles[field] = await uploadFile(formData[field], field);
      }
    }

    const payload = {
      ...formData,
      ...uploadedFiles,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    // Remove file objects
    fileFields.forEach((f) => delete payload[f] instanceof File && payload[f]);
    console.log("working fine");

    const docRef = await addDoc(collection(db, "dsa_forms"), payload);

    return {
      success: true,
      id: docRef.id,
      message: "Form submitted successfully",
    };
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
}

export async function approveDSAForm(formId) {
  try {
    const docRef = doc(db, "dsa_forms", formId);
    await updateDoc(docRef, {
      status: "approved",
      approvedAt: new Date().toISOString(),
    });

    return { success: true, message: `Form ${formId} approved` };
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
}
