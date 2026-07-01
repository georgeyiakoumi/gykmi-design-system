import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Badge } from "./badge";

afterEach(() => {
	cleanup();
});

describe("Badge", () => {
	it("renders children", () => {
		render(<Badge>New</Badge>);
		expect(screen.getByText("New")).toBeInTheDocument();
	});

	it("renders with default variant", () => {
		render(<Badge>Default</Badge>);
		expect(screen.getByText("Default").className).toContain("bg-surface-raised");
	});

	it("renders with danger variant", () => {
		render(<Badge variant="danger">Error</Badge>);
		expect(screen.getByText("Error").className).toContain("bg-danger");
	});
});

describe("Badge a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<div>
				<Badge>Default</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="danger">Danger</Badge>
				<Badge variant="warning">Warning</Badge>
			</div>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
