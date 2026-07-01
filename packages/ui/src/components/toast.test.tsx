import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ToastProvider, ToastViewport } from "./toast";

afterEach(() => {
	cleanup();
});

describe("ToastViewport", () => {
	it("renders the viewport", () => {
		render(
			<ToastProvider>
				<ToastViewport data-testid="viewport" />
			</ToastProvider>,
		);
		expect(screen.getByTestId("viewport")).toBeInTheDocument();
	});
});

describe("ToastViewport a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<ToastProvider>
				<ToastViewport />
			</ToastProvider>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
