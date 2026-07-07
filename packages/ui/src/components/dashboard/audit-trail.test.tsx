import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { AuditTrail } from "./audit-trail";

afterEach(() => {
	cleanup();
});

describe("AuditTrail", () => {
	it("renders with entries", () => {
		const entries = [
			{
				id: "1",
				timestamp: "2025-01-15T10:00:00Z",
				actor: "Alice",
				action: "approved report",
			},
		];
		render(<AuditTrail entries={entries} />);
		expect(screen.getAllByText("approved report").length).toBeGreaterThan(0);
	});

	it("shows empty state when no entries", () => {
		render(<AuditTrail entries={[]} />);
		expect(screen.getByText("No audit entries recorded.")).toBeInTheDocument();
	});
});

describe("AuditTrail a11y", () => {
	it("has no axe violations", async () => {
		const entries = [
			{
				id: "1",
				timestamp: "2025-01-15T10:00:00Z",
				actor: "Alice",
				action: "approved report",
			},
			{
				id: "2",
				timestamp: "2025-01-15T09:00:00Z",
				actor: "Bob",
				action: "submitted draft",
				detail: "Initial version",
			},
		];
		const { container } = render(<AuditTrail entries={entries} />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
