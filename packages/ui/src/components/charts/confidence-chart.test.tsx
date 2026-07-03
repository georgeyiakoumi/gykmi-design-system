import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ConfidenceChart } from "./confidence-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ date: "Jan", value: 100, low: 90, high: 110 },
	{ date: "Feb", value: 115, low: 100, high: 130 },
	{ date: "Mar", value: 108, low: 95, high: 125 },
	{ date: "Apr", value: 125, low: 110, high: 140 },
];

describe("ConfidenceChart", () => {
	it("renders with data", () => {
		render(<ConfidenceChart data={sampleData} title="Revenue Forecast" />);
		expect(
			screen.getByLabelText(
				"Revenue Forecast: confidence chart with 4 data points showing value with Confidence range",
			),
		).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<ConfidenceChart data={[]} title="Revenue Forecast" />);
		expect(screen.getByLabelText("Revenue Forecast \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<ConfidenceChart data={[]} title="Revenue Forecast" loading />);
		expect(screen.getByLabelText("Revenue Forecast loading")).toBeInTheDocument();
	});
});

describe("ConfidenceChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<ConfidenceChart data={sampleData} title="Revenue Forecast" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(<ConfidenceChart data={[]} title="Revenue Forecast" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<ConfidenceChart data={[]} title="Revenue Forecast" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});

describe("ConfidenceChart interaction", () => {
	it("showTable renders accessible table", () => {
		render(<ConfidenceChart data={sampleData} title="Revenue Forecast" showTable />);
		expect(screen.getByRole("table")).toBeInTheDocument();
	});

	it("tooltip appears on focus", () => {
		const { container } = render(<ConfidenceChart data={sampleData} title="Revenue Forecast" />);
		const circle = container.querySelector("circle[tabindex='0']");
		if (circle) {
			fireEvent.focus(circle);
			expect(screen.getByText("Jan")).toBeInTheDocument();
		}
	});
});
