type Tool = {
  name: string;
  plan: string;
  cost: string;
  teamSize: string;
  useCase: string;
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

    let savings = 0;

    let recommendation =
      "Current setup looks optimized";

    let reason =
      "No meaningful savings opportunities detected for current usage.";

    // ChatGPT Team → Plus
    if (
      tool.name === "ChatGPT" &&
      tool.plan === "Team" &&
      Number(tool.teamSize) <= 2
    ) {

      savings = monthlyCost - 20;

      recommendation =
        "Switch to ChatGPT Plus";

      reason =
        "Small teams often don't fully utilize Team-tier collaboration features.";

    }

    // Cursor Business → Pro
    else if (
      tool.name === "Cursor" &&
      tool.plan === "Business" &&
      Number(tool.teamSize) <= 3
    ) {

      savings = monthlyCost - 20;

      recommendation =
        "Downgrade to Cursor Pro";

      reason =
        "Cursor Business is usually excessive for very small engineering teams.";

    }

    // Claude writing workflow
    else if (
      tool.useCase === "Writing" &&
      tool.name === "Claude"
    ) {

      savings = Math.round(monthlyCost * 0.25);

      recommendation =
        "Consider ChatGPT Plus";

      reason =
        "For general writing workflows, ChatGPT Plus may provide similar output quality at lower cost.";

    }

    // High spend detection
    else if (monthlyCost > 100) {

      savings = Math.round(monthlyCost * 0.30);

      recommendation =
        "Review enterprise-level subscriptions";

      reason =
        "Your spend appears high relative to typical startup AI usage benchmarks.";

    }

    results.push({
      tool: tool.name,
      currentPlan: tool.plan,
      recommendation,
      savings,
      annualSavings: savings * 12,
      reason,
    });

  });

  return results;
}