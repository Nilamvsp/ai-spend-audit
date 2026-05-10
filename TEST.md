# TESTS.md

# Automated Test Coverage

The audit engine uses deterministic rule-based logic, so automated tests focus on validating:

* savings calculations
* downgrade recommendations
* optimized stack detection
* annual savings math
* edge cases

---

# Test Framework

* Vitest
* TypeScript

---

# Test Files

## 1. auditEngine.test.ts

### Covers:

* ChatGPT Team → Plus downgrade
* Cursor Business → Pro downgrade
* Already optimized plans
* Annual savings calculations
* Zero savings scenarios

### Run:

```bash id="kx2w8j"
npm run test
```

---

# Real Test Cases

## Test Case 1 — ChatGPT Team Overspend

### Input

```json id="dfjlwm"
{
  "name": "ChatGPT",
  "plan": "Team",
  "cost": "60",
  "teamSize": "1",
  "useCase": "Coding"
}
```

### Expected

```txt id="1jlwm9"
Savings: $40/month
Recommendation: Downgrade to ChatGPT Plus
Annual Savings: $480/year
```

---

## Test Case 2 — ChatGPT Already Optimized

### Input

```json id="rfmmtx"
{
  "name": "ChatGPT",
  "plan": "Plus",
  "cost": "20",
  "teamSize": "1",
  "useCase": "Coding"
}
```

### Expected

```txt id="c6x0vf"
Savings: $0/month
Recommendation: Current plan is appropriate
```

---

## Test Case 3 — Cursor Business Overspend

### Input

```json id="v2z47u"
{
  "name": "Cursor",
  "plan": "Business",
  "cost": "40",
  "teamSize": "1",
  "useCase": "Coding"
}
```

### Expected

```txt id="jlwm8m"
Savings: $20/month
Recommendation: Downgrade to Cursor Pro
```

---

## Test Case 4 — Annual Savings Calculation

### Expected

```txt id="vxoz42"
Monthly savings × 12 = annual savings
```

---

## Test Case 5 — Zero-Cost Edge Case

### Input

```json id="05l2fc"
{
  "name": "Claude",
  "plan": "Free",
  "cost": "0",
  "teamSize": "1",
  "useCase": "Research"
}
```

### Expected

```txt id="5p5u5k"
Savings: $0/month
No downgrade recommendation
```

---

# Manual QA Performed

The following flows were manually tested on the deployed production environment:

* Add/remove tools
* LocalStorage persistence
* Audit generation
* Shareable URL generation
* Public audit retrieval
* Email sending
* PDF download
* Responsive mobile layout
* Deployment on Vercel

---

# Future Test Improvements

If given more time, I would add:

* integration tests
* API route tests
* email mocking tests
* Playwright end-to-end testing
* Lighthouse CI
* accessibility testing
