export const prerender = false;

import React from "react";
import * as ReactDOMServer from "react-dom/server";
import type { APIRoute } from "astro";
import { formSubject } from "@/utils/globals";
import nodemailer from "nodemailer";
import ContactConfirmation from "@/emails/ContactConfirmation";
import ContactMessage from "@/emails/ContactMessage";

export const POST: APIRoute = async ({ locals, request }) => {
  console.log("Contact POST---------------");
  try {
    const smtpUser = locals.runtime.env.SMTP_USER;
    const smtpPass = locals.runtime.env.SMTP_PASS;
    const emailFrom = locals.runtime.env.EMAIL_FROM;
    const emailTo = locals.runtime.env.EMAIL_TO;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      logger: true,
      debug: true,
    });

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
