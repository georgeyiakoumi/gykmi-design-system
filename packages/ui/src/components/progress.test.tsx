import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Progress } from "./progress";

afterEach(() => {
	cleanup();
});

describe("Progress", () => {
	it("renders", () => {
		render(<Progress value={50} aria-label="Loading" />);
		expect(screen.getByRole("progressbar")).toBeInTheDocument();
	});

	it("has the progressbar role with value", () => {
		render(<Progress value={75} aria-label="Upload progress" />);
		const bar = screen.getByRole("progressbar");
		expect(bar).toBeInTheDocument();
	});
});

describe("Progress a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<Progress value={50} aria-label="Loading" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
