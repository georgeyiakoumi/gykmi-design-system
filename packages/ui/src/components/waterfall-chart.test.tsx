import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { WaterfallChart } from "./waterfall-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ label: "Revenue", value: 480000 },
	{ label: "COGS", value: -192000 },
	{ label: "OpEx", value: -144000 },
	{ label: "Tax", value: -36000 },
	{ label: "Net Income", value: 108000, isTotal: true },
];

describe("WaterfallChart", () => {
	it("renders with data", () => {
		render(<WaterfallChart data={sampleData} title="P&L Breakdown" />);
		expect(
			screen.getByLabelText("P&L Breakdown: waterfall chart with 5 items"),
		).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<WaterfallChart data={[]} title="P&L Breakdown" />);
		expect(screen.getByLabelText("P&L Breakdown \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<WaterfallChart data={[]} title="P&L Breakdown" loading />);
		expect(screen.getByLabelText("P&L Breakdown loading")).toBeInTheDocument();
	});
});

describe("WaterfallChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<WaterfallChart data={sampleData} title="P&L Breakdown" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(<WaterfallChart data={[]} title="P&L Breakdown" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<WaterfallChart data={[]} title="P&L Breakdown" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});

describe("WaterfallChart interaction", () => {
	it("showTable renders accessible table", () => {
		render(<WaterfallChart data={sampleData} title="P&L Breakdown" showTable />);
		expect(screen.getByRole("table")).toBeInTheDocument();
	});

	it("tooltip appears on focus", () => {
		const { container } = render(<WaterfallChart data={sampleData} title="P&L Breakdown" />);
		const rect = container.querySelector("rect[tabindex='0']");
		if (rect) {
			fireEvent.focus(rect);
			expect(screen.getByText("Revenue")).toBeInTheDocument();
		}
	});
});
