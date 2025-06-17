"use server";

import crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { v2 as sdk } from "cloudinary";
import { cookies } from "next/headers";
import * as admin from "firebase-admin";
import { redirect } from "next/navigation";
import { error } from "console";
import { get, set } from "lodash";
import {
  formatDate,
  getLoanType,
  getUsername,
  removeProperty,
} from "@/lib/utils";
import * as nodemailer from "nodemailer";
import {
  getAccountCreationSuccessTemplate,
  getOTPTemplate,
} from "../mailTemplate";
import { arrayUnion } from "@firebase/firestore";
import { checkAuthentication, getApp } from "./common";

sdk.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let app;

export async function upload_doc({ file, folder }) {
  const uploader = sdk.uploader;
  let resource;
  try {
    resource = await uploader.upload(file, {
      folder: folder,
    });
  } catch (e) {
    console.log(e);
  }

  return resource;
}

function checkAdmin(decodedToken) {
  if (decodedToken.role == "Admin") {
    return true;
  }

  return false;
}

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

export async function getUserData(token, username) {
  let decodedToken = await checkAuthentication(token);
  if (!checkAdmin(decodedToken.decoded)) {
    console.log(decodedToken);
    redirect("/login");
  }
  const db = admin.firestore();
  let profile = {};
  let query = db.collection("creds").where("username", "==", username);
  let snapshot = await query.get();

  snapshot.forEach((doc) => {
    profile = doc.data();
    delete profile.password;
    delete profile.salt;
    delete profile.otp;
  });

  return { profile };
}

export async function getLoanData(token, type) {
  await checkAuthentication(token);
  const db = admin.firestore();

  switch (type) {
    case "Personal":
      let data = [];
      let query = db.collection("personal_loans");
      let snapshot = await query.get();

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });

      return { data };
    default:
      return {};
  }
}

// function getApp() {
//   if (process.env.NEXT_PUBLIC_TEST_MODE) {
//     if (admin.apps.length == 0) {
//       // Initialising the firebase app using serviceAccountCredentials
//       try {
//         const serviceAccountCredentials = JSON.parse(process.env.KEY);
//         admin.initializeApp({
//           credential: admin.credential.cert(serviceAccountCredentials),
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       console.log("else");
//     }
//   } else {
//     // Initialising the firebase app using serviceAccountCredentials
//     try {
//       const serviceAccountCredentials = JSON.parse(process.env.KEY);
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccountCredentials),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return app;
// }

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

  // snapshot.forEach((doc) => {
  //   profile = doc.data();
  // });

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

