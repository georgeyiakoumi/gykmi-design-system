import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Label } from "./label";

afterEach(() => {
	cleanup();
});

describe("Label", () => {
	it("renders children", () => {
		render(<Label>Email address</Label>);
		expect(screen.getByText("Email address")).toBeInTheDocument();
	});

	it("renders as a label element", () => {
		render(<Label>Name</Label>);
		expect(screen.getByText("Name").tagName).toBe("LABEL");
	});
});

describe("Label a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<Label htmlFor="email">Email</Label>);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
