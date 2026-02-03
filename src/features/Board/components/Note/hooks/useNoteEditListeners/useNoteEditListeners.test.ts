import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useNoteEditListeners from "./useNoteEditListeners";

describe("useNoteEditListeners", () => {
  it("returns isEditing false initially", () => {
    const { result } = renderHook(() => useNoteEditListeners());
    expect(result.current.isEditing).toBe(false);
  });

  it("returns noteRef and textareaRef", () => {
    const { result } = renderHook(() => useNoteEditListeners());
    expect(result.current.noteRef).toBeDefined();
    expect(result.current.textareaRef).toBeDefined();
  });

  it("returns handlePointerDown and handlePointerUp", () => {
    const { result } = renderHook(() => useNoteEditListeners());
    expect(typeof result.current.handlePointerDown).toBe("function");
    expect(typeof result.current.handlePointerUp).toBe("function");
  });

  it("sets isEditing to true when pointer up without movement and textarea exists", () => {
    const { result } = renderHook(() => useNoteEditListeners());
    const div = document.createElement("div");
    const textarea = document.createElement("textarea");
    div.appendChild(textarea);
    result.current.noteRef.current = div;
    result.current.textareaRef.current = textarea;

    act(() => {
      result.current.handlePointerDown({
        clientX: 0,
        clientY: 0,
      } as React.PointerEvent<HTMLDivElement>);
    });
    act(() => {
      result.current.handlePointerUp({
        clientX: 0,
        clientY: 0,
      } as React.PointerEvent<HTMLDivElement>);
    });

    expect(result.current.isEditing).toBe(true);
  });

  it("keeps isEditing false when pointer moved beyond threshold", () => {
    const { result } = renderHook(() => useNoteEditListeners());
    const div = document.createElement("div");
    const textarea = document.createElement("textarea");
    div.appendChild(textarea);
    result.current.noteRef.current = div;
    result.current.textareaRef.current = textarea;

    act(() => {
      result.current.handlePointerDown({
        clientX: 0,
        clientY: 0,
      } as React.PointerEvent<HTMLDivElement>);
    });
    act(() => {
      result.current.handlePointerUp({
        clientX: 10,
        clientY: 10,
      } as React.PointerEvent<HTMLDivElement>);
    });

    expect(result.current.isEditing).toBe(false);
  });
});
