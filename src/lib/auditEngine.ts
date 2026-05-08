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

export function runAuditEngine(
  tools: Tool[]
): AuditResult[] {

  const results: AuditResult[] = [];

  tools.forEach((tool) => {

    const monthlyCost = Number(tool.cost);

    // ChatGPT logic
    if (
      tool.name === "ChatGPT" &&
      tool.plan === "Team"
    ) {
      results.push({
        tool: tool.name,
        recommendation: "Switch to ChatGPT Plus",
        savings: 20,
        reason:
          "Small teams may not fully utilize Team collaboration features.",
      });
    }

    // Cursor logic
    else if (
      tool.name === "Cursor" &&
      tool.plan === "Business"
    ) {
      results.push({
        tool: tool.name,
        recommendation: "Downgrade to Cursor Pro",
        savings: 20,
        reason:
          "Business features may be unnecessary for smaller teams.",
      });
    }

    // Generic logic
    else if (monthlyCost > 100) {
      results.push({
        tool: tool.name,
        recommendation: "Review enterprise usage",
        savings: 25,
        reason:
          "High spend may indicate underutilized premium features.",
      });
    }

    // No savings
    else {
      results.push({
        tool: tool.name,
        recommendation: "Current setup looks optimized",
        savings: 0,
        reason:
          "No obvious savings opportunities found.",
      });
    }
  });

  return results;
}