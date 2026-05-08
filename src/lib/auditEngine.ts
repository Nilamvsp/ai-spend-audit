type Tool = {
  name: string;
  plan: string;
  cost: string;
};

type AuditResult = {
  tool: string;
  currentPlan: string;
  recommendation: string;
  savings: number;
  annualSavings: number;
  reason: string;
};

export function runAuditEngine(
  tools: Tool[]
): AuditResult[] {

  const results: AuditResult[] = [];

  tools.forEach((tool) => {

    const monthlyCost = Number(tool.cost);

    // ChatGPT Team → Plus
    if (
      tool.name === "ChatGPT" &&
      tool.plan === "Team"
    ) {

      const savings = monthlyCost - 20;

      results.push({
        tool: tool.name,
        currentPlan: tool.plan,
        recommendation: "Switch to ChatGPT Plus",
        savings,
        annualSavings: savings * 12,
        reason:
          "For smaller teams, ChatGPT Team collaboration features are often underutilized.",
      });
    }

    // Cursor Business → Pro
    else if (
      tool.name === "Cursor" &&
      tool.plan === "Business"
    ) {

      const savings = monthlyCost - 20;

      results.push({
        tool: tool.name,
        currentPlan: tool.plan,
        recommendation: "Downgrade to Cursor Pro",
        savings,
        annualSavings: savings * 12,
        reason:
          "Cursor Business is best suited for larger engineering organizations.",
      });
    }

    // High spend warning
    else if (monthlyCost > 100) {

      results.push({
        tool: tool.name,
        currentPlan: tool.plan,
        recommendation: "Review enterprise usage",
        savings: 25,
        annualSavings: 300,
        reason:
          "High monthly AI spend may indicate unused enterprise features or overprovisioned seats.",
      });
    }

    // Already optimized
    else {

      results.push({
        tool: tool.name,
        currentPlan: tool.plan,
        recommendation: "Current setup looks optimized",
        savings: 0,
        annualSavings: 0,
        reason:
          "No meaningful savings opportunities detected for current usage.",
      });
    }

  });

  return results;
}