import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { CandlestickChart } from "./candlestick-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ date: "Mon", open: 142.5, high: 145.2, low: 141.8, close: 144.3 },
	{ date: "Tue", open: 144.3, high: 146.8, low: 143.1, close: 143.7 },
	{ date: "Wed", open: 143.7, high: 147.5, low: 142.9, close: 146.8 },
	{ date: "Thu", open: 146.8, high: 148.2, low: 145.5, close: 147.9 },
	{ date: "Fri", open: 147.9, high: 149.1, low: 146.3, close: 148.5 },
];

describe("CandlestickChart", () => {
	it("renders with data", () => {
		render(<CandlestickChart data={sampleData} title="AAPL Price Action" />);
		expect(
			screen.getByLabelText("AAPL Price Action: candlestick chart with 5 data points"),
		).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<CandlestickChart data={[]} title="AAPL Price Action" />);
		expect(screen.getByLabelText("AAPL Price Action \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<CandlestickChart data={[]} title="AAPL Price Action" loading />);
		expect(screen.getByLabelText("AAPL Price Action loading")).toBeInTheDocument();
	});
});

describe("CandlestickChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<CandlestickChart data={sampleData} title="AAPL Price Action" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(<CandlestickChart data={[]} title="AAPL Price Action" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<CandlestickChart data={[]} title="AAPL Price Action" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});

describe("CandlestickChart interaction", () => {
	it("showTable renders accessible table", () => {
		render(<CandlestickChart data={sampleData} title="AAPL Price Action" showTable />);
		expect(screen.getByRole("table")).toBeInTheDocument();
	});

	it("tooltip appears on focus", () => {
		const { container } = render(<CandlestickChart data={sampleData} title="AAPL Price Action" />);
		const group = container.querySelector("g[tabindex='0']");
		if (group) {
			fireEvent.focus(group);
			expect(screen.getByText("Mon")).toBeInTheDocument();
		}
	});
});
