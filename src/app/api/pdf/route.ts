import { NextResponse } from "next/server";
import { generatePDF } from "@/src/lib/pdfGenerator";

export async function POST(req: Request) {
  try {
    const audit = await req.json();

    const pdf = await generatePDF(audit);

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=audit.pdf",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "PDF failed" },
      { status: 500 }
    );
  }
}