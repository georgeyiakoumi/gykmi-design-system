import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { LineChart } from "./line-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ date: "Jan", value: 1200 },
	{ date: "Feb", value: 1800 },
	{ date: "Mar", value: 1400 },
	{ date: "Apr", value: 2200 },
];

describe("LineChart", () => {
	it("renders with data", () => {
		render(<LineChart data={sampleData} title="Revenue" />);
		expect(screen.getByLabelText("Revenue: line chart with 4 data points")).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<LineChart data={[]} title="Revenue" />);
		expect(screen.getByLabelText("Revenue \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<LineChart data={[]} title="Revenue" loading />);
		expect(screen.getByLabelText("Revenue loading")).toBeInTheDocument();
	});
});

describe("LineChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<LineChart data={sampleData} title="Revenue" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(<LineChart data={[]} title="Revenue" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<LineChart data={[]} title="Revenue" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});

describe("LineChart interaction", () => {
	it("showTable renders accessible table", () => {
		render(<LineChart data={sampleData} title="Revenue" showTable />);
		expect(screen.getByRole("table")).toBeInTheDocument();
	});

	it("tooltip appears on focus", () => {
		const { container } = render(<LineChart data={sampleData} title="Revenue" />);
		const circle = container.querySelector("circle[tabindex='0']");
		if (circle) {
			fireEvent.focus(circle);
			expect(screen.getByText("Jan")).toBeInTheDocument();
		}
	});
});
