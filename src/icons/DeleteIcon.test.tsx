import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import DeleteIcon from "./DeleteIcon";

describe("DeleteIcon", () => {
  it("renders an svg element", () => {
    render(<DeleteIcon />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("forwards className to svg", () => {
    render(<DeleteIcon className="fill-red-500" />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("fill-red-500");
  });

  it("has viewBox for scaling", () => {
    render(<DeleteIcon />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
  });
});
