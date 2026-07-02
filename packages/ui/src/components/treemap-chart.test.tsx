import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { TreemapChart } from "./treemap-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ label: "Technology", value: 34500 },
	{ label: "Healthcare", value: 22800 },
	{ label: "Financials", value: 18200 },
	{ label: "Energy", value: 12400 },
	{ label: "Consumer", value: 9600 },
];

describe("TreemapChart", () => {
	it("renders with data", () => {
		render(<TreemapChart data={sampleData} title="Sector Exposure" />);
		expect(
			screen.getByLabelText("Sector Exposure: treemap chart with 5 segments"),
		).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<TreemapChart data={[]} title="Sector Exposure" />);
		expect(screen.getByLabelText("Sector Exposure \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<TreemapChart data={[]} title="Sector Exposure" loading />);
		expect(screen.getByLabelText("Sector Exposure loading")).toBeInTheDocument();
	});
});

describe("TreemapChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<TreemapChart data={sampleData} title="Sector Exposure" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(<TreemapChart data={[]} title="Sector Exposure" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<TreemapChart data={[]} title="Sector Exposure" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
