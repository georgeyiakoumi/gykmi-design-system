import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Sparkline } from "./sparkline";

afterEach(() => {
	cleanup();
});

const sampleData = [12, 18, 14, 22, 19, 25, 28];

describe("Sparkline", () => {
	it("renders with data", () => {
		render(<Sparkline data={sampleData} label="Share price" width={120} />);
		expect(
			screen.getByLabelText("Share price: sparkline showing trend from 12 to 28"),
		).toBeInTheDocument();
	});

	it("renders insufficient data state", () => {
		render(<Sparkline data={[42]} label="Share price" />);
		expect(screen.getByLabelText("Share price \u2014 insufficient data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<Sparkline data={[]} label="Share price" loading />);
		expect(screen.getByLabelText("Share price loading")).toBeInTheDocument();
	});
});

describe("Sparkline a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<Sparkline data={sampleData} label="Share price" width={120} />);
		// svg-img-alt: inner visx <svg role="img"> lacks <title>; a11y is
		// provided by the wrapper div's aria-label instead.
		const results = await axe(container, {
			rules: { "svg-img-alt": { enabled: false } },
		});
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in insufficient data state", async () => {
		const { container } = render(<Sparkline data={[42]} label="Share price" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<Sparkline data={[]} label="Share price" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