export async function createDSAAccount(data) {
  // console.log(data);
  // try {
  const cookieStore = cookies();

  getApp();
  let db = admin.firestore();
  let snapshot = await db.collection("creds").where("role", "==", "DSA").get();
  let length = snapshot.size + 1;

  let username = "DSA" + length;
  let salt = crypto.randomBytes(16).toString("hex");
  let pass =
    get(data, "info.sections[0].fields[0].value").slice(0, 3) +
    get(data, "info.sections[0].fields[5].value").slice(0, 3);
  let email = get(data, "info.sections[0].fields[7].value");
  let password = crypto
    .pbkdf2Sync(pass, salt, 10, 16, "sha512")
    .toString("hex");
  data.salt = salt;
  data.password = password;
  data.username = username;
  data.role = "DSA";

  await db.collection("creds").doc(username).set(data);
  // await db.collection("creds").add(data);

  let res = sendMail("account_success", {
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

  //need to remove from production
  // cookieStore.set("username", username);
  // cookieStore.set("password", pass);
}

export async function createAccount(token, data) {
  const cookieStore = cookies();
  let { decoded } = await checkAuthentication(token);
  console.log("decoded", decoded);
  console.log("data", JSON.stringify(data));
  if (decoded.role !== "Admin") {
    return false;
  }

  const db = admin.firestore();
  const role = get(data, "info.sections[1].fields[0].value");
  let snapshot = await db.collection("creds").where("role", "==", role).get();
  let length = snapshot.size + 1;

  let username = getUsername(role, length);
  let salt = crypto.randomBytes(16).toString("hex");
  let pass =
    get(data, "info.sections[0].fields[0].value").slice(0, 3) +
    get(data, "info.sections[0].fields[5].value").slice(0, 3);
  let password = crypto
    .pbkdf2Sync(pass, salt, 10, 16, "sha512")
    .toString("hex");
  let email = get(data, "info.sections[0].fields[7].value");
  data.salt = salt;
  data.password = password;
  data.username = username;
  data.role = role;

  //setting date of joining as disabled so that it can't be edited
  set(data, "info.sections[1].fields[1].disabled", true);

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
export async function logout() {
  try {
    const cookieStore = cookies();
    cookieStore.set("jwt", "", {
      httpOnly: true,
      maxAge: 0,
    });
    cookieStore.set("role", "", {
      httpOnly: true,
      maxAge: 0,
    });

    redirect("/login");
  } catch (e) {
    console.log(error);
    redirect("/login");
  }
}

export async function verifyOTP(otp, username) {
  console.log(otp, username);
  let data;
  getApp();
  const db = admin.firestore();
  let snapshot = await db
    .collection("creds")
    .where("username", "==", username)
    .get();

  if (snapshot.size > 0) {
    snapshot.forEach((doc) => {
      data = doc.data();
    });
    let now = new Date();
    if (data.otp.canReset == "false") {
      return {
        type: "UNAUTHORISED",
        err: `Cannot reset password right now, try again after ${data.otp.timeStamp}`,
      };
    } else if (now > data.timeStamp) {
      return {
        type: "TIMEOUT",
        err: "OTP timeout",
      };
    } else {
      console.log("else otp", data);
      if (data.otp.value == otp) {
        return {
          msg: "Verification Successful",
        };
      } else {
        return {
          type: "INCORRECT",
          err: "Try again",
        };
      }
    }
  } else {
    console.log(err);
    return {
      type: "UNEXPECTED",
      err: "Unexpected Error occured, contact admin",
    };
  }
}

export async function sendOTPMail(username) {
  console.log(username);
  let email;
  let docID;
  let doc;
  getApp();
  const db = admin.firestore();
  let snapshot = await db
    .collection("creds")
    .where("username", "==", username)
    .get();

  if (snapshot.size > 0) {
    snapshot.forEach((data) => {
      docID = data.id;
      doc = data.data();
      console.log("doc", doc);
      email = get(doc, "info.sections[0].fields[7].value");
      console.log("email", email);
    });

    console.log(doc);
    if (doc?.otp?.canReset == false) {
      let now = new Date();
      if (now < doc?.otp?.timeStamp.toDate()) {
        return {
          type: "UNAUTHORISED",
          err: `Cannot reset password right now, try again after ${doc.otp.timeStamp.toDate()}`,
        };
      }
    }

    let res = await sendMail("password_reset", {
      email: email,
    });

    if (res.err) {
      console.log(res.err);
      return {
        type: "UNEXPECTED",
        err: "Unexpected Error occured, contact admin",
      };
    } else {
      let now = new Date();

      await db
        .collection("creds")
        .doc(docID)
        .set(
          {
            otp: {
              timeStamp: new Date(now.getTime() + 60 * 1000),
              value: res.output,
              canReset: true,
            },
          },
          { merge: true }
        );

      return {
        msg: "OTP sent to registered email",
        value: res.output,
      };
    }
  } else {
    return {
      type: "NOT FOUND",
      err: "Username not found, please enter correct username",
    };
  }
}

export async function sendMail(type, body) {
  let template = "";
  let subject = "";
  let output = "";
  console.log(body);
  switch (type) {
    case "account_success":
      var result = getAccountCreationSuccessTemplate(
        body.username,
        body.password
      );
      template = result.template;
      subject = result.subject;
      output = "Mail Sent";
      break;
    case "password_reset":
      let otp = Math.floor(100000 + Math.random() * 900000);
      output = otp;
      var result = getOTPTemplate(otp);
      template = result.template;
      subject = result.subject;
      break;
  }

  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: "parvmultiservices@gmail.com",
      pass: process.env.LESS_SECURE_PASS,
    },
  });

  const receiver = {
    from: "parvmultiservices@gmail.com",
    to: body.email,
    subject: subject,
    html: template,
  };

  try {
    await auth.sendMail(receiver);
  } catch (e) {
    console.log(e);
    return {
      err: e,
    };
  }
  return {
    output: output,
  };
}

