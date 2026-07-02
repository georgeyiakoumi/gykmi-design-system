import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { RadarChart } from "./radar-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ axis: "Liquidity", value: 82 },
	{ axis: "Volatility", value: 65 },
	{ axis: "Sharpe", value: 91 },
	{ axis: "Drawdown", value: 48 },
	{ axis: "Alpha", value: 74 },
];

describe("RadarChart", () => {
	it("renders with data", () => {
		render(<RadarChart data={sampleData} title="Fund Risk Profile" />);
		expect(screen.getByLabelText("Fund Risk Profile: radar chart with 5 axes")).toBeInTheDocument();
	});

	it("renders insufficient data state", () => {
		render(
			<RadarChart
				data={[
					{ axis: "A", value: 50 },
					{ axis: "B", value: 60 },
				]}
				title="Fund Risk Profile"
			/>,
		);
		expect(screen.getByLabelText("Fund Risk Profile \u2014 insufficient data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<RadarChart data={[]} title="Fund Risk Profile" loading />);
		expect(screen.getByLabelText("Fund Risk Profile loading")).toBeInTheDocument();
	});
});

describe("RadarChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<RadarChart data={sampleData} title="Fund Risk Profile" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in insufficient data state", async () => {
		const { container } = render(
			<RadarChart
				data={[
					{ axis: "A", value: 50 },
					{ axis: "B", value: 60 },
				]}
				title="Fund Risk Profile"
			/>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<RadarChart data={[]} title="Fund Risk Profile" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
