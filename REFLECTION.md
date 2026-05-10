# REFLECTION.md

# 1. The hardest bug I hit this week, and how I debugged it

The hardest issue I faced was getting the application to deploy successfully on Vercel after the local development version worked correctly. The project repeatedly failed during production builds because of TypeScript and serverless runtime issues that did not appear locally.

One major issue involved dynamic route handling in Next.js 15. Initially I accessed params.id directly inside the dynamic audit page, which worked in development but caused warnings and instability during production builds because Next.js App Router now treats params as async values. I had to refactor the page to correctly unwrap params using React’s use() support for async route parameters.

Another difficult issue involved PDF generation. I initially used Puppeteer because I wanted professionally styled reports. However, deploying Puppeteer on the Vercel free tier created runtime and Chromium-related problems. I experimented with multiple approaches before deciding to switch to a simpler client-side PDF generation strategy using jsPDF. That decision reduced deployment complexity significantly.

My debugging process usually followed:

1. reproduce the issue consistently
2. isolate whether it was frontend, serverless, or deployment-related
3. check build logs carefully
4. simplify the implementation
5. redeploy incrementally

The biggest lesson I learned was that production environments expose many issues hidden during local development.

---

# 2. A decision I reversed mid-week, and why

The biggest decision I reversed was using AI-generated recommendations for the audit engine itself.

Initially, I thought using an LLM for both summaries and recommendations would make the product feel smarter and more dynamic. I experimented with prompts that asked the AI to:

* estimate savings
* suggest cheaper alternatives
* determine whether plans were oversized

However, the results were inconsistent. Sometimes the model hallucinated pricing or recommended unrealistic tool replacements. Since this product deals with financial-style recommendations, inconsistency reduced trust immediately.

I realized that deterministic logic was the correct solution for the audit engine. Pricing comparisons and downgrade rules are better handled with predictable business rules than generative AI.

I kept AI only for generating personalized summaries because summaries benefit from natural language generation without affecting financial correctness.

That reversal improved:

* reliability
* explainability
* consistency
* user trust

It also simplified testing and made the product easier to maintain.

---

# 3. What I would build in week 2 if I had more time

If I had another week, I would focus primarily on making the product feel more like a production SaaS platform rather than an MVP.

The first feature I would add is benchmark intelligence. Instead of only showing direct savings opportunities, the tool would compare a company’s AI spend per employee against similar startups. That would make the product feel more valuable and data-driven.

Second, I would improve the viral sharing loop by adding:

* proper Open Graph previews
* branded report cards
* Twitter-ready screenshots
* referral incentives

Third, I would improve the audit engine by supporting:

* API token usage estimation
* usage frequency tracking
* seat utilization analysis
* historical spend trends

I would also replace Gmail SMTP with a more production-ready provider like SES or Postmark.

Finally, I would invest heavily in analytics and conversion tracking:

* audit completion rate
* share rate
* email capture conversion
* consultation booking conversion

That data would help optimize the funnel and determine whether the tool could realistically become a lead-generation engine for Credex.

---

# 4. How I used AI tools during the project

I used multiple AI tools throughout development, primarily ChatGPT.

I used AI for:

* debugging TypeScript issues
* understanding Next.js App Router behavior
* deployment troubleshooting
* UI refinement
* writing helper functions
* improving documentation structure
* brainstorming audit logic

However, I intentionally avoided blindly copying generated code. I frequently modified, simplified, or rewrote generated solutions after testing them.

One important example where AI was wrong involved PDF generation with Puppeteer on Vercel. Several generated solutions assumed Puppeteer would deploy smoothly in a serverless environment, but they failed repeatedly in practice. I eventually abandoned that approach and simplified the architecture.

Another area where I did not trust AI was pricing logic. I manually verified pricing pages and implemented deterministic rules instead of AI-generated savings estimates.

The biggest lesson I learned from using AI tools is that they are extremely effective accelerators, but engineering judgment still matters. AI can produce plausible-looking solutions that fail under real deployment conditions.

---

# 5. Self-rating

## Discipline — 8/10

I maintained consistent progress across multiple days and kept improving the project after the MVP worked instead of stopping early.

---

## Code Quality — 7/10

The codebase is reasonably organized and typed, though with more time I would further improve abstractions and reduce some component size complexity.

---

## Design Sense — 7/10

I focused heavily on visual clarity, spacing, and shareable report aesthetics. There is still room for stronger branding and more refined interactions.

---

## Problem Solving — 8/10

The project involved multiple real-world engineering issues around deployment, serverless limitations, typing, and integrations. I was able to iteratively debug and stabilize the system.

---

## Entrepreneurial Thinking — 7/10

I tried to think about the project as a real lead-generation product rather than a coding exercise, especially around shareability, friction reduction, and honest savings recommendations.
