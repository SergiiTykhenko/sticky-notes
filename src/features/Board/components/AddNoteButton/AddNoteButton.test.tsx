import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddNoteButton from "./AddNoteButton";

describe("AddNoteButton", () => {
  it("renders a button with + text", () => {
    render(<AddNoteButton onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<AddNoteButton onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
