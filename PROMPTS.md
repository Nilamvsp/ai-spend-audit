# PROMPTS.md

# AI Summary Prompt

The project uses AI-generated summaries to create a short personalized audit explanation for users.

The goal was:

* simple language
* useful recommendations
* short readable summaries
* non-technical tone

---

# Prompt Used

```txt
You are an AI cost optimization assistant.

A startup team is using multiple AI tools.

Based on the audit results below, generate a short summary (around 80–100 words) explaining:
- where the team may be overspending
- what improvements are possible
- whether their stack already looks optimized

Keep the tone simple, professional, and helpful.
Do not exaggerate savings.
Do not invent pricing.
Focus only on the provided audit data.
```

---

# Why I wrote the prompt this way

I wanted the summaries to:

* sound professional
* avoid fake marketing language
* avoid unrealistic savings claims
* stay short and readable

I also wanted the output to feel useful even for non-technical startup founders.

---

# What did not work initially

At first I tried generating longer AI summaries.

But the responses became:

* repetitive
* too generic
* overly promotional

Some summaries also invented recommendations that were not part of the actual audit logic.

Because of that, I reduced the prompt scope and added stricter instructions.

---

# Fallback Handling

Since AI APIs can fail or rate-limit requests, the project also includes fallback summaries using hardcoded logic.

For example:

* high savings → stronger optimization message
* low savings → “your stack already looks optimized”

This ensures the audit still works even if the AI request fails.

---

# Why AI was only used for summaries

The actual audit calculations use rule-based logic instead of AI.

I made this decision because:

* pricing calculations should stay predictable
* recommendations should be consistent
* deterministic logic is easier to debug and test

I think AI works better here for personalization, not for financial calculations.
