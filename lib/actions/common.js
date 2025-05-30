"use server";

import * as admin from "firebase-admin";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

let app;

export async function getApp() {
  if (process.env.NEXT_PUBLIC_TEST_MODE) {
    if (admin.apps.length == 0) {
      // Initialising the firebase app using serviceAccountCredentials
      try {
        const serviceAccountCredentials = JSON.parse(process.env.KEY);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccountCredentials),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("else");
    }
  } else {
    // Initialising the firebase app using serviceAccountCredentials
    try {
      const serviceAccountCredentials = JSON.parse(process.env.KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountCredentials),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return app;
}

export async function checkAuthentication(token) {
  const cookieStore = await cookies();
  let role = cookieStore.get("role");
  let jwtToken = cookieStore.get("jwt");

  if (token) {
    if (jwtToken?.value) {
      getApp();
      let auth = admin.auth();
      let res = await auth.verifyIdToken(token);
      let decoded = jwt.verify(jwtToken.value, process.env.SALT);

      if (res.role == role.value && res.role == decoded.role) {
        return {
          decoded,
        };
      } else {
        redirect("/login");
      }
    } else {
      throw new Error("JWT not found");
    }
  } else {
    redirect("/login");
  }
}
