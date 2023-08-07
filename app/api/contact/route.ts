import { NextRequest, NextResponse } from 'next/server';
import contactFormSchema from '@/utils/contactFormSchema';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: true,
  debug: true,
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(JSON.stringify(data));

    // Revalidate what was submitted
    let contactInfo = await contactFormSchema.validate(data, {
      abortEarly: true,
      stripUnknown: true,
    });

    // Check that the honeypot is blank
    if (contactInfo.accounting && contactInfo.accounting.length !== 0) {
      console.error('Honeypot Error');
      return NextResponse.json({ message: 'Invalid Message' }, { status: 500 });
    }

    // Send an email to branch studio
    let status = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'Branch Studio Contact',
      text: `Name: ${contactInfo.name}\nEmail:${contactInfo.email}\n\n${contactInfo.message}`,
    });

    console.log(
      `Message submitted email response: ${status.response} id: ${
        status.messageId
      } accepted: ${JSON.stringify(status.accepted)} rejected: ${JSON.stringify(
        status.rejected,
      )}`,
    );

    // Send confirmation email to submitter
    status = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: contactInfo.email,
      subject: 'Hello from Branch Software Studio',
      text: `Thank you for reaching out to Branch Software Studio. 
             We will be in contact with you shortly.

             Andrew Branch`.replace(/^ +/gm, ''),
    });

    console.log(
      `Message confirmation email response: ${status.response} id: ${
        status.messageId
      } accepted: ${JSON.stringify(status.accepted)} rejected: ${JSON.stringify(
        status.rejected,
      )}`,
    );
    return NextResponse.json(
      { message: 'Message Sent Successfully' },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'System Error' }, { status: 500 });
  }
}
