import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Separator } from "./separator";

afterEach(() => {
	cleanup();
});

describe("Separator", () => {
	it("renders a horizontal separator by default", () => {
		render(<Separator data-testid="sep" />);
		const sep = screen.getByTestId("sep");
		expect(sep).toBeInTheDocument();
		expect(sep).toHaveAttribute("data-orientation", "horizontal");
	});

	it("renders a vertical separator", () => {
		render(<Separator orientation="vertical" data-testid="sep" />);
		expect(screen.getByTestId("sep")).toHaveAttribute("data-orientation", "vertical");
	});
});

describe("Separator a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<Separator />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
