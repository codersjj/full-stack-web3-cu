// calculateTotal.test.ts
import { describe, expect, it } from "vitest";
import { calculateTotal } from "./calculateTotal";

describe("calculateTotal", () => {
  it("handles basic comma-separated values", () => {
    expect(calculateTotal("100,200,300")).toBe(600);
  });

  it("handles basic newline-separated values", () => {
    expect(calculateTotal("100\n200\n300")).toBe(600);
  });

  it("handles mixed delimiters", () => {
    expect(calculateTotal("100,200\n300")).toBe(600);
    expect(calculateTotal("100\n,200,300")).toBe(600);
  });

  it("handles values with spaces", () => {
    expect(calculateTotal("100, 200, 300")).toBe(600);
    expect(calculateTotal(" 150 , 250 ")).toBe(400);
  });

  it("handles decimal values", () => {
    expect(calculateTotal("100.5, 200.25")).toBe(300.75);
    expect(calculateTotal("50.1\n75.2\n100.3")).toBeCloseTo(225.6);
  });

  it("ignores invalid values", () => {
    expect(calculateTotal("100, invalid, 200")).toBe(300);
    expect(calculateTotal("abc,def\nghi")).toBe(0);
  });

  it("handles empty input", () => {
    expect(calculateTotal("")).toBe(0);
    expect(calculateTotal("   ")).toBe(0);
  });

  it("handles single values", () => {
    expect(calculateTotal("500")).toBe(500);
    expect(calculateTotal(" 123.45 ")).toBe(123.45);
  });

  it("handles negative numbers", () => {
    expect(calculateTotal("100, -50, 200")).toBe(250);
    expect(calculateTotal("-100\n-200\n-300")).toBe(-600);
  });

  it("handles trailing/leading delimiters", () => {
    expect(calculateTotal(",100,200,300")).toBe(600);
    expect(calculateTotal("100,200,300\n")).toBe(600);
    expect(calculateTotal("\n100\n200\n300\n")).toBe(600);
  });

  it("handles complex mixed input", () => {
    expect(calculateTotal("100,  invalid, 200\n\n300, abc, 400.5")).toBe(
      1000.5
    );
    expect(calculateTotal("50.25\n,75.50\n100.75, ,125.00")).toBe(351.5);
  });
});
