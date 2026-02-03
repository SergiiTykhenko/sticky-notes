import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Note, { NOTE_WIDTH, NOTE_HEIGHT, type NoteType } from "./Note";

const defaultNote: NoteType = {
  id: 1,
  content: "Hello",
  x: 10,
  y: 20,
};

describe("Note", () => {
  it("renders note with content and data attributes", () => {
    const onNoteSave = vi.fn();
    render(<Note note={defaultNote} zIndex={0} onNoteSave={onNoteSave} />);
    const noteEl = document.querySelector('[data-type="note"]');
    expect(noteEl).toBeInTheDocument();
    expect(noteEl).toHaveAttribute("data-id", "1");
    expect(noteEl).toHaveAttribute("data-x", "10");
    expect(noteEl).toHaveAttribute("data-y", "20");
    expect(screen.getByDisplayValue("Hello")).toBeInTheDocument();
  });

  it("applies transform from note position", () => {
    render(<Note note={defaultNote} zIndex={0} onNoteSave={() => {}} />);
    const noteEl = document.querySelector('[data-type="note"]');
    expect(noteEl).toHaveStyle({
      transform: "translate(10px, 20px)",
    });
  });

  it("uses NOTE_WIDTH and NOTE_HEIGHT in style", () => {
    render(<Note note={defaultNote} zIndex={0} onNoteSave={() => {}} />);
    const noteEl = document.querySelector('[data-type="note"]');
    expect(noteEl).toHaveStyle({
      width: `${NOTE_WIDTH}px`,
      height: `${NOTE_HEIGHT}px`,
    });
  });

  it("calls onNoteSave when content changes", () => {
    const onNoteSave = vi.fn();
    render(<Note note={defaultNote} zIndex={0} onNoteSave={onNoteSave} />);
    const textarea = screen.getByDisplayValue("Hello");
    fireEvent.change(textarea, { target: { value: "Hi" } });
    expect(onNoteSave).toHaveBeenCalledWith(
      expect.objectContaining({ content: "Hi", id: 1 })
    );
  });
});
