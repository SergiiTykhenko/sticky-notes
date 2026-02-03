import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { createRef } from "react";
import useTextfieldResizeHandler from "./useTextfieldResizeHandler";

describe("useTextfieldResizeHandler", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("returns resize function", () => {
    const noteRef = createRef<HTMLDivElement | null>();
    const { result } = renderHook(() => useTextfieldResizeHandler(noteRef));
    expect(typeof result.current.resize).toBe("function");
  });

  it("resize does not throw when noteRef has no current", () => {
    const noteRef = createRef<HTMLDivElement | null>();
    const { result } = renderHook(() => useTextfieldResizeHandler(noteRef));
    act(() => {
      result.current.resize();
    });
    vi.runAllTimers();
  });

  it("resize updates textarea height when noteRef has textarea child", () => {
    const noteRef = createRef<HTMLDivElement | null>();
    const div = document.createElement("div");
    const textarea = document.createElement("textarea");
    textarea.value = "line1\nline2\nline3";
    div.appendChild(textarea);
    (noteRef as React.MutableRefObject<HTMLDivElement | null>).current = div;

    const { result } = renderHook(() => useTextfieldResizeHandler(noteRef));
    act(() => {
      result.current.resize();
    });
    act(() => {
      vi.runAllTimers();
    });
    expect(textarea.style.height).toBeDefined();
  });
});
