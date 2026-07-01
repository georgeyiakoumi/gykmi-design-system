import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Switch } from "./switch";

afterEach(() => {
	cleanup();
});

describe("Switch", () => {
	it("renders", () => {
		render(<Switch aria-label="Dark mode" />);
		expect(screen.getByRole("switch")).toBeInTheDocument();
	});

	it("toggles on click", () => {
		render(<Switch aria-label="Dark mode" />);
		const toggle = screen.getByRole("switch");
		expect(toggle).not.toBeChecked();
		fireEvent.click(toggle);
		expect(toggle).toBeChecked();
	});
});

describe("Switch a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<Switch aria-label="Accessible switch" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
