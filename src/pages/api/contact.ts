export const prerender = false;

import React from "react";
import * as ReactDOMServer from "react-dom/server";
import type { APIRoute } from "astro";
import { formSubject } from "@/utils/globals";
import { Resend } from "resend";
import ContactConfirmation from "@/emails/ContactConfirmation";
import ContactMessage from "@/emails/ContactMessage";

export const POST: APIRoute = async ({ locals, request }) => {
  console.log("Contact POST---------------");
  try {
    const resend = new Resend(locals.runtime.env.RESEND_API_KEY);
    const emailFrom = locals.runtime.env.EMAIL_FROM;
    const emailTo = locals.runtime.env.EMAIL_TO;

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
    let status = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: "Branch Studio Contact Message",
      react: React.createElement(ContactMessage, {
        name,
        email,
        message,
      }),
    });

    if (status.error) {
      console.error(
        "Resend Error when sending to Branch Studio",
        JSON.stringify(status.error, null, 3),
      );
      return response(
        400,
        "Error sending your email at this time. Please try again later.",
      );
    }

    /////////////////////////////////////////////////////////////////////////////
    // Send confirmation email to the submitter
    status = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: "Branch Software Studio - Message Received",
      react: React.createElement(ContactConfirmation, {
        name,
        email,
      }),
    });

    if (status.error) {
      console.error(
        "Resend Error when sending to submitter",
        JSON.stringify(status.error, null, 3),
      );
      return response(
        400,
        "Error sending your email at this time. Please try again later.",
      );
    }

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
