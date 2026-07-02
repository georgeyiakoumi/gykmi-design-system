import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { HeatmapChart } from "./heatmap-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{
		label: "AAPL",
		bins: [
			{ bin: 0, count: 12 },
			{ bin: 1, count: 8 },
			{ bin: 2, count: 15 },
		],
	},
	{
		label: "MSFT",
		bins: [
			{ bin: 0, count: 9 },
			{ bin: 1, count: 14 },
			{ bin: 2, count: 7 },
		],
	},
	{
		label: "GOOG",
		bins: [
			{ bin: 0, count: 11 },
			{ bin: 1, count: 6 },
			{ bin: 2, count: 18 },
		],
	},
];

describe("HeatmapChart", () => {
	it("renders with data", () => {
		render(<HeatmapChart data={sampleData} title="Correlation Matrix" />);
		expect(screen.getByLabelText("Correlation Matrix: heatmap chart")).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<HeatmapChart data={[]} title="Correlation Matrix" />);
		expect(screen.getByLabelText("Correlation Matrix \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<HeatmapChart data={[]} title="Correlation Matrix" loading />);
		expect(screen.getByLabelText("Correlation Matrix loading")).toBeInTheDocument();
	});
});

describe("HeatmapChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<HeatmapChart data={sampleData} title="Correlation Matrix" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(<HeatmapChart data={[]} title="Correlation Matrix" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<HeatmapChart data={[]} title="Correlation Matrix" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});

describe("HeatmapChart interaction", () => {
	it("showTable renders accessible table", () => {
		render(<HeatmapChart data={sampleData} title="Correlation Matrix" showTable />);
		expect(screen.getByRole("table")).toBeInTheDocument();
	});

	it("tooltip appears on focus", () => {
		const { container } = render(<HeatmapChart data={sampleData} title="Correlation Matrix" />);
		const rect = container.querySelector("rect[tabindex='0']");
		if (rect) {
			fireEvent.focus(rect);
			expect(screen.getByText("12")).toBeInTheDocument();
		}
	});
});
