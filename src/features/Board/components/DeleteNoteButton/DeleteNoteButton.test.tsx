import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import DeleteNoteButton from "./DeleteNoteButton";

describe("DeleteNoteButton", () => {
  it("renders delete button container with delete icon", () => {
    render(<DeleteNoteButton isDragging={false} onDelete={() => {}} />);
    const container = document.querySelector(".absolute.bottom-3.left-3");
    expect(container).toBeInTheDocument();
    expect(container?.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onDelete on pointer up", () => {
    const onDelete = vi.fn();
    render(<DeleteNoteButton isDragging={false} onDelete={onDelete} />);
    const container = document.querySelector(".absolute.bottom-3.left-3");
    expect(container).toBeInTheDocument();
    if (container) {
      fireEvent.pointerUp(container);
    }
    expect(onDelete).toHaveBeenCalled();
  });

  it("applies cursor-grab when isDragging is true", () => {
    render(<DeleteNoteButton isDragging={true} onDelete={() => {}} />);
    const container = document.querySelector(".cursor-grab");
    expect(container).toBeInTheDocument();
  });

  it("does not apply cursor-grab when isDragging is false", () => {
    render(<DeleteNoteButton isDragging={false} onDelete={() => {}} />);
    const container = document.querySelector(".absolute.bottom-3.left-3");
    expect(container).not.toHaveClass("cursor-grab");
  });
});
