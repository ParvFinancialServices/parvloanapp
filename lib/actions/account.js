"use server";

import * as admin from "firebase-admin";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { get } from "lodash";
import * as crypto from "crypto";
import { sendMail } from "./mail";
import { checkAuthentication } from "./common";
import { getUsername } from "../utils";

export async function createAccount(token, data) {
  const cookieStore = cookies();
  let { decoded } = await checkAuthentication(token);
  console.log("decoded", decoded);
  console.log("data", JSON.stringify(data));
  if (decoded.role !== "Admin") {
    return false;
  }

  const db = admin.firestore();
  const role = get(data, "designation");
  let snapshot = await db.collection("creds").where("role", "==", role).get();
  let length = snapshot.size + 1;

  let username = getUsername(role, length);
  let salt = crypto.randomBytes(16).toString("hex");
  let pass =
    get(data, "full_name").slice(0, 3) + get(data, "phone_no").slice(0, 3);
  let password = crypto
    .pbkdf2Sync(pass, salt, 10, 16, "sha512")
    .toString("hex");
  let email = get(data, "email");
  data.salt = salt;
  data.password = password;
  data.username = username;
  data.role = role;

  //setting date of joining as disabled so that it can't be edited
  // set(data, "info.sections[1].fields[1].disabled", true);

  // await db.collection("creds").add(data);
  await db.collection("creds").doc(username).set(data);
  // cookieStore.set("username", username);
  // cookieStore.set("password", pass);

  let res = sendMail("account_success", {
    username: username,
    password: pass,
    email: email,
  });

  // sendMail("password_reset",{
  //   email:email
  // });
  if (res.err) {
    return {
      err: "Unexpected error occured",
    };
  } else {
    return {
      msg: "Account Creation Successful, Username and password sent to your registered email ID",
      username: username,
    };
  }

  // redirect("/dashboard/admin/success");
}
