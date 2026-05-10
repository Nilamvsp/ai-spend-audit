# DEVLOG.md

## Day 1 — 2026-05-04

**Hours worked:** 4

**What I did:**

* Read the entire Credex assignment carefully
* Planned MVP scope and architecture
* Chose Next.js + TypeScript + Supabase stack
* Set up project structure and Tailwind CSS
* Designed initial audit input form

**What I learned:**
The assignment is more product-oriented than algorithm-oriented. The deliverables and documentation are as important as the code itself.

**Blockers / what I'm stuck on:**
Needed to decide whether audit logic should use AI or deterministic rules.

**Plan for tomorrow:**
Build the audit engine and savings calculation logic.

---

## Day 2 — 2026-05-05

**Hours worked:** 6

**What I did:**

* Built deterministic audit engine
* Added tool support for ChatGPT, Cursor, Claude, Copilot, and Gemini
* Implemented savings calculations
* Added annual savings logic
* Designed audit result cards
* Improved Tailwind UI styling

**What I learned:**
Rule-based systems are more reliable than LLMs for financial-style calculations.

**Blockers / what I'm stuck on:**
Handling realistic pricing assumptions without overcomplicating the engine.

**Plan for tomorrow:**
Add Supabase integration and shareable URLs.

---

## Day 3 — 2026-05-06

**Hours worked:** 7

**What I did:**

* Integrated Supabase database
* Implemented audit storage
* Built dynamic shareable audit pages using Next.js routing
* Added localStorage persistence
* Fixed multiple dynamic route issues in Next.js 15
* Improved report page UI

**What I learned:**
Next.js App Router has important differences around async params handling in dynamic routes.

**Blockers / what I'm stuck on:**
Dynamic route params caused multiple rendering and TypeScript issues.

**Plan for tomorrow:**
Add email functionality and PDF export.

---

## Day 4 — 2026-05-07

**Hours worked:** 7

**What I did:**

* Implemented email delivery
* Initially experimented with Resend
* Switched to Gmail SMTP due to free-tier constraints
* Built PDF export functionality
* Improved audit summaries
* Added better savings cards and UI polish

**What I learned:**
Serverless PDF generation is harder than expected on free hosting environments.

**Blockers / what I'm stuck on:**
Puppeteer deployment issues on Vercel free tier.

**Plan for tomorrow:**
Stabilize deployment and fix production issues.

---

## Day 5 — 2026-05-08

**Hours worked:** 8

**What I did:**

* Deployed project to Vercel
* Fixed multiple production build failures
* Solved TypeScript and ESLint deployment errors
* Added proper typing to audit engine
* Fixed PDF download flow
* Improved audit summary thresholds
* Added clipboard copy for shareable URLs

**What I learned:**
Production deployments reveal issues that local development often hides.

**Blockers / what I'm stuck on:**
Several Vercel build failures related to typing and serverless route handling.

**Plan for tomorrow:**
Write tests and improve documentation.

---

## Day 6 — 2026-05-09

**Hours worked:** 6

**What I did:**

* Added automated audit engine tests using Vitest
* Wrote architecture documentation
* Added pricing documentation with official sources
* Documented AI prompts
* Added README screenshots and setup instructions

**What I learned:**
Good documentation significantly improves project clarity and maintainability.

**Blockers / what I'm stuck on:**
Balancing feature polish with assignment documentation requirements.

**Plan for tomorrow:**
Finish entrepreneurial deliverables and reflections.

---

## Day 7 — 2026-05-10

**Hours worked:** 5

**What I did:**

* Reviewed UX and audit logic
* Improved landing page copy
* Finalized documentation
* Verified deployed functionality
* Cleaned GitHub repository
* Tested email, PDF, and shareable report flows

**What I learned:**
Building a believable product requires much more than simply making features work.

**Blockers / what I'm stuck on:**
Time management between engineering, deployment, testing, and business documentation.

**Plan for tomorrow:**
Prepare final submission package and review all deliverables.
