import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Stack } from "./stack";

afterEach(() => {
	cleanup();
});

describe("Stack", () => {
	it("renders children", () => {
		render(
			<Stack data-testid="stack">
				<span>Item 1</span>
				<span>Item 2</span>
			</Stack>,
		);
		expect(screen.getByTestId("stack")).toBeInTheDocument();
		expect(screen.getByText("Item 1")).toBeInTheDocument();
	});

	it("applies direction and gap classes", () => {
		render(
			<Stack data-testid="stack" direction="row" gap="2">
				<span>A</span>
			</Stack>,
		);
		const el = screen.getByTestId("stack");
		expect(el.className).toContain("flex-row");
		expect(el.className).toContain("gap-2");
	});

	it("renders as child element with asChild", () => {
		render(
			<Stack asChild>
				<nav data-testid="nav">
					<span>Link</span>
				</nav>
			</Stack>,
		);
		expect(screen.getByTestId("nav").tagName).toBe("NAV");
	});
});

describe("Stack a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<Stack>
				<span>Item</span>
			</Stack>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
