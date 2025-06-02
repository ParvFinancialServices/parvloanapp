import { getAccountCreationSuccessTemplate, getOTPTemplate } from "./template";
import * as nodemailer from "nodemailer";


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