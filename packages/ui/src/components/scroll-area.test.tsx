import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ScrollArea } from "./scroll-area";

afterEach(() => {
	cleanup();
});

describe("ScrollArea", () => {
	it("renders children", () => {
		render(
			<ScrollArea style={{ height: 200 }}>
				<p>Scrollable content</p>
			</ScrollArea>,
		);
		expect(screen.getByText("Scrollable content")).toBeInTheDocument();
	});

	it("applies custom className", () => {
		render(
			<ScrollArea className="custom-class" data-testid="scroll">
				<p>Content</p>
			</ScrollArea>,
		);
		expect(screen.getByTestId("scroll").className).toContain("custom-class");
	});
});

describe("ScrollArea a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<ScrollArea style={{ height: 200 }}>
				<p>Scrollable content</p>
			</ScrollArea>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
