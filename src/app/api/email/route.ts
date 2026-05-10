import nodemailer from "nodemailer";
import { buildAuditHTML } from "@/src/lib/reportTemplate";

export async function POST(req: Request) {
  try {
    const { email, audit } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"AI Spend Audit" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "Your AI Spend Audit Report",

      html: buildAuditHTML(audit),
    });

    return Response.json({
      success: true,
    });

  } catch (err) {
    console.error("EMAIL ERROR:", err);

    return Response.json(
      {
        success: false,
        error: err,
      },
      {
        status: 500,
      }
    );
  }
}