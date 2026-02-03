import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Board from "./Board";

describe("Board", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: () => "[]",
      setItem: () => {},
      clear: () => {},
    });
  });

  it("renders fridge image", () => {
    render(<Board />);
    expect(screen.getByRole("img", { name: "fridge" })).toBeInTheDocument();
  });

  it("renders add note button", () => {
    render(<Board />);
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });
});
