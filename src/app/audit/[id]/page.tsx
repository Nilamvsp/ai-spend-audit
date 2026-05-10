"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

 type Audit = {
  summary?: string;
  total_savings?: number;
  tools?: {
    name: string;
    plan: string;
    cost: string;
    teamSize?: string;
    useCase?: string;
  }[];
};




const [audit, setAudit] = useState<Audit | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchAudit = async () => {
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setAudit(data);
    };

    fetchAudit();
  }, [id]);

  // DOWNLOAD PDF
  const downloadPDF = async () => {
    const res = await fetch("/api/pdf", {
      method: "POST",
      body: JSON.stringify(audit),
    });

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-report.pdf";
    a.click();
  };

  // SEND EMAIL
  const sendEmail = async () => {
    const email = prompt("Enter your email");

    if (!email) return;

    try {
      setSending(true);

      const res = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({
          email,
          audit,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Email sent successfully!");
      } else {
        alert("Email failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  if (!audit) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading audit...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="mb-10">
          <h1 className="text-6xl font-extrabold mb-4">
            AI Spend Audit Report
          </h1>

          <p className="text-gray-400 text-lg">
            Optimized AI subscription analysis report
          </p>
        </div>

        {/* SAVINGS CARD */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-black p-8 rounded-3xl mb-10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">
            Potential Savings
          </h2>

          <p className="text-6xl font-extrabold">
            ${audit.total_savings}/month
          </p>

          <p className="text-2xl mt-4">
            ${audit.total_savings * 12}/year
          </p>
        </div>

        {/* SUMMARY */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mb-10">
          <h2 className="text-3xl font-bold mb-4">
            AI Summary
          </h2>

          <p className="text-gray-300 text-lg leading-8">
            {audit.summary}
          </p>
        </div>

        {/* TOOLS */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Tools Breakdown
          </h2>

          <div className="space-y-5">
            {audit.tools?.map((
  tool: {
    name: string;
    plan: string;
    cost: string;
    teamSize?: string;
    useCase?: string;
  },
  index: number
) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 p-6 rounded-2xl"
              >
                <div className="flex justify-between mb-4">
                  <h3 className="text-2xl font-bold">
                    {tool.name}
                  </h3>

                  <span className="bg-gray-800 px-4 py-2 rounded-xl text-sm">
                    {tool.plan}
                  </span>
                </div>

                <p className="text-gray-300 mb-2">
                  Monthly Cost: ${tool.cost}
                </p>

                <p className="text-gray-300 mb-2">
                  Team Size: {tool.teamSize}
                </p>

                <p className="text-gray-300">
                  Use Case: {tool.useCase}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-10">

          <button
            onClick={downloadPDF}
            className="cursor-pointer bg-green-500 hover:bg-green-400 transition-all text-black px-6 py-3 rounded-2xl font-bold"
          >
            Download PDF
          </button>

          <button
            onClick={sendEmail}
            disabled={sending}
            className="cursor-pointer bg-blue-500 hover:bg-blue-400 transition-all px-6 py-3 rounded-2xl font-bold"
          >
            {sending ? "Sending..." : "Send Email"}
          </button>

        </div>
      </div>
    </main>
  );
}