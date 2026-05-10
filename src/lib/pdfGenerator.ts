import puppeteer from "puppeteer";
import { buildAuditHTML } from "./reportTemplate";

export const generatePDF = async (audit: {
  summary?: string;
  total_savings?: number;
  tools?: {
    name: string;
    plan: string;
    cost: string;
    useCase?: string;
  }[];
}) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(buildAuditHTML(audit), {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return pdf;
};