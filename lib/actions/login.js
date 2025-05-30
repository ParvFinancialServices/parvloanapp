"use server";

import * as admin from "firebase-admin";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { get, set } from "lodash";
import { cookies } from "next/headers";
import { getApp } from "./common";

let app;

export async function login(username, password) {
  let profile = {};
  getApp();
  const auth = admin.auth();
  const db = admin.firestore();

  // getting profile details
  let query = db.collection("creds").where("username", "==", username);
  let snapshot = await query.get();

  snapshot.forEach((doc) => {
    doc = doc.data();
    profile.username = get(doc, "username");
    profile.password = get(doc, "password");
    profile.salt = get(doc, "salt");
    profile.role = get(doc, "role");
  });

  // creating user provided password hash
  password = crypto
    .pbkdf2Sync(password, profile.salt, 10, 16, "sha512")
    .toString("hex");

  // checking password
  if (profile.password == password) {
    try {
      const cookieStore = cookies();
      let payload = {
        username: profile.username,
        role: profile.role,
      };
      let string = jwt.sign(payload, process.env.SALT);
      let uuid = crypto.randomUUID();
      // Creating a temporary token to sign in the user so that we can use the role inside security rules
      const token = await auth.createCustomToken(uuid, {
        role: profile.role,
      });
      cookieStore.set("jwt", string, {
        httpOnly: true,
      });
      cookieStore.set("role", profile.role, {
        httpOnly: true,
      });
      return { token, role: profile.role };
    } catch (error) {
      console.log(error);
      return { error: "Unexpected error occured" };
    }
  } else {
    return { error: "Username or password is incorrect" };
  }
}
