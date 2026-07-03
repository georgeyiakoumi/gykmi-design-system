import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ModelError } from "./model-error";

afterEach(() => {
	cleanup();
});

describe("ModelError", () => {
	it("renders with kind", () => {
		render(<ModelError kind="timeout" />);
		expect(screen.getByText("Response timed out")).toBeInTheDocument();
	});

	it("has role alert", () => {
		render(<ModelError kind="unknown" />);
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});
});

describe("ModelError a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<ModelError kind="rate-limit" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