export async function changePassword(username, password, otp) {
  getApp();
  const db = admin.firestore();
  let docID;
  let doc;
  let snapshot = await db
    .collection("creds")
    .where("username", "==", username)
    .get();

  if (snapshot.size > 0) {
    snapshot.forEach((data) => {
      docID = data.id;
      doc = data.data();
    });
    if (doc.otp.value == otp) {
      console.log("otp if");
      let salt = crypto.randomBytes(16).toString("hex");
      let pass = crypto
        .pbkdf2Sync(password, salt, 10, 16, "sha512")
        .toString("hex");

      //set password
      //remove otp from db
      await db.collection("creds").doc(docID).update({
        salt: salt,
        password: pass,
        otp: {},
      });
      console.log(docID);
      return {
        msg: "Password reset successful",
      };
    } else {
      console.log("otp else");
      let now = new Date();
      await db
        .collection("creds")
        .doc(docID)
        .update({
          otp: {
            timeStamp: new Date(now.getTime() + 3600 * 1000),
            canReset: false,
          },
        });
      // prevent user from password reset for sometime

      return {
        type: "UNAUTHORISED",
        err: `Cannot reset password right now, try again after ${doc.otp.timeStamp}`,
      };
    }
  } else {
    // prevent user from password reset for sometime
    let now = new Date();
    await db
      .collection("creds")
      .doc(docID)
      .update({
        otp: {
          timeStamp: new Date(now.getTime() + 3600 * 1000),
          canReset: false,
        },
      });

    return {
      type: "UNAUTHORISED",
      err: `Cannot reset password right now, try again after ${doc.otp.timeStamp}`,
    };
  }
}

export async function setCanReset(username, value) {
  getApp();
  const db = admin.firestore();
  let docID;
  let snapshot = await db
    .collection("creds")
    .where("username", "==", username)
    .get();

  if (snapshot.size > 0) {
    snapshot.forEach((data) => {
      docID = data.id;
    });

    let now = new Date();

    await db
      .collection("creds")
      .doc(docID)
      .update({
        otp: {
          timeStamp: new Date(now.getTime() + 3600 * 1000),
          canReset: false,
        },
      });

    return {
      msg: "User cannot reset password for next 1 hour",
    };
  } else {
    return {
      type: "NOTFOUND",
      err: "User does not exists",
    };
  }
}
export async function setLoanData(token, data, type) {
  let { decoded } = await checkAuthentication(token);
  console.log("decoded", decoded);
  console.log("data", JSON.stringify(data));
  if (decoded.role !== "Admin" && decoded.role !== "DSA") {
    return false;
  }

  const db = admin.firestore();
  let snapshot = await db.collection("personal_loans").get();
  let length = snapshot.size + 1;
  let loanData = getLoanType(type, length);
  data.status = "VERIFICATION";

  await db.collection(loanData.key).doc(loanData.value).set(data);

  console.log("loanData", loanData);
  return {
    loanID: loanData.value,
  };
}

export async function getLoanDataById(token, loanId) {
  try {
    // Optional: Authenticate using cookies (Replace with your auth logic)
    // const token = cookies().get("authToken")?.value;
    // if (!token) {
    //   return { success: false, error: "Unauthorized" };
    // }
    await checkAuthentication(token);
    const db = admin.firestore();
    if (!loanId) {
      return { success: false, error: "Loan ID is required" };
    }

    const docRef = db.collection("personal_loans").doc(loanId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return { success: false, error: "Loan not found" };
    }

    return { success: true, loanData: docSnap.data() };
  } catch (error) {
    console.error("Error fetching loan data:", error);
    return { success: false, error: error.message };
  }
}

// field staff

export async function updateAccount(token, data, username) {
  let { decoded } = await checkAuthentication(token);
  const db = admin.firestore();
  if (decoded.username == username || decoded.role == "Admin") {
    await db.collection("creds").doc(username).update(data);
    return {
      msg: "Account Update Succesfully",
    };
  } else {
    return {
      type: "UNEXPECTED",
      err: "unexpected error occured, contact admin",
    };
  }
}

export async function addAssignmentToTC(token, url) { }

