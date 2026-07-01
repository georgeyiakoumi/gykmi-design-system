import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Input } from "./input";

afterEach(() => {
	cleanup();
});

describe("Input", () => {
	it("renders an input element", () => {
		render(<Input aria-label="Name" placeholder="Enter name" />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("sets aria-invalid when error is true", () => {
		render(<Input aria-label="Email" error />);
		expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
	});

	it("does not set aria-invalid when error is false", () => {
		render(<Input aria-label="Email" />);
		expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
	});
});

describe("Input a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<Input aria-label="Accessible input" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
