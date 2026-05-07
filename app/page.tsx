"use client";

import { useState } from "react";

type Tool = {
  name: string;
  plan: string;
  cost: string;
};

type AuditResult = {
  tool: string;
  recommendation: string;
  savings: number;
  reason: string;
};

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [results, setResults] = useState<AuditResult[]>([]);

  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [cost, setCost] = useState("");

  const addTool = () => {
    if (!name || !plan || !cost) return;

    const newTool: Tool = {
      name,
      plan,
      cost,
    };

    setTools([...tools, newTool]);

    setName("");
    setPlan("");
    setCost("");
  };

  const runAudit = () => {
    const auditResults: AuditResult[] = [];

    tools.forEach((tool) => {
      const monthlyCost = Number(tool.cost);

      // ChatGPT logic
      if (
        tool.name.toLowerCase() === "chatgpt" &&
        tool.plan.toLowerCase() === "team"
      ) {
        auditResults.push({
          tool: "ChatGPT",
          recommendation: "Switch to ChatGPT Plus",
          savings: 20,
          reason:
            "Small teams often do not fully utilize Team features.",
        });
      }

      // Cursor logic
      else if (
        tool.name.toLowerCase() === "cursor" &&
        tool.plan.toLowerCase() === "business"
      ) {
        auditResults.push({
          tool: "Cursor",
          recommendation: "Downgrade to Cursor Pro",
          savings: 20,
          reason:
            "Business features may be unnecessary for small engineering teams.",
        });
      }

      // Generic logic
      else if (monthlyCost > 100) {
        auditResults.push({
          tool: tool.name,
          recommendation: "Review enterprise usage",
          savings: 25,
          reason:
            "High monthly spend may indicate underutilized premium features.",
        });
      }

      // No savings
      else {
        auditResults.push({
          tool: tool.name,
          recommendation: "Current plan looks reasonable",
          savings: 0,
          reason:
            "No obvious optimization opportunities detected.",
        });
      }
    });

    setResults(auditResults);
  };

  const totalSavings = results.reduce(
    (sum, item) => sum + item.savings,
    0
  );

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center">

      <h1 className="text-4xl font-bold mt-10">
        AI Spend Audit
      </h1>

      <p className="text-gray-400 mt-3 text-center max-w-xl">
        Discover unnecessary AI spending and optimize your stack.
      </p>

      {/* FORM */}
      <div className="mt-10 w-full max-w-md space-y-4">

        <input
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
          placeholder="Tool name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
          placeholder="Plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
          placeholder="Monthly cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <button
          onClick={addTool}
          className="w-full bg-white text-black py-3 rounded font-semibold"
        >
          Add Tool
        </button>

        <button
          onClick={runAudit}
          className="w-full bg-green-500 text-black py-3 rounded font-semibold"
        >
          Run Audit
        </button>

      </div>

      {/* TOOL LIST */}
      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Your Tools
        </h2>

        {tools.map((t, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-700 p-4 rounded mb-3"
          >
            <p><b>Tool:</b> {t.name}</p>
            <p><b>Plan:</b> {t.plan}</p>
            <p><b>Cost:</b> ${t.cost}/month</p>
          </div>
        ))}
      </div>

      {/* AUDIT RESULTS */}
      <div className="mt-10 w-full max-w-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Audit Results
        </h2>

        <div className="bg-green-900 p-5 rounded mb-6">
          <h3 className="text-3xl font-bold">
            Total Savings: ${totalSavings}/month
          </h3>

          <p className="mt-2 text-green-200">
            Annual Savings: ${totalSavings * 12}/year
          </p>
        </div>

        {results.map((result, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-700 p-5 rounded mb-4"
          >
            <h3 className="text-xl font-semibold">
              {result.tool}
            </h3>

            <p className="mt-2">
              <b>Recommendation:</b> {result.recommendation}
            </p>

            <p className="mt-2">
              <b>Potential Savings:</b> ${result.savings}/month
            </p>

            <p className="mt-2 text-gray-400">
              {result.reason}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}