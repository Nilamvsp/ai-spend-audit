"use client";

import { runAuditEngine } from "../lib/auditEngine";

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
  const auditResults = runAuditEngine(tools);
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



      {results.length > 0 && (

  <div className="mt-12 bg-green-500 text-black p-8 rounded-3xl text-center w-full max-w-3xl">

    <h2 className="text-4xl font-bold mb-4">
      Potential Savings
    </h2>

    <p className="text-6xl font-extrabold">
      ${totalSavings}/month
    </p>

    <p className="text-2xl mt-4">
      ${totalSavings * 12}/year
    </p>

  </div>

)}

      {/* RESULTS */}
     <div className="mt-10">
  <h2 className="text-3xl font-bold mb-6">
    Audit Results
  </h2>

  {results.map((result, index) => (

    <div
      key={index}
      className="bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-6"
    >

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">
          {result.tool}
        </h3>

        <div className="text-right">
          <p className="text-green-400 text-xl font-bold">
            Save ${result.savings}/mo
          </p>

          <p className="text-gray-400">
            ${result.annualSavings}/year
          </p>
        </div>
      </div>

      <p className="mb-2">
        <span className="font-semibold">
          Current Plan:
        </span>{" "}
        {result.currentPlan}
      </p>

      <p className="mb-2">
        <span className="font-semibold">
          Recommendation:
        </span>{" "}
        {result.recommendation}
      </p>

      <p className="text-gray-400">
        {result.reason}
      </p>

    </div>

  ))}
</div>
    </main>
  );
}