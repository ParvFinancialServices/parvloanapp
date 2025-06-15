"use server";

import { db, storage } from "@/lib/firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { checkAuthentication, getApp } from "./common";
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
  
  const result=await db.collection("creds").doc(username).set(data);
  console.log("hello world",result);

  // return { msg:"un expected error",result};

  let res = sendMail("dsa_success", {
    username: username,
    password: pass,
    email: email,
  });

  if (res?.err) {
    return {
      err: "Unexpected error occured",
    };
  } else {
    // redirect("/login");
    return {success:true, msg:"An email sent!"}
  }
}

export async function submitDSAForm(formData) {
  getApp();
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

export async function getDSADataById(token,username) {
  getApp();
  let decodedToken = await checkAuthentication(token);

  // if (!checkAdmin(decodedToken.decoded)) {
  //   // redirect("/login");
  //   return {success:false,msg:"NOt authenticated user"}
  // }

  const db = admin.firestore();
  let data = await db.collection("creds")
  .where("role", "==", "DSA")
  .where("username","==",username)
  .get();

  const doc = data.docs[0];
  let result = [];
  data.forEach((e) => {
    result.push(e.data());
  });

  return { data: doc.data() };
}


export async function approveDSAForm(formId) {
  getApp();
  const db = admin.firestore();

  try {
    const docRef = db.collection("creds").doc(formId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return { success: false, message: "DSA not found" };
    }

    const data = docSnap.data();

    if (!data?.email || !data?.password || !data?.username) {
      return { success: false, message: "Invalid DSA data" };
    }

    // Update status to approved
    await docRef.update({
      status: "approved",
      approvedAt: new Date().toISOString(),
    });

    // Send success mail
    const mailRes = sendMail("dsa_approved", {
      email: data.email,
      username: data.username,
      password: "[hidden for security]", // avoid sending plain password
    });

    if (mailRes?.err) {
      return { success: true, message: "DSA approved but mail failed" };
    }

    return { success: true, message: `DSA ${formId} approved and notified` };
  } catch (err) {
    console.error("Approval error:", err);
    return { success: false, message: err.message };
  }
}