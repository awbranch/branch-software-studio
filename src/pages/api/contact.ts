export const prerender = false;

import React from "react";
import * as ReactDOMServer from "react-dom/server";
import type { APIRoute } from "astro";
import { formSubject } from "@/utils/globals";
import nodemailer from "nodemailer";
import twilio from "twilio";
import ContactConfirmation from "@/emails/ContactConfirmation";
import ContactMessage from "@/emails/ContactMessage";

const smtpUser = import.meta.env.SMTP_USER;
const smtpPass = import.meta.env.SMTP_PASS;
const twilioAccountSid = import.meta.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = import.meta.env.TWILIO_AUTH_TOKEN;
const twilioFromPhone = import.meta.env.TWILIO_FROM_PHONE;
const twilioToPhone = import.meta.env.TWILIO_TO_PHONE;
const emailFrom = import.meta.env.EMAIL_FROM;
const emailTo = import.meta.env.EMAIL_TO;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  logger: true,
  debug: true,
});

const smsClient = twilio(twilioAccountSid, twilioAuthToken);

export const POST: APIRoute = async ({ request }) => {
  console.log("Contact POST---------------");
  try {
    const data: FormData = await request.formData();

    let name = sanitize(data, "name");
    let subject = sanitize(data, "subject");
    let email = sanitize(data, "email");
    let message = sanitize(data, "message");

    if (!name || !email || !message || !subject) {
      return response(400, "Missing required fields");
    }

    // Check that the honeypot contains the proper value
    if (subject !== formSubject) {
      console.log(`subject: ${subject} - fromSubject: ${formSubject}`);
      return response(400, "Invalid message format");
    }

    /////////////////////////////////////////////////////////////////////////////
    // Send a message to Branch Studio
    let status = await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject: "Branch Studio Contact Message",
      html: ReactDOMServer.renderToString(
        React.createElement(ContactMessage, {
          name,
          email,
          message,
        }),
      ),
    });

    console.log(
      `Message submitted email response: ${status.response} id: ${
        status.messageId
      } accepted: ${JSON.stringify(
        status.accepted,
      )} rejected: ${JSON.stringify(status.rejected)}`,
    );

    /////////////////////////////////////////////////////////////////////////////
    // Send SMS text messages to the foundation

    // Ensure the message is less than 1600 chars
    const smsMessage = `Branch Studio Message Received\nFrom: ${truncateTo(
      name,
      100,
      true,
    )} - ${truncateTo(email, 100, true)}\n${truncateTo(message, 250, true)}`;

    const smsResponse = await smsClient.messages.create({
      body: truncateTo(smsMessage, 1600),
      from: twilioFromPhone,
      to: twilioToPhone,
    });

    console.log(`Twilio Response to ${twilioToPhone}: ${smsResponse.sid}`);
    console.debug(
      `Twilio Response Details\n${JSON.stringify(smsResponse, null, 3)}`,
    );

    /////////////////////////////////////////////////////////////////////////////
    // Send confirmation email to the submitter
    status = await transporter.sendMail({
      from: emailFrom,
      to: email,
      subject: "Branch Software Studio - Message Received",
      html: ReactDOMServer.renderToString(
        React.createElement(ContactConfirmation, {
          name,
          email,
        }),
      ),
    });

    console.log(
      `Message confirmation email response: ${status.response} id: ${
        status.messageId
      } accepted: ${JSON.stringify(
        status.accepted,
      )} rejected: ${JSON.stringify(status.rejected)}`,
    );

    return response(200, "Your message was sent to\nBranch Software Studio");
  } catch (error) {
    console.error(error);
    return response(500, "System Error");
  }
};

function response(status: number, message: string) {
  return new Response(
    JSON.stringify({
      message,
    }),
    { status },
  );
}

function sanitize(data: FormData, field: string) {
  return (data.get(field) || "").toString().trim();
}

export function truncateTo(
  str: string,
  max: number,
  ellipsis?: boolean,
): string {
  return str.length > max ? str.slice(0, max) + (!!ellipsis ? "..." : "") : str;
}
