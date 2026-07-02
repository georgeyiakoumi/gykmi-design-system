import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { StackedBarChart } from "./stacked-bar-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ quarter: "Q1", equities: 12000, bonds: 8000, alternatives: 3000 },
	{ quarter: "Q2", equities: 14500, bonds: 7500, alternatives: 3500 },
	{ quarter: "Q3", equities: 13200, bonds: 8200, alternatives: 4000 },
	{ quarter: "Q4", equities: 16700, bonds: 7800, alternatives: 4200 },
];

const keys = ["equities", "bonds", "alternatives"];

describe("StackedBarChart", () => {
	it("renders with data", () => {
		render(
			<StackedBarChart
				data={sampleData}
				keys={keys}
				indexKey="quarter"
				title="AUM by Asset Class"
			/>,
		);
		expect(screen.getByLabelText("AUM by Asset Class: stacked bar chart")).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<StackedBarChart data={[]} keys={keys} indexKey="quarter" title="AUM by Asset Class" />);
		expect(screen.getByLabelText("AUM by Asset Class \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(
			<StackedBarChart
				data={[]}
				keys={keys}
				indexKey="quarter"
				title="AUM by Asset Class"
				loading
			/>,
		);
		expect(screen.getByLabelText("AUM by Asset Class loading")).toBeInTheDocument();
	});
});

describe("StackedBarChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<StackedBarChart
				data={sampleData}
				keys={keys}
				indexKey="quarter"
				title="AUM by Asset Class"
			/>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(
			<StackedBarChart data={[]} keys={keys} indexKey="quarter" title="AUM by Asset Class" />,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(
			<StackedBarChart
				data={[]}
				keys={keys}
				indexKey="quarter"
				title="AUM by Asset Class"
				loading
			/>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
