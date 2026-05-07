"use client";

import { useEffect, useState } from "react";

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

const toolPlans: Record<string, string[]> = {
  ChatGPT: ["Plus", "Team", "Enterprise"],
  Cursor: ["Pro", "Business", "Enterprise"],
  Claude: ["Pro", "Max", "Team"],
  Gemini: ["Pro", "Ultra"],
  Copilot: ["Individual", "Business"],
};

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [results, setResults] = useState<AuditResult[]>([]);

  const [name, setName] = useState("ChatGPT");
  const [plan, setPlan] = useState("Plus");
  const [cost, setCost] = useState("");

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const savedTools = localStorage.getItem("tools");

    if (savedTools) {
      setTools(JSON.parse(savedTools));
    }
  }, []);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("tools", JSON.stringify(tools));
  }, [tools]);

  const addTool = () => {
    if (!cost) return;

    const newTool: Tool = {
      name,
      plan,
      cost,
    };

    setTools([...tools, newTool]);

    setCost("");
  };

  const runAudit = () => {
    const auditResults: AuditResult[] = [];

    tools.forEach((tool) => {
      const monthlyCost = Number(tool.cost);

      if (
        tool.name === "ChatGPT" &&
        tool.plan === "Team"
      ) {
        auditResults.push({
          tool: tool.name,
          recommendation: "Switch to ChatGPT Plus",
          savings: 20,
          reason:
            "Small teams may not fully utilize Team collaboration features.",
        });
      }

      else if (
        tool.name === "Cursor" &&
        tool.plan === "Business"
      ) {
        auditResults.push({
          tool: tool.name,
          recommendation: "Downgrade to Cursor Pro",
          savings: 20,
          reason:
            "Business plan may be unnecessary for smaller developer teams.",
        });
      }

      else if (monthlyCost > 100) {
        auditResults.push({
          tool: tool.name,
          recommendation: "Review enterprise usage",
          savings: 25,
          reason:
            "High monthly spend suggests potential underutilized features.",
        });
      }

      else {
        auditResults.push({
          tool: tool.name,
          recommendation: "Current setup looks optimized",
          savings: 0,
          reason:
            "No obvious savings opportunities found.",
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

      <h1 className="text-5xl font-bold mt-10 text-center">
        AI Spend Audit
      </h1>

      <p className="text-gray-400 mt-4 text-center max-w-2xl">
        Discover hidden AI subscription waste and optimize your team’s stack.
      </p>

      {/* FORM */}
      <div className="mt-10 w-full max-w-md space-y-4 bg-gray-950 p-6 rounded-2xl border border-gray-800">

        {/* TOOL SELECT */}
        <select
          value={name}
          onChange={(e) => {
            const selectedTool = e.target.value;
            setName(selectedTool);
            setPlan(toolPlans[selectedTool][0]);
          }}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        >
          {Object.keys(toolPlans).map((tool) => (
            <option key={tool}>{tool}</option>
          ))}
        </select>

        {/* PLAN SELECT */}
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        >
          {toolPlans[name].map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        {/* COST INPUT */}
        <input
          type="number"
          placeholder="Monthly cost ($)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        />

        {/* BUTTONS */}
        <button
          onClick={addTool}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200"
        >
          Add Tool
        </button>

        <button
          onClick={runAudit}
          className="w-full bg-green-500 text-black py-3 rounded-xl font-semibold hover:bg-green-400"
        >
          Run Audit
        </button>

      </div>

      {/* TOOL LIST */}
      <div className="mt-10 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Your Stack
        </h2>

        {tools.length === 0 ? (
          <p className="text-gray-500">
            No tools added yet.
          </p>
        ) : (
          tools.map((tool, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 p-4 rounded-xl mb-4"
            >
              <p><b>Tool:</b> {tool.name}</p>
              <p><b>Plan:</b> {tool.plan}</p>
              <p><b>Spend:</b> ${tool.cost}/month</p>
            </div>
          ))
        )}

      </div>

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="mt-12 w-full max-w-2xl">

          <div className="bg-green-900 p-6 rounded-2xl mb-8">
            <h2 className="text-4xl font-bold">
              Save ${totalSavings}/month
            </h2>

            <p className="mt-2 text-green-200">
              Estimated annual savings: ${totalSavings * 12}
            </p>
          </div>

          <div className="space-y-5">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 p-5 rounded-2xl"
              >
                <h3 className="text-2xl font-semibold">
                  {result.tool}
                </h3>

                <p className="mt-3">
                  <b>Recommendation:</b>{" "}
                  {result.recommendation}
                </p>

                <p className="mt-2">
                  <b>Savings:</b> ${result.savings}/month
                </p>

                <p className="mt-3 text-gray-400">
                  {result.reason}
                </p>
              </div>
            ))}
          </div>

        </div>
      )}

    </main>
  );
}