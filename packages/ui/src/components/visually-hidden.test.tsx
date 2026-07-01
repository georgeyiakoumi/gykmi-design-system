import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { VisuallyHidden } from "./visually-hidden";

afterEach(() => {
	cleanup();
});

describe("VisuallyHidden", () => {
	it("renders children in the DOM", () => {
		render(
			<button type="button">
				<VisuallyHidden>Close menu</VisuallyHidden>
				X
			</button>,
		);
		expect(screen.getByText("Close menu")).toBeInTheDocument();
	});
});

describe("VisuallyHidden a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<button type="button">
				<VisuallyHidden>Close menu</VisuallyHidden>
				X
			</button>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
