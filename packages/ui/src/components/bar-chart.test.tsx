import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { BarChart } from "./bar-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ label: "Q1", value: 4200 },
	{ label: "Q2", value: 5800 },
	{ label: "Q3", value: 3900 },
	{ label: "Q4", value: 6100 },
];

describe("BarChart", () => {
	it("renders with data", () => {
		render(<BarChart data={sampleData} title="Quarterly Revenue" />);
		expect(
			screen.getByLabelText("Quarterly Revenue: bar chart with 4 data points"),
		).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<BarChart data={[]} title="Quarterly Revenue" />);
		expect(screen.getByLabelText("Quarterly Revenue \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<BarChart data={[]} title="Quarterly Revenue" loading />);
		expect(screen.getByLabelText("Quarterly Revenue loading")).toBeInTheDocument();
	});
});

describe("BarChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<BarChart data={sampleData} title="Quarterly Revenue" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(<BarChart data={[]} title="Quarterly Revenue" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<BarChart data={[]} title="Quarterly Revenue" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
