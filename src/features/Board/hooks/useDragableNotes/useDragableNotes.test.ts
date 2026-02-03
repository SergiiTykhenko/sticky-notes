import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDragableNotes from "./useDragableNotes";
import type { NoteType } from "../../components/Note";

describe("useDragableNotes", () => {
  const mockStorage: Record<string, string> = {};
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value;
      },
      clear: () => {
        Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
      },
    });
    mockStorage["notes"] = "[]";
  });

  it("returns notes from localStorage initially", () => {
    const stored: NoteType[] = [{ id: 1, content: "a", x: 0, y: 0 }];
    mockStorage["notes"] = JSON.stringify(stored);
    const { result } = renderHook(() => useDragableNotes());
    expect(result.current.notes).toEqual(stored);
  });

  it("returns empty notes when localStorage has no notes", () => {
    delete mockStorage["notes"];
    const { result } = renderHook(() => useDragableNotes());
    expect(result.current.notes).toEqual([]);
  });

  it("returns isDragging false initially", () => {
    const { result } = renderHook(() => useDragableNotes());
    expect(result.current.isDragging).toBe(false);
  });

  it("handleAddNote adds a new note and persists to localStorage", () => {
    Object.defineProperty(document.documentElement, "offsetWidth", {
      value: 800,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "offsetHeight", {
      value: 600,
      configurable: true,
    });
    const { result } = renderHook(() => useDragableNotes());
    expect(result.current.notes).toEqual([]);

    act(() => {
      result.current.handleAddNote();
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].id).toBe(1);
    expect(result.current.notes[0].content).toBe("");
    expect(JSON.parse(mockStorage["notes"] ?? "[]")).toHaveLength(1);
  });

  it("handleNoteSave updates note and persists to localStorage", () => {
    mockStorage["notes"] = JSON.stringify([
      { id: 1, content: "old", x: 0, y: 0 },
    ]);
    const { result } = renderHook(() => useDragableNotes());

    act(() => {
      result.current.handleNoteSave({
        id: 1,
        content: "new",
        x: 0,
        y: 0,
      });
    });

    expect(result.current.notes[0].content).toBe("new");
    expect(JSON.parse(mockStorage["notes"] ?? "[]")[0].content).toBe("new");
  });

  it("handleRemoveNote does nothing when not dragging", () => {
    mockStorage["notes"] = JSON.stringify([
      { id: 1, content: "a", x: 0, y: 0 },
    ]);
    const { result } = renderHook(() => useDragableNotes());

    act(() => {
      result.current.handleRemoveNote();
    });

    expect(result.current.notes).toHaveLength(1);
  });
});
