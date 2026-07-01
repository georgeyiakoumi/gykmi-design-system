import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Checkbox } from "./checkbox";

afterEach(() => {
	cleanup();
});

describe("Checkbox", () => {
	it("renders", () => {
		render(<Checkbox aria-label="Accept terms" />);
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("toggles checked state on click", () => {
		render(<Checkbox aria-label="Toggle me" />);
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();
		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();
	});
});

describe("Checkbox a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<Checkbox aria-label="Accessible checkbox" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
