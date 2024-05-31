export const prerender = false;

import type { APIRoute } from "astro";
import { formSubject } from "@/utils/globals";

export const POST: APIRoute = async ({ request }) => {
  const data: FormData = await request.formData();

  const name = data.get("name");
  const subject = data.get("subject");
  const email = data.get("email");
  const message = data.get("message");

  if (!name || !email || !message || !subject) {
    return response(400, "Missing required fields");
  }

  if (subject !== formSubject) {
    return response(400, "Invalid message format");
  }

  


  return response(200, "Message Sent!");
};

function response(status: number, message: string) {
  return new Response(
    JSON.stringify({
      message,
    }),
    { status },
  );
}
