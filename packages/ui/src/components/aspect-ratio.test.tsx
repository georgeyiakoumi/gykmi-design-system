import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { AspectRatio } from "./aspect-ratio";

afterEach(() => {
	cleanup();
});

describe("AspectRatio", () => {
	it("renders children", () => {
		render(
			<AspectRatio ratio={16 / 9}>
				<span data-testid="child">Content</span>
			</AspectRatio>,
		);
		expect(screen.getByTestId("child")).toBeInTheDocument();
	});
});

describe("AspectRatio a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<AspectRatio ratio={16 / 9}>
				<span>Content</span>
			</AspectRatio>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
