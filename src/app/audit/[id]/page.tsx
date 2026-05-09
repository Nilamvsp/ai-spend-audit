"use client";

import { use, useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
    const [audit, setAudit] = useState<any>(null);

    useEffect(() => {
        async function fetchAudit() {

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
        }

        fetchAudit();
    }, []);

    if (!audit) {
        return (
            <div className="p-10 text-white">
                Loading audit...
            </div>
        );
    }

    return (
        <div className="p-10 text-white max-w-4xl mx-auto">

  {/* HEADER */}
  <h1 className="text-6xl text-black font-extrabold tracking-tight mb-8">
    AI Spend Audit Report
  </h1>

            {/* SAVINGS CARD */}
            <div className="mb-8 bg-green-900/20 border border-green-500 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-green-400">
                    Total Savings
                </h2>
                <p className="text-3xl font-bold">
                    ${audit.total_savings}/month
                </p>
            </div>

            {/* SUMMARY SECTION */}
            <div className="mb-8 bg-gray-900 border border-gray-700 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-2">
                    Audit Summary
                </h2>
                <p className="text-gray-300">
                    {audit.summary || "No summary available"}
                </p>
            </div>

            {/* TOOLS SECTION */}
            <h2 className="text-2xl font-bold mb-4">
                Tools Breakdown
            </h2>

            <div className="space-y-4">
                {audit.tools?.map((tool: any, index: number) => (
                    <div
                        key={index}
                        className="bg-gray-900 border border-gray-700 p-4 rounded-xl"
                    >
                        <p><b>Tool:</b> {tool.name}</p>
                        <p><b>Plan:</b> {tool.plan}</p>
                        <p><b>Cost:</b> ${tool.cost}/month</p>
                        <p><b>Team Size:</b> {tool.teamSize}</p>
                        <p><b>Use Case:</b> {tool.useCase}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
