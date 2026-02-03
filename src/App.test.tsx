import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: () => "[]",
      setItem: () => {},
      clear: () => {},
    });
  });

  it("renders board with fridge", () => {
    render(<App />);
    expect(screen.getByRole("img", { name: "fridge" })).toBeInTheDocument();
  });
});
