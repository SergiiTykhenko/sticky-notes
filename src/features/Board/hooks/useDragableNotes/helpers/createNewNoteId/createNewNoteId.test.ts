import { describe, expect, it } from "vitest";
import createNewNoteId from "./createNewNoteId";

describe("createNewNoteId", () => {
  it("returns 1 when notes array is empty", () => {
    expect(createNewNoteId([])).toBe(1);
  });

  it("returns biggest id + 1 for single note", () => {
    const notes = [{ id: 5, content: "", x: 0, y: 0 }];
    expect(createNewNoteId(notes)).toBe(6);
  });

  it("returns biggest id + 1 for multiple notes", () => {
    const notes = [
      { id: 1, content: "", x: 0, y: 0 },
      { id: 3, content: "", x: 10, y: 10 },
      { id: 2, content: "", x: 20, y: 20 },
    ];
    expect(createNewNoteId(notes)).toBe(4);
  });

  it("returns 1 when all notes have id 0", () => {
    const notes = [
      { id: 0, content: "", x: 0, y: 0 },
      { id: 0, content: "", x: 10, y: 10 },
    ];
    expect(createNewNoteId(notes)).toBe(1);
  });
});
