import { describe, expect, it } from "vitest";
import getIsPointerMoved from "./getIsPointerMoved";

describe("getIsPointerMoved", () => {
  it("returns false when pointer has not moved", () => {
    expect(getIsPointerMoved(0, 0, 0, 0)).toBe(false);
  });

  it("returns false when movement is within threshold (5px)", () => {
    expect(getIsPointerMoved(0, 0, 4, 0)).toBe(false);
    expect(getIsPointerMoved(0, 0, 0, 4)).toBe(false);
    expect(getIsPointerMoved(10, 10, 14, 14)).toBe(false);
  });

  it("returns false when movement equals threshold (5px)", () => {
    expect(getIsPointerMoved(0, 0, 5, 0)).toBe(false);
    expect(getIsPointerMoved(0, 0, 0, 5)).toBe(false);
  });

  it("returns true when x movement exceeds threshold", () => {
    expect(getIsPointerMoved(0, 0, 6, 0)).toBe(true);
    expect(getIsPointerMoved(10, 0, 4, 0)).toBe(true);
  });

  it("returns true when y movement exceeds threshold", () => {
    expect(getIsPointerMoved(0, 0, 0, 6)).toBe(true);
    expect(getIsPointerMoved(0, 10, 0, 4)).toBe(true);
  });

  it("returns true when both x and y exceed threshold", () => {
    expect(getIsPointerMoved(0, 0, 10, 10)).toBe(true);
  });
});
