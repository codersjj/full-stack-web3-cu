import { describe, expect, it } from "vitest";
import { formatTokenAmount } from "./formatTokenAmount";

describe("formatTokenAmount", () => {
  it("handles standard cases", () => {
    expect(formatTokenAmount(1000000, 6)).toBe("1.00"); // USDC
    expect(formatTokenAmount(1234567, 6)).toBe("1.23"); // rounding
    expect(formatTokenAmount(1000000000000000000, 18)).toBe("1.00"); // ETH
  });

  it("handles zero values", () => {
    // Math operations still work without explicit checks
    expect(formatTokenAmount(0, 18)).toBe("0.00");
    expect(formatTokenAmount(0, 6)).toBe("0.00");
  });

  it("handles zero decimals", () => {
    // 10^0 = 1, so returns original number formatted with 2 decimal places
    expect(formatTokenAmount(123456, 0)).toBe("123,456.00");
  });

  it("handles extreme fractional values", () => {
    // Very small values will round to 0.00
    expect(formatTokenAmount(1, 18)).toBe("0.00"); // 0.000000000000000001 → 0.00
    expect(formatTokenAmount(999, 18)).toBe("0.00"); // 0.000000000000000999 → 0.00
  });

  it("handles negative values", () => {
    expect(formatTokenAmount(-1000000, 6)).toBe("-1.00");
    expect(formatTokenAmount(-1234567, 6)).toBe("-1.23");
  });

  it("maintains consistent 2-decimal format", () => {
    expect(formatTokenAmount(100, 2)).toBe("1.00");
    expect(formatTokenAmount(105, 2)).toBe("1.05");
    expect(formatTokenAmount(123999, 4)).toBe("12.40"); // rounding up
  });
});
