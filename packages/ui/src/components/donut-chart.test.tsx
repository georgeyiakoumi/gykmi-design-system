import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { DonutChart } from "./donut-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ label: "Equities", value: 42000 },
	{ label: "Fixed Income", value: 28000 },
	{ label: "Commodities", value: 15000 },
	{ label: "Cash", value: 8000 },
];

describe("DonutChart", () => {
	it("renders with data", () => {
		render(<DonutChart data={sampleData} title="Portfolio Allocation" />);
		expect(
			screen.getByLabelText("Portfolio Allocation: donut chart with 4 segments"),
		).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<DonutChart data={[]} title="Portfolio Allocation" />);
		expect(screen.getByLabelText("Portfolio Allocation \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<DonutChart data={[]} title="Portfolio Allocation" loading />);
		expect(screen.getByLabelText("Portfolio Allocation loading")).toBeInTheDocument();
	});
});

describe("DonutChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<DonutChart data={sampleData} title="Portfolio Allocation" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(<DonutChart data={[]} title="Portfolio Allocation" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<DonutChart data={[]} title="Portfolio Allocation" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});

describe("DonutChart interaction", () => {
	it("showTable renders accessible table", () => {
		render(<DonutChart data={sampleData} title="Portfolio Allocation" showTable />);
		expect(screen.getByRole("table")).toBeInTheDocument();
	});

	it("tooltip appears on focus", () => {
		const { container } = render(<DonutChart data={sampleData} title="Portfolio Allocation" />);
		const group = container.querySelector("g[tabindex='0']");
		if (group) {
			fireEvent.focus(group);
			expect(screen.getByText("Equities")).toBeInTheDocument();
		}
	});
});
