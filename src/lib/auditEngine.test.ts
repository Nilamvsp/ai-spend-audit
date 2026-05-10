import { describe, it, expect } from "vitest";
import { runAuditEngine } from "./auditEngine";

describe("Audit Engine", () => {

  it("detects ChatGPT Team overspend", () => {

    const result = runAuditEngine([
      {
        name: "ChatGPT",
        plan: "Team",
        cost: "60",
        teamSize: "1",
        useCase: "Coding",
      },
    ]);

    expect(result[0].savings).toBe(40);
  });

  it("detects optimized ChatGPT Plus plan", () => {

    const result = runAuditEngine([
      {
        name: "ChatGPT",
        plan: "Plus",
        cost: "20",
        teamSize: "1",
        useCase: "Coding",
      },
    ]);

    expect(result[0].savings).toBe(0);
  });

  it("detects Cursor Business overspend", () => {

    const result = runAuditEngine([
      {
        name: "Cursor",
        plan: "Business",
        cost: "40",
        teamSize: "1",
        useCase: "Coding",
      },
    ]);

    expect(result[0].savings).toBe(20);
  });

  it("calculates annual savings correctly", () => {

    const result = runAuditEngine([
      {
        name: "Cursor",
        plan: "Business",
        cost: "40",
        teamSize: "1",
        useCase: "Coding",
      },
    ]);

    expect(result[0].annualSavings).toBe(240);
  });

});