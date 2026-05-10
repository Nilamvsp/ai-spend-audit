import { Resend } from "resend";
import { buildAuditHTML } from "@/src/lib/reportTemplate";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, audit } = await req.json();

    const data = await resend.emails.send({
      from: "AI Audit <onboarding@resend.dev>",
      to: email,
      subject: "Your AI Spend Audit Report",
      html: buildAuditHTML(audit),
    });

    return Response.json({
      success: true,
      data,
    });

  } catch (err) {
    console.error(err);

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