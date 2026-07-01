import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Toggle } from "./toggle";

afterEach(() => {
	cleanup();
});

describe("Toggle", () => {
	it("renders", () => {
		render(<Toggle aria-label="Bold">B</Toggle>);
		expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
	});

	it("toggles pressed state on click", () => {
		render(<Toggle aria-label="Bold">B</Toggle>);
		const toggle = screen.getByRole("button", { name: "Bold" });
		expect(toggle).toHaveAttribute("data-state", "off");
		fireEvent.click(toggle);
		expect(toggle).toHaveAttribute("data-state", "on");
	});
});

describe("Toggle a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<Toggle aria-label="Bold">B</Toggle>);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
