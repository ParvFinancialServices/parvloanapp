"use server";

import * as admin from "firebase-admin";
import { checkAuthentication } from "./common";

export async function getUserDataByToken(token) {
  let { decoded } = await checkAuthentication(token);
  const db = admin.firestore();
  let profile = {};
  let query = db.collection("creds").where("username", "==", decoded.username);
  let snapshot = await query.get();

  snapshot.forEach((doc) => {
    profile = doc.data();
    delete profile.password;
    delete profile.salt;
    delete profile.otp;
  });

  return { profile };
}
