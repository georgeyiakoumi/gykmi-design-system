import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ScatterChart } from "./scatter-chart";

afterEach(() => {
	cleanup();
});

const sampleData = [
	{ x: 12.5, y: 8.2, label: "Fund A" },
	{ x: 7.8, y: 14.1, label: "Fund B" },
	{ x: 15.3, y: 6.4, label: "Fund C" },
	{ x: 9.1, y: 11.7, label: "Fund D" },
	{ x: 18.6, y: 3.9, label: "Fund E" },
];

describe("ScatterChart", () => {
	it("renders with data", () => {
		render(<ScatterChart data={sampleData} title="Risk vs Return" />);
		expect(
			screen.getByLabelText("Risk vs Return: scatter chart with 5 points"),
		).toBeInTheDocument();
	});

	it("renders empty state", () => {
		render(<ScatterChart data={[]} title="Risk vs Return" />);
		expect(screen.getByLabelText("Risk vs Return \u2014 no data")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<ScatterChart data={[]} title="Risk vs Return" loading />);
		expect(screen.getByLabelText("Risk vs Return loading")).toBeInTheDocument();
	});
});

describe("ScatterChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<ScatterChart data={sampleData} title="Risk vs Return" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in empty state", async () => {
		const { container } = render(<ScatterChart data={[]} title="Risk vs Return" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<ScatterChart data={[]} title="Risk vs Return" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});

describe("ScatterChart interaction", () => {
	it("showTable renders accessible table", () => {
		render(<ScatterChart data={sampleData} title="Risk vs Return" showTable />);
		expect(screen.getByRole("table")).toBeInTheDocument();
	});

	it("tooltip appears on focus", () => {
		const { container } = render(<ScatterChart data={sampleData} title="Risk vs Return" />);
		const circle = container.querySelector("circle[tabindex='0']");
		if (circle) {
			fireEvent.focus(circle);
			expect(screen.getByText("Fund A")).toBeInTheDocument();
		}
	});
});
