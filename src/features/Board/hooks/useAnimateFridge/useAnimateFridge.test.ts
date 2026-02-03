import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useAnimateFridge from "./useAnimateFridge";

describe("useAnimateFridge", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(document.documentElement, "offsetWidth", {
      value: 1000,
      configurable: true,
    });
  });

  it("returns containerRef, fridgeRef and handleAnimateFridge", () => {
    const { result } = renderHook(() => useAnimateFridge());
    expect(result.current.containerRef).toBeDefined();
    expect(result.current.fridgeRef).toBeDefined();
    expect(typeof result.current.handleAnimateFridge).toBe("function");
  });

  it("handleAnimateFridge sets container transform when refs are set", () => {
    const { result } = renderHook(() => useAnimateFridge());
    const container = document.createElement("div");
    const fridge = document.createElement("img");
    (
      result.current
        .containerRef as React.MutableRefObject<HTMLDivElement | null>
    ).current = container;
    (
      result.current
        .fridgeRef as React.MutableRefObject<HTMLImageElement | null>
    ).current = fridge;

    act(() => {
      result.current.handleAnimateFridge();
    });
    act(() => {
      vi.runAllTimers();
    });

    expect(container.style.transform).toBe("scale(1)");
    expect(fridge.style.transform).toBeDefined();
  });
});