export async function getLoanByID(token, type, id) {
  let decodedToken = await checkAuthentication(token);
  const db = admin.firestore();
  console.log(decodedToken);
  switch (type) {
    case "Personal":
      let query = db.collection("personal_loans").doc(id);
      let snapshot = await query.get();

      return { id: snapshot.id, data: snapshot.data() };
    default:
      return {};
  }
}

export async function setLoanByID(token, type, id, data) {
  let decodedToken = await checkAuthentication(token);

  console.log(decodedToken);
  if (!checkAdmin(decodedToken.decoded)) {
    redirect("/login");
  }
  const db = admin.firestore();

  switch (type) {
    case "Personal":
      console.log(id, type);
      await db.collection("personal_loans").doc(id).update(data);

      return { msg: "Data Updation successful" };
    default:
      return {};
  }
}

export async function getConnectorsData(token) {
  let decodedToken = await checkAuthentication(token);

  if (!checkAdmin(decodedToken.decoded)) {
    redirect("/login");
  }

  const db = admin.firestore();
  let data = await db.collection("creds").where("role", "==", "DSA").get();
  let result = [];
  data.forEach((e) => {
    result.push(e.data());
  });

  return { data: result };
}

export async function getTelecallersData(token) {
  let decodedToken = await checkAuthentication(token);

  if (!checkAdmin(decodedToken.decoded)) {
    redirect("/login");
  }

  const db = admin.firestore();
  let data = await db
    .collection("creds")
    .where("role", "==", "Telecaller")
    .get();
  let result = [];
  data.forEach((e) => {
    result.push(e.data());
  });

  return { data: result };
}

export async function setTelecallersData(token, username, url) {
  let decodedToken = await checkAuthentication(token);

  if (!checkAdmin(decodedToken.decoded)) {
    redirect("/login");
  }

  const db = admin.firestore();
  let snap = await db.collection("creds").doc(username).get();

  let data = snap.data();
  console.log(data);
  let assignments = data?.assignments ? data.assignments : [];
  assignments = [
    ...assignments,
    {
      date: formatDate(new Date()),
      assignment: url,
    },
  ];
  console.log(assignments);
  await db.collection("creds").doc(username).update({
    assignments: assignments,
  });

  return { success:true,msg: "Assignment Added" };
}

export async function getFieldStaffsData(token) {
  let decodedToken = await checkAuthentication(token);

  if (!checkAdmin(decodedToken.decoded)) {
    redirect("/login");
  }

  const db = admin.firestore();
  let data = await db
    .collection("creds")
    .where("role", "==", "Field Staff")
    .get();
  let result = [];
  data.forEach((e) => {
    result.push(e.data());
  });

  return { data: result };
}

export async function getRMsData(token) {
  let decodedToken = await checkAuthentication(token);

  if (!checkAdmin(decodedToken.decoded)) {
    redirect("/login");
  }

  const db = admin.firestore();
  let data = await db.collection("creds").where("role", "==", "RM").get();
  let result = [];
  data.forEach((e) => {
    result.push(e.data());
  });

  return { data: result };
}

export async function getConnectorsLoanData(token, username) {
  let decodedToken = await checkAuthentication(token);

  if (!checkAdmin(decodedToken.decoded)) {
    redirect("/login");
  }

  const db = admin.firestore();
  let personal_loan_data = db
    .collection("personal_loans")
    .where("connectorID", "==", username)
    .get();

  console.log(username);
  // add for other loans as well
  let result = [];

  await Promise.all([personal_loan_data]).then((res) => {
    res.forEach((snap) => {
      snap.forEach((e) => {
        console.log(e.data());
        result.push({ id: e.id, data: e.data() });
      });
    });
  });

  return { data: result };
}

export async function submitTelecallerSummary(token, formData) {
  await checkAuthentication(token); // Ensure the user is authenticated

  const db = admin.firestore();

  try {
    const docRef = await db.collection('telecaller_summaries').add({
      ...formData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting telecaller summary:', error);
    return { success: false, error: error.message };
  }
}

export async function fetchTelleCallerDailyReport(token,selectedDate=null) {
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

      console.log("Abhishgek jaisiwh",querySnapshot);
      
    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, reports };
  } catch (error) {
    console.error('Error fetching telecaller reports:', error);
    return { success: false, error: error.message };
  }
}
