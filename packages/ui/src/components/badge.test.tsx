import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Badge } from "./badge";

afterEach(() => {
	cleanup();
});

describe("Badge", () => {
	it("renders label", () => {
		render(<Badge label="New" />);
		expect(screen.getByText("New")).toBeInTheDocument();
	});

	it("renders with default variant", () => {
		render(<Badge label="Default" />);
		expect(screen.getByText("Default").className).toContain("bg-surface-raised");
	});

	it("renders with danger variant", () => {
		render(<Badge variant="danger" label="Error" />);
		expect(screen.getByText("Error").className).toContain("bg-danger");
	});
});

describe("Badge a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<div>
				<Badge label="Default" />
				<Badge variant="success" label="Success" />
				<Badge variant="danger" label="Danger" />
				<Badge variant="warning" label="Warning" />
			</div>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
