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
    return <div className="p-10 text-white">Loading audit...</div>;
  }

  return (
    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold mb-6">
        AI Spend Audit Report
      </h1>

      <h2 className="text-xl mb-4">
        Total Savings: ${audit.total_savings}
      </h2>

     <div className="space-y-4">
  {audit.tools.map((tool: any, index: number) => (
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