# PROMPTS.md

# AI Summary Generation Prompts

This project intentionally uses AI only for generating human-readable audit summaries.

The core audit calculations and savings recommendations use deterministic rule-based logic instead of LLM reasoning.

Reason:

* pricing calculations should be consistent
* recommendations should be explainable
* deterministic systems are safer for financial-style decisions

---

# Primary Prompt

```txt id="u5j64f"
You are an AI infrastructure cost optimization assistant.

A startup team has completed an AI spend audit.

Based on the following audit data:
- tools used
- plans
- monthly spend
- team size
- savings opportunities

Generate a concise 80–120 word summary explaining:
- whether the stack is overprovisioned
- where savings opportunities exist
- whether recommendations are low-risk
- whether the current stack is already optimized

The tone should be:
- professional
- concise
- founder-friendly
- financially rational

Do not exaggerate savings.
Do not invent recommendations not present in the audit.
```

---

# Example Input

```json id="3p7gyx"
{
  "tools": [
    {
      "name": "ChatGPT",
      "plan": "Team",
      "cost": 60
    }
  ],
  "totalSavings": 40
}
```

---

# Example Output

```txt id="h8iq3w"
Your AI stack appears moderately overprovisioned for your current team size. Downgrading select subscriptions could reduce recurring monthly costs while maintaining similar workflow quality. The recommended optimizations are relatively low-risk and primarily involve plan resizing rather than tool migration. Overall, your stack is functional, but there are opportunities to improve efficiency and reduce unnecessary recurring spend.
```

---

# Why I Structured The Prompt This Way

The goal was not creative writing.

The goal was:

* consistent business summaries
* realistic financial tone
* non-hallucinated recommendations

The prompt explicitly discourages:

* exaggeration
* unsupported recommendations
* hype language

This was important because the product targets startup founders and engineering managers making budget decisions.

---

# What I Tried That Did Not Work

## 1. Fully AI-generated recommendations

Early experiments asked the LLM to:

* choose replacement tools
* estimate savings
* generate audit reasoning

This produced inconsistent and occasionally unrealistic recommendations.

Problems included:

* hallucinated pricing
* recommending enterprise tools to solo users
* inconsistent savings math

I replaced this with deterministic rule-based logic.

---

## 2. Long-form summaries

I initially generated 250–400 word reports.

This reduced clarity and made the product feel slower and more verbose.

Shorter summaries worked better because:

* users scan quickly
* screenshots become cleaner
* shareability improves

---

## 3. Aggressive marketing tone

Earlier prompts generated overly dramatic statements like:

* “You are massively overspending”
* “You are wasting thousands”

This reduced trustworthiness.

I adjusted the prompts to sound:

* analytical
* calm
* finance-oriented

---

# Fallback Strategy

If AI summary generation fails:

* the application falls back to templated summaries
* audits still function normally
* users still receive actionable recommendations

This ensures reliability even during API failures.

---

# Future Prompt Improvements

If continued further, I would:

* personalize summaries by role
* benchmark against similar startups
* generate CFO-oriented vs engineer-oriented summaries
* incorporate usage intensity signals
* support multi-language summaries
