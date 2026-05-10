"use client";

import { runAuditEngine } from "../lib/auditEngine";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Tool = {
  name: string;
  plan: string;
  cost: string;
  teamSize: string;
  useCase: string;
};

type AuditResult = {
  tool: string;
  recommendation: string;
  savings: number;
  annualSavings: number;
  currentPlan?: string;
  reason: string;
};

const toolPlans: Record<string, string[]> = {
  ChatGPT: ["Plus", "Team", "Enterprise"],
  Cursor: ["Pro", "Business", "Enterprise"],
  Claude: ["Pro", "Max", "Team"],
  Gemini: ["Pro", "Ultra"],
  Copilot: ["Individual", "Business"],
};


export default function HomePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [results, setResults] = useState<AuditResult[]>([]);
  const [summary, setSummary] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [name, setName] = useState("ChatGPT");
  const [plan, setPlan] = useState("Plus");
  const [cost, setCost] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("Coding");

  // LOAD FROM LOCAL STORAGE

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .limit(1);

      console.log("Supabase test data:", data);
      console.log("Supabase test error:", error);
    }

    testConnection();
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
      teamSize,
      useCase,
    };

    setTools([...tools, newTool]);

    setCost("");
  };


  const saveLead = async () => {

    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          id: crypto.randomUUID(),
          tools,
          results,
          summary: summary || "AI usage optimized audit",
          total_savings: totalSavings || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error.message);
      alert("Failed to save lead");
    } else {
      alert("Lead saved successfully!");
      console.log("Saved:", data);
    }
  };

  const runAudit = () => {

    const auditResults = runAuditEngine(tools);

    setResults(auditResults);

    const totalSavings = auditResults.reduce(
      (sum, item) => sum + item.savings,
      0
    );

    let generatedSummary = "";

    if (totalSavings > 500) {

      generatedSummary =
        "Your AI stack appears significantly overprovisioned. Optimizing your subscriptions could unlock major annual savings while maintaining similar productivity for your team.";

    }

    else if (totalSavings > 100) {

      generatedSummary =
        "Your current AI tooling has a few optimization opportunities. Small plan adjustments could reduce costs without affecting workflow quality.";

    }

    else if (totalSavings > 0) {

      generatedSummary =
        "Your stack is already fairly optimized, but there are still a few smaller opportunities to reduce unnecessary AI spend.";

    }

    else {

      generatedSummary =
        "Your current AI stack appears well optimized for your current team size and use case.";

    }

    setSummary(generatedSummary);

  };

  const totalSavings = results.reduce(
    (sum, item) => sum + item.savings,
    0
  );

  

  const generateShareableAudit = async () => {
    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          id: crypto.randomUUID(),
          tools,
          results,
          summary,
          total_savings: totalSavings,
        },
      ])
      .select()
      .single();

    if (error) {
      alert("Failed to create link");
      console.error(error);
      return;
    }

    const url = `${window.location.origin}/audit/${data.id}`;

    await navigator.clipboard.writeText(url);

    alert("Link copied to clipboard!");
  };


  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center">

      useEffect

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

        <input
          type="number"
          placeholder="Team size"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        />

        <select
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        >
          <option>Coding</option>
          <option>Writing</option>
          <option>Research</option>
          <option>Data Analysis</option>
          <option>Mixed</option>
        </select>

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

        {tools.length > 0 && (

          <button
            onClick={() => {
              setTools([]);
              localStorage.removeItem("tools");
            }}
            className="mb-4 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Clear Stack
          </button>

        )}

        {tools.length === 0 ? (
          <p className="text-gray-500">
            Add your first AI tool to begin the audit.
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
              <p><b>Team Size:</b> {tool.teamSize}</p>
              <p><b>Use Case:</b> {tool.useCase}</p>
              <button
                onClick={() => {
                  const updatedTools = tools.filter(
                    (_, i) => i !== index
                  );

                  setTools(updatedTools);
                }}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
              >
                Remove
              </button>
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

        {summary && (

          <div className="mt-10 w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              AI Summary
            </h2>

            <div className="mt-10 w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Get Full Audit Report
              </h2>

              <p className="text-gray-400 mb-6">
                Receive your audit summary and future AI savings recommendations.
              </p>

              <div className="space-y-4">

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                />

                <input
                  type="text"
                  placeholder="Company name (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                />

                <input
                  type="text"
                  placeholder="Role (optional)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                />

                <button
                  onClick={saveLead}
                  className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200"
                >
                  Save My Audit
                </button>
              </div>

            </div>

            <p className="text-gray-300 leading-7">
              {summary}
            </p>

          </div>

        )}

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



      <button
        onClick={generateShareableAudit}
        className="cursor-pointer bg-blue-500 px-4 py-2 rounded mt-4"
      >
        Generate Shareable Link
      </button>


    </main>
  );
}

